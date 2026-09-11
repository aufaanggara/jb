// Placeholder hook — sambungkan ke NextAuth `useSession()` setelah backend aktif.
import { useState } from "react";

export function useAuth() {
  const [user] = useState(null);
  return { user, isLoading: false };
}
