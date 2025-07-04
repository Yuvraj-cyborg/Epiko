"use client";
import { agents } from "@/lib/agents";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AgentList() {
  const pathname = usePathname();
  return (
    <aside className="w-80 bg-gray-50 border-r p-4 h-full">
      <h2 className="font-bold text-xl mb-6">Epiko Agents</h2>
      <div className="space-y-3">
        {agents.map((agent) => {
          const isActive = pathname.includes(agent.id);
          return (
            <Link
              key={agent.id}
              href={`/chat/${agent.id}`}
              className={`block p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                isActive 
                  ? "bg-white shadow-lg border-gray-300" 
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ backgroundColor: agent.color }}
                >
                  {agent.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-lg ${isActive ? 'text-gray-900' : 'text-gray-800'}`}>
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {agent.role}
                  </p>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    {agent.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 3).map(cap => (
                      <span 
                        key={cap}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {cap.replace('_', ' ')}
                      </span>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{agent.capabilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-sm text-blue-900 mb-2">
          💡 How it works
        </h3>
        <p className="text-xs text-blue-700 leading-relaxed">
          Each agent specializes in different tasks. Choose the right agent for your needs, or let them guide you to the appropriate specialist.
        </p>
      </div>
    </aside>
  );
}
