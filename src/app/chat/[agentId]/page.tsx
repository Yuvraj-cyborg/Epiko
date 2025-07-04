"use client"

import { useState, useRef, useEffect, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, Mail, Video, FileText, MoreVertical, Phone, VideoIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AgentSelector } from "@/components/agent-selector"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { NotionConnect } from "@/components/notion-connect"
import { agents } from "@/lib/agents"
import { useSessionManager } from "@/lib/hooks/useSessionManager"

interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
  agentType?: "gmail" | "zoom" | "notion"
  status?: "sending" | "sent" | "delivered" | "read"
}

export default function ChatPage({ params }: { params: Promise<{ agentId: string }> }) {
  const resolvedParams = use(params);
  const agent = agents.find((a) => a.id === resolvedParams.agentId);
  const session = useSessionManager();
  
  // Map agent IDs to types for the UI
  const getAgentType = (agentId: string): "gmail" | "zoom" | "notion" => {
    switch (agentId) {
      case "dev": return "gmail"
      case "bob": return "zoom"
      case "flow": return "notion"
      default: return "gmail"
    }
  }

  const [messages, setMessages] = useState<Message[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<"gmail" | "zoom" | "notion">(getAgentType(resolvedParams.agentId))
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Initialize messages on client side to avoid hydration mismatch
  useEffect(() => {
    if (!isInitialized) {
      setMessages([
        {
          id: "1",
          content: agent?.description ? 
            `Hello! I'm ${agent.name}. ${agent.description}. What would you like me to help you with today?` :
            "Hello! I'm your AI assistant. I can help you with Gmail, Zoom, and Notion tasks. What would you like me to help you with today?",
          sender: "agent",
          timestamp: new Date(),
          agentType: getAgentType(resolvedParams.agentId),
          status: "read",
        },
      ])
      setIsInitialized(true)
    }
  }, [agent, resolvedParams.agentId, isInitialized])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Update message status to sent
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "sent" } : msg)))
    }, 500)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: resolvedParams.agentId,
          messages: [...messages, userMessage],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          accessToken: (session as any)?.accessToken,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          notionAccessToken: (session as any)?.notionAccessToken
        })
      });

      const result = await response.json();

      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: result.message || "Sorry, I didn't get a response.",
        sender: "agent",
        timestamp: new Date(),
        agentType: selectedAgent,
        status: "read",
      }
      setMessages((prev) => [...prev, agentResponse])
      setIsTyping(false)

      // Mark user message as read
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" } : msg)))
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "⚠️ Sorry, I encountered an error. Please try again.",
        sender: "agent",
        timestamp: new Date(),
        agentType: selectedAgent,
        status: "read",
      };
      setMessages((prev) => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const getAgentIcon = (agentType: string) => {
    switch (agentType) {
      case "gmail":
        return Mail
      case "zoom":
        return Video
      case "notion":
        return FileText
      default:
        return Bot
    }
  }

  const getAgentColor = (agentType: string) => {
    switch (agentType) {
      case "gmail":
        return "from-blue-500 to-blue-600"
      case "zoom":
        return "from-sky-500 to-sky-600"
      case "notion":
        return "from-slate-700 to-slate-800"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getAgentName = (agentType: string) => {
    switch (agentType) {
      case "gmail":
        return "Agent Dev"
      case "zoom":
        return "Agent Bob"
      case "notion":
        return "Agent Flow"
      default:
        return "AI Assistant"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return "now"
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return date.toLocaleDateString()
  }

  if (!agent) {
    return <div className="container mx-auto px-4 py-8">Agent not found</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-8 max-w-7xl">
      <div className="flex gap-8 h-[calc(100vh-12rem)]">
        {/* Agent Selector Sidebar */}
        <div className="w-80 space-y-4">
          <AgentSelector selectedAgent={selectedAgent} onAgentSelect={setSelectedAgent} />
          
          {/* Show Notion connection for Agent Flow */}
          {selectedAgent === "notion" && (
            <NotionConnect />
          )}
        </div>

        {/* Chat Interface */}
        <div className="flex-1">
          <Card className="h-full bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-700/50 dark:border-gray-700/50 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700/30 bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback
                      className={`bg-gradient-to-br ${getAgentColor(selectedAgent)} text-white font-semibold flex items-center justify-center`}
                    >
                      {(() => {
                        const AgentIcon = getAgentIcon(selectedAgent)
                        return <AgentIcon className="w-5 h-5" />
                      })()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-white">{getAgentName(selectedAgent)}</h2>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full block"></span>
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="w-9 h-9 rounded-full">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-9 h-9 rounded-full">
                    <VideoIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-9 h-9 rounded-full">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-800/30">
              <AnimatePresence>
                {messages.map((message, index) => {
                  const showTimestamp =
                    index === 0 || messages[index - 1].timestamp.getTime() - message.timestamp.getTime() > 300000

                  return (
                    <div key={message.id}>
                                              {/* Timestamp Divider */}
                        {showTimestamp && (
                          <div className="flex items-center justify-center my-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                            <span className="px-3 text-xs text-gray-400 bg-gray-800/60 rounded-full py-1">
                              {formatTime(message.timestamp)}
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                          </div>
                        )}

                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`flex items-end gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {/* Agent Avatar */}
                        {message.sender === "agent" && (
                          <Avatar className="w-8 h-8 mb-1">
                            <AvatarFallback
                              className={`bg-gradient-to-br ${getAgentColor(message.agentType || selectedAgent)} text-white text-xs flex items-center justify-center`}
                            >
                              {(() => {
                                const AgentIcon = getAgentIcon(message.agentType || selectedAgent)
                                return <AgentIcon className="w-4 h-4" />
                              })()}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        {/* Message Bubble */}
                        <div className={`max-w-[70%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                          <div
                            className={`px-4 py-3 rounded-2xl relative ${
                              message.sender === "user"
                                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-md shadow-lg"
                                : "bg-gray-800/90 text-gray-100 rounded-bl-md shadow-lg backdrop-blur-sm border border-gray-700/30"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>

                            {/* Message tail */}
                            <div
                              className={`absolute bottom-0 ${
                                message.sender === "user"
                                  ? "right-0 translate-x-1 w-0 h-0 border-l-8 border-l-indigo-600 border-t-8 border-t-transparent"
                                  : "left-0 -translate-x-1 w-0 h-0 border-r-8 border-r-gray-800/90 border-t-8 border-t-transparent"
                              }`}
                            ></div>
                          </div>

                          {/* Message Info */}
                          <div
                            className={`flex items-center gap-1 mt-1 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <span className="text-xs text-gray-400">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            {message.sender === "user" && (
                              <div className="flex">
                                <div
                                  className={`w-1 h-1 rounded-full ${
                                    message.status === "read"
                                      ? "bg-blue-500"
                                      : message.status === "delivered"
                                        ? "bg-slate-400"
                                        : message.status === "sent"
                                          ? "bg-slate-300"
                                          : "bg-slate-200"
                                  }`}
                                ></div>
                                <div
                                  className={`w-1 h-1 rounded-full ml-0.5 ${
                                    message.status === "read" ? "bg-blue-500" : "bg-slate-200"
                                  }`}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* User Avatar */}
                        {message.sender === "user" && (
                          <Avatar className="w-8 h-8 mb-1">
                            <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-700 text-white text-xs flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    </div>
                  )
                })}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-end gap-2"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`bg-gradient-to-br ${getAgentColor(selectedAgent)} text-white text-xs flex items-center justify-center`}>
                      {(() => {
                        const AgentIcon = getAgentIcon(selectedAgent)
                        return <AgentIcon className="w-4 h-4" />
                      })()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-800/90 px-4 py-3 rounded-2xl rounded-bl-md backdrop-blur-sm border border-gray-700/30 shadow-lg">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-gray-800/50 border-t border-gray-700/30">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <input
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full bg-gray-700/80 text-gray-100 placeholder-gray-400 backdrop-blur-sm border-gray-600/50 rounded-3xl px-4 py-3 pr-12 focus:bg-gray-700/90 focus:border-gray-500 transition-all duration-200 resize-none min-h-[44px] max-h-32 border outline-none focus:ring-2 focus:ring-blue-500/50"
                    style={{ paddingTop: "12px", paddingBottom: "12px" }}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
