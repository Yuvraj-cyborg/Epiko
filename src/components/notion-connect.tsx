"use client"

import { useState, useEffect, useCallback } from "react"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, CheckCircle, AlertCircle } from "lucide-react"

export function NotionConnect() {
  const { data: session } = useSession()
  const [databases, setDatabases] = useState<Array<{ id: string; title?: string }>>([])
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isNotionConnected = !!(session as any)?.notionAccessToken

  const handleNotionSignIn = () => {
    signIn("notion")
  }

  const fetchDatabases = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(session as any)?.notionAccessToken) return

    setLoading(true)
    try {
      const response = await fetch('/api/notion/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          notionAccessToken: (session as any)?.notionAccessToken 
        })
      })

      if (response.ok) {
        const data = await response.json()
        setDatabases(data.databases || [])
      }
    } catch (error) {
      console.error('Failed to fetch Notion databases:', error)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, [(session as any)?.notionAccessToken])

  useEffect(() => {
    if (isNotionConnected) {
      fetchDatabases()
    }
  }, [isNotionConnected, fetchDatabases])

  return (
    <Card className="p-4 bg-gray-900/60 backdrop-blur-xl border-gray-700/50">
      <div className="flex items-center gap-3 mb-3">
        <FileText className="w-5 h-5 text-white" />
        <h3 className="font-medium text-white">Notion Integration</h3>
      </div>

      {isNotionConnected ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Connected to Notion</span>
          </div>
          
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(session as any)?.notionWorkspaceName && (
            <p className="text-xs text-gray-400">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              Workspace: {(session as any).notionWorkspaceName}
            </p>
          )}

          {loading ? (
            <p className="text-xs text-gray-400">Loading databases...</p>
          ) : (
            <p className="text-xs text-gray-400">
              {databases.length} database{databases.length !== 1 ? 's' : ''} available
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-yellow-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Not connected</span>
          </div>
          
          <p className="text-xs text-gray-400">
            Connect to create pages in your own Notion workspace
          </p>
          
          <Button
            onClick={handleNotionSignIn}
            size="sm"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white"
          >
            Connect Notion
          </Button>
        </div>
      )}
    </Card>
  )
} 