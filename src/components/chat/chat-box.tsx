"use client";

import { useState, useEffect } from "react";
import { useSessionManager } from "@/lib/hooks/useSessionManager";
import ChatInput from "./chat-input";
import { Agent } from "@/lib/agents";

type Message = {
  role: "user" | "agent";
  content: string;
  timestamp: Date;
};

export default function ChatBox({ agent }: { agent: Agent }) {
  const session = useSessionManager();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize conversation
  useEffect(() => {
    setMessages([{
      role: "agent",
      content: `Hi! I'm ${agent.name}. ${agent.description}. How can I help you today?`,
      timestamp: new Date()
    }]);
  }, [agent]);

  const handleSend = async (text: string) => {
    const userMessage: Message = { role: "user", content: text, timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agent.id,
          messages: newMessages,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          accessToken: (session as any)?.accessToken
        })
      });

      const result = await response.json();

      const agentMessage: Message = {
        role: "agent",
        content: result.message || "Sorry, I didn't get a response.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);

    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage: Message = {
        role: "agent",
        content: "⚠️ Sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full mt-16">
      {/* Agent Header */}
      <div className="border-b p-4 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: agent.color }}
          >
            {agent.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.role}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message, i) => (
          <div 
            key={i} 
            className={`flex ${message.role === "agent" ? "justify-start" : "justify-end"}`}
          >
            <div className="max-w-[80%]">
              <div
                className={`inline-block px-4 py-2 rounded-lg whitespace-pre-wrap ${
                  message.role === "agent" 
                    ? "bg-secondary text-secondary-foreground" 
                    : "text-white"
                }`}
                style={{
                  backgroundColor: message.role === "user" ? agent.color : undefined
                }}
              >
                {message.content}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
