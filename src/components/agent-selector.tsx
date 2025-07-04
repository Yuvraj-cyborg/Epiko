"use client"

import { Mail, Video, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AgentSelectorProps {
  selectedAgent: "gmail" | "zoom" | "notion"
  onAgentSelect: (agent: "gmail" | "zoom" | "notion") => void
}

const agents = [
  {
    id: "gmail" as const,
    name: "Agent Dev",
    description: "Gmail automation and email management",
    icon: Mail,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "zoom" as const,
    name: "Agent Bob",
    description: "Zoom meetings and calendar scheduling",
    icon: Video,
    color: "from-sky-500 to-sky-600",
  },
  {
    id: "notion" as const,
    name: "Agent Flow",
    description: "Notion workspace organization",
    icon: FileText,
    color: "from-slate-700 to-slate-800",
  },
]

export function AgentSelector({ selectedAgent, onAgentSelect }: AgentSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Choose Your Agent
      </h2>
      <div className="space-y-3">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className={cn(
              "p-4 cursor-pointer transition-all duration-200 bg-gray-900/60 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/70",
              selectedAgent === agent.id && "ring-2 ring-blue-500 bg-gray-800/80"
            )}
            onClick={() => onAgentSelect(agent.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                <agent.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">
                  {agent.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {agent.description}
                </p>
              </div>
              {selectedAgent === agent.id && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 