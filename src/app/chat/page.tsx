"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ChatRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the default agent (dev)
    router.replace("/chat/dev")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Redirecting to chat...</div>
    </div>
  )
} 