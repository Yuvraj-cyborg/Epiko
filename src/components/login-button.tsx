// src/components/login-button.tsx
"use client";

import { useSessionManager } from "@/lib/hooks/useSessionManager";
import { signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const session = useSessionManager();

  if (session) {
    return (
      <button onClick={() => signOut()} className="px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800">
        Logout
      </button>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="px-4 py-2 font-semibold text-white bg-black rounded-3xl hover:bg-gray-800">
      Login
    </button>
  );
}
