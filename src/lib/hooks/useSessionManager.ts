"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export function useSessionManager() {
  const { data: session } = useSession();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((session as any)?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  return session;
} 