import { create } from "zustand";
import type { ChatMessage, ChatSenderRole, Transaction, TransactionStatus, AccountCredentials, Listing } from "@/types";
import { dummyChatMessages, dummyTransactions, dummyListings } from "@/data/dummy";

interface AppState {
  selectedAdminId: string | null;
  setSelectedAdminId: (id: string | null) => void;

  // Listings State
  listings: Listing[];
  addListing: (listing: Listing) => void;

  // Transactions State
  transactions: Transaction[];
  getTransaction: (id: string) => Transaction | undefined;
  updateTransactionStatus: (id: string, status: TransactionStatus) => void;

  // Vault Credentials State (indexed by transactionId)
  vaultCredentials: Record<string, AccountCredentials>;
  submitCredentials: (transactionId: string, creds: Omit<AccountCredentials, "submittedAt">) => void;

  // Real-time Chat State
  chatMessages: ChatMessage[];
  isTyping: { role: ChatSenderRole; name: string } | null;
  addChatMessage: (
    transactionId: string,
    senderRole: ChatSenderRole,
    senderName: string,
    message: string,
    attachmentUrl?: string,
    attachmentType?: "IMAGE" | "FILE",
    broadcast?: boolean
  ) => void;
  getMessagesForTransaction: (transactionId: string) => ChatMessage[];

  // High-level Escrow Actions
  payTransaction: (transactionId: string, method: string) => void;
  completeTransaction: (transactionId: string) => void;
  raiseDispute: (transactionId: string, reason: string) => void;
  refundTransaction: (transactionId: string) => void;
}

// Multi-tab real-time sync via BroadcastChannel
let chatChannel: BroadcastChannel | null = null;
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  chatChannel = new BroadcastChannel("rekbergg_realtime_chat");
}

export const useStore = create<AppState>((set, get) => {
  // Listen for real-time messages from other browser tabs/windows
  if (chatChannel) {
    chatChannel.onmessage = (event: MessageEvent<ChatMessage>) => {
      if (event.data && event.data.id) {
        set((state) => {
          if (state.chatMessages.some((m) => m.id === event.data.id)) return state;
          return {
            chatMessages: [...state.chatMessages, event.data],
          };
        });
      }
    };
  }

  // Pre-populate initial dummy vault credentials for completed/in-handover tx
  const initialVaults: Record<string, AccountCredentials> = {
    trx_3: {
      loginMethod: "Konami ID",
      accountEmail: "sultan_pes2024@gmail.com",
      accountPassword: "PasswordSultan2024!",
      backupCodes: "882190-332114",
      notes: "Nominus, single login Konami ID. Siap ganti email pembeli.",
      submittedAt: "2025-01-10T08:50:00",
    },
  };

  const getUserListings = (): Listing[] => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("rekbergg_user_listings");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [];
  };

  return {
    selectedAdminId: null,
    setSelectedAdminId: (id) => set({ selectedAdminId: id }),

    // Listings
    listings: [...getUserListings(), ...dummyListings],
    addListing: (listing) => {
      if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("rekbergg_user_listings");
          const current = saved ? JSON.parse(saved) : [];
          localStorage.setItem("rekbergg_user_listings", JSON.stringify([listing, ...current]));
        } catch {
          // ignore
        }
      }
      set((state) => ({
        listings: [listing, ...state.listings],
      }));
    },

    // Transactions
    transactions: dummyTransactions,
    getTransaction: (id) => get().transactions.find((t) => t.id === id),
    updateTransactionStatus: (id, status) =>
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? { ...t, status } : t
        ),
      })),

    // Vault Credentials
    vaultCredentials: initialVaults,
    submitCredentials: (transactionId, creds) => {
      const fullCreds: AccountCredentials = {
        ...creds,
        submittedAt: new Date().toISOString(),
      };

      set((state) => ({
        vaultCredentials: {
          ...state.vaultCredentials,
          [transactionId]: fullCreds,
        },
        transactions: state.transactions.map((t) =>
          t.id === transactionId ? { ...t, status: "IN_HANDOVER" as TransactionStatus } : t
        ),
      }));

      // Broadcast message to room chat
      get().addChatMessage(
        transactionId,
        "SELLER",
        "Penjual",
        `🔐 DATA AKUN RESMI DISERAHKAN: Penjual telah mengirimkan data login (${creds.loginMethod}) ke dalam Brankas Akun (Vault). Pembeli silakan buka brankas untuk cek dan amankan data akun!`
      );
    },

    // Chat
    chatMessages: dummyChatMessages,
    isTyping: null,

    addChatMessage: (
      transactionId,
      senderRole,
      senderName,
      message,
      attachmentUrl,
      attachmentType,
      broadcast = true
    ) => {
      const newMsg: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        transactionId,
        senderRole,
        senderName,
        message,
        timestamp: new Date().toISOString(),
        attachmentUrl,
        attachmentType,
      };

      if (broadcast && chatChannel) {
        try {
          chatChannel.postMessage(newMsg);
        } catch {
          // ignore
        }
      }

      set((state) => ({
        chatMessages: [...state.chatMessages, newMsg],
      }));

      // Auto-replies if buyer talks (unless already an escrow notification)
      if (senderRole === "BUYER" && !message.startsWith("✅") && !message.startsWith("⚠️")) {
        set({ isTyping: { role: "ADMIN", name: "Rekber_Anto" } });

        setTimeout(() => {
          const autoReplies = [
            "Halo! Pesanmu sudah diterima oleh Admin Rekber. Sedang kami koordinasikan dengan penjual ya.",
            "Siap kak! Admin Rekber standby memantau proses serah terima akun ini.",
            "Dana aman di escrow. Penjual sudah kami notifikasi untuk segera proses.",
          ];
          const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

          const adminMsg: ChatMessage = {
            id: `msg_${Date.now()}_admin`,
            transactionId,
            senderRole: "ADMIN",
            senderName: "Rekber_Anto",
            message: randomReply,
            timestamp: new Date().toISOString(),
          };

          if (chatChannel) {
            try {
              chatChannel.postMessage(adminMsg);
            } catch {
              // ignore
            }
          }

          set((state) => ({
            chatMessages: [...state.chatMessages, adminMsg],
            isTyping: null,
          }));
        }, 1600);
      }
    },

    getMessagesForTransaction: (transactionId) =>
      get().chatMessages.filter((m) => m.transactionId === transactionId),

    // High-level Actions
    payTransaction: (transactionId, method) => {
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                status: "PAYMENT_CONFIRMED" as TransactionStatus,
                timeline: t.timeline.map((step) =>
                  step.label.toLowerCase().includes("transfer") || step.label.toLowerCase().includes("konfirmasi")
                    ? { ...step, done: true, timestamp: "Baru saja" }
                    : step
                ),
              }
            : t
        ),
      }));

      // Auto broadcast system announcement from admin in chat
      get().addChatMessage(
        transactionId,
        "ADMIN",
        "Rekber_Anto",
        `✅ PEMBAYARAN DITERIMA (${method}): Dana sebesar Rp ${(get().getTransaction(transactionId)?.price || 0) + 1500} telah masuk & AMAN ditahan di rekening Escrow RekberGG. Penjual sekarang aman untuk menyerahkan data akun melalui Brankas Akun (Vault).`
      );
    },

    completeTransaction: (transactionId) => {
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                status: "COMPLETED" as TransactionStatus,
                timeline: t.timeline.map((s) => ({ ...s, done: true })),
                checklist: t.checklist.map((c) => ({ ...c, checked: true })),
              }
            : t
        ),
      }));

      get().addChatMessage(
        transactionId,
        "ADMIN",
        "Rekber_Anto",
        "🎉 TRANSAKSI SELESAI & SUKSES! Pembeli telah mengonfirmasi bahwa data akun sudah aman. Dana otomatis kami cairkan ke rekening Penjual. Terima kasih telah bertransaksi secara aman di RekberGG!"
      );
    },

    raiseDispute: (transactionId, reason) => {
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                status: "DISPUTED" as TransactionStatus,
              }
            : t
        ),
      }));

      get().addChatMessage(
        transactionId,
        "BUYER",
        "buyer_testing",
        `⚠️ SAYA MENGAJUKAN KOMPLAIN: "${reason}". Mohon bantuan Admin Rekber untuk memediasi transaksi ini. Dana tolong dibekukan sementara.`
      );

      setTimeout(() => {
        get().addChatMessage(
          transactionId,
          "ADMIN",
          "Rekber_Anto",
          "🚨 MEDIASI AKTIF: Dana escrow telah kami BEKUKAN. Penjual dan Pembeli silakan berikan bukti/screenshot di room chat ini untuk investigasi. Kami akan segera putuskan apakah lanjut serah terima atau Refund 100%."
        );
      }, 800);
    },

    refundTransaction: (transactionId) => {
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                status: "CANCELLED" as TransactionStatus,
              }
            : t
        ),
      }));

      get().addChatMessage(
        transactionId,
        "ADMIN",
        "Rekber_Anto",
        "💸 DANA DI-REFUND 100%: Berdasarkan hasil mediasi admin, dana telah dikembalikan sepenuhnya ke rekening Pembeli. Transaksi ini resmi DIBATALKAN."
      );
    },
  };
});
