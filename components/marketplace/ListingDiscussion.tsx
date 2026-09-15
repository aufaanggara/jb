"use client";

import { useState } from "react";
import { MessageCircle, Send, MessageSquare, ShieldCheck, User, Store, Sparkles, ArrowRight, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

interface CommentItem {
  id: string;
  author: string;
  role: "BUYER" | "SELLER" | "ADMIN";
  avatarBg: string;
  content: string;
  time: string;
  replies?: {
    id: string;
    author: string;
    role: "BUYER" | "SELLER" | "ADMIN";
    content: string;
    time: string;
  }[];
}

const defaultComments: CommentItem[] = [
  {
    id: "c1",
    author: "Dimas Anggara (@buyer_dimas)",
    role: "BUYER",
    avatarBg: "bg-blue-600",
    content: "Halo admin & seller, Konami ID nya apakah bisa langsung diganti ke email baru saya saat transaksi rekber?",
    time: "25 mnt lalu",
    replies: [
      {
        id: "r1",
        author: "Rian Pratama (Seller)",
        role: "SELLER",
        content: "Bisa banget gan! Akun ini Konami ID tunggal (nominus), nanti admin rekber bantu pandu pergantian email sampai 100% aman.",
        time: "18 mnt lalu",
      },
    ],
  },
  {
    id: "c2",
    author: "Rizky_Gamer",
    role: "BUYER",
    avatarBg: "bg-purple-600",
    content: "Ada kartu Big Time Haaland atau booster Messi 2022 di squad cadangan gak gan?",
    time: "2 jam lalu",
    replies: [
      {
        id: "r2",
        author: "Rian Pratama (Seller)",
        role: "SELLER",
        content: "Ada gan, Big Time Haaland OVR 102 dan Epic booster lengkap. Boleh cek screenshot di gallery atas ya.",
        time: "1 jam lalu",
      },
    ],
  },
];

interface ListingDiscussionProps {
  listingId: string;
  listingTitle: string;
  sellerName: string;
  transactionId: string;
  adminName?: string;
  onOpenChatRoom?: () => void;
}

export function ListingDiscussion({
  listingId,
  listingTitle,
  sellerName,
  transactionId,
  adminName = "Rekber_Anto",
  onOpenChatRoom,
}: ListingDiscussionProps) {
  const [comments, setComments] = useState<CommentItem[]>(defaultComments);
  const [inputQuestion, setInputQuestion] = useState("");
  const { addChatMessage } = useStore();

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim()) return;

    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      author: "Dimas Anggara (@buyer_dimas)",
      role: "BUYER",
      avatarBg: "bg-blue-600",
      content: inputQuestion,
      time: "Baru saja",
    };

    setComments([newComment, ...comments]);
    setInputQuestion("");
    toast.success("Pertanyaan publik berhasil dikirim ke penjual.");
  };

  const handleCarryToChatRoom = (questionContent?: string) => {
    const textToCarry = questionContent || inputQuestion;
    if (!textToCarry.trim()) {
      toast.error("Ketik pertanyaan terlebih dahulu sebelum membuka room chat.");
      return;
    }

    // Add message into real-time transaction chat room
    addChatMessage(
      transactionId,
      "BUYER",
      "Dimas Anggara",
      `[Dari Diskusi Listing]: ${textToCarry}`,
      undefined,
      undefined,
      true
    );

    setInputQuestion("");
    toast.success("Pertanyaan berhasil dibawa ke Room Chat Rekber 3 Arah!");

    // Open chat room modal
    if (onOpenChatRoom) {
      onOpenChatRoom();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} className="text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            Diskusi & Tanya Jawab Akun
          </h3>
          <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
            {comments.length}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Ada pertanyaan spesifik? Tanya langsung ke penjual & admin rekber.
        </p>
      </div>

      {/* Input Box to Ask Question */}
      <form onSubmit={handlePostComment} className="space-y-3">
        <div className="relative">
          <textarea
            rows={3}
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Tulis pertanyaan seputar spesifikasi akun game ini (misal: login Konami ID, nominus, unbind email)..."
            className="w-full p-3.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald-500" />
            Pertanyaan dimonitor oleh Admin Escrow Rekberin
          </span>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Post as public comment */}
            <Button
              type="submit"
              variant="outline"
              size="sm"
              disabled={!inputQuestion.trim()}
              className="text-xs font-semibold text-slate-700 hover:text-blue-600"
            >
              Kirim Komentar
            </Button>

            {/* Carry into Real-time Chat Room */}
            <Button
              type="button"
              size="sm"
              disabled={!inputQuestion.trim()}
              onClick={() => handleCarryToChatRoom()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <MessageSquare size={13} />
              Lanjut di Room Chat Rekber
              <ArrowRight size={13} />
            </Button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 pt-3">
        {comments.map((c) => (
          <div key={c.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${c.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                  {c.author[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{c.author}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-1.5 py-0.2 rounded">
                      Buyer
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
              </div>

              {/* Button to carry this question to live chat room */}
              <button
                type="button"
                onClick={() => handleCarryToChatRoom(c.content)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer bg-blue-50/80 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors"
                title="Bawa pertanyaan ini ke ruang chat rekber 3 arah"
              >
                <MessageSquare size={11} />
                Lanjut di Room Chat →
              </button>
            </div>

            <p className="text-xs text-slate-700 pl-10 leading-relaxed font-medium">
              {c.content}
            </p>

            {/* Replies */}
            {c.replies && c.replies.length > 0 && (
              <div className="pl-10 space-y-2 pt-1 border-t border-slate-200/50">
                {c.replies.map((r) => (
                  <div key={r.id} className="p-3 rounded-lg bg-white border border-slate-200/80 flex items-start gap-2.5">
                    <CornerDownRight size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-emerald-800">{r.author}</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded">
                          Penjual
                        </span>
                        <span className="text-[10px] text-slate-400 ml-1">• {r.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{r.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
