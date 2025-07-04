// src/components/chat/chat-input.tsx
"use client";
import { useState } from "react";

export default function ChatInput({ 
  onSend, 
  disabled = false 
}: { 
  onSend: (msg: string) => void; 
  disabled?: boolean; 
}) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex">
      <input
        className="flex-1 border rounded-l px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder={disabled ? "Agent is thinking..." : "Type a message..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}
