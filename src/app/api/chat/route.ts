import { NextRequest, NextResponse } from "next/server";
import { getAgentById } from "@/lib/agents";
import { askGemini } from "@/lib/gemini";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractJson(text: string): any | null {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
  const match = text.match(jsonRegex);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  }
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// This is the new, unified API endpoint for all agent communication.
export async function POST(request: NextRequest) {
  try {
    const { agentId, messages, accessToken, notionAccessToken } = await request.json();

    if (!agentId || !messages) {
      return NextResponse.json({ error: "agentId and messages are required" }, { status: 400 });
    }

    const agent = getAgentById(agentId);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Construct the prompt for Gemini
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const history = messages.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n');
    const prompt = `${agent.systemPrompt}\n\nConversation History:\n${history}`;

    // Ask Gemini for a response
    const geminiResponseText = await askGemini(prompt);

    // Check if the response is a JSON action
    const jsonAction = extractJson(geminiResponseText);
    
    if (jsonAction && jsonAction.action) {
      // This is an action to be executed
      const actionResult = await executeAction(jsonAction.action, jsonAction.params, accessToken, notionAccessToken);
      return NextResponse.json(actionResult);
    }

    // Return the conversational response
    return NextResponse.json({
      type: "talk",
      message: geminiResponseText,
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function executeAction(action: string, params: any, accessToken?: string, notionAccessToken?: string) {
  switch (action) {
    case 'send_email':
      if (!params.to || params.subject === undefined || !params.message) {
        return { type: 'talk', message: "It looks like I'm missing some details for the email. Can you confirm the recipient, subject, and message?" };
      }
      if (!accessToken) {
        return { type: 'talk', message: "I'm ready to send, but I need you to be logged in with Google first." };
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken,
            to: params.to,
            subject: params.subject,
            message: params.message
          })
        });

        if (response.ok) {
          return { type: 'talk', message: `✅ Email sent successfully to ${params.to}!` };
        } else {
          const errorResult = await response.json();
          return { type: 'talk', message: `❌ Failed to send email: ${errorResult.error}` };
        }
      } catch {
        return { type: 'talk', message: "❌ There was an error sending the email. Please check the connection and try again." };
      }
      
    case 'summarize_transcript':
      // Placeholder for Zoom action
      return { type: 'talk', message: `I've received the transcript and will start summarizing it now.` };
      
    case 'create_notion_page':
      if (!params.title || !params.content) {
        return { type: 'talk', message: "I'm missing a title or content for the Notion page. Could you provide both?" };
      }
      
      if (!notionAccessToken) {
        return { type: 'talk', message: "I need you to connect your Notion account first. Please sign in with Notion to continue." };
      }

      // If no database specified, get user's databases first
      if (!params.databaseId) {
        try {
          const dbResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notion/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notionAccessToken })
          });

          if (dbResponse.ok) {
            const { databases } = await dbResponse.json();
            if (databases && databases.length > 0) {
              // Use the first available database
              params.databaseId = databases[0].id;
            } else {
              return { type: 'talk', message: "I couldn't find any databases in your Notion workspace. Please create a database first." };
            }
          } else {
            return { type: 'talk', message: "❌ Failed to access your Notion workspace. Please check your connection." };
          }
        } catch {
          return { type: 'talk', message: "❌ Failed to connect to your Notion workspace." };
        }
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notion-create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: params.title,
            content: params.content,
            notionAccessToken,
            databaseId: params.databaseId,
          })
        });

        if (response.ok) {
          await response.json();
          return { type: 'talk', message: `✅ Notion page "${params.title}" created successfully in your workspace!` };
        } else {
          const errorResult = await response.json();
          return { type: 'talk', message: `❌ Failed to create Notion page: ${errorResult.error}` };
        }
              } catch {
          return { type: 'talk', message: "❌ An unexpected error occurred while creating the Notion page." };
        }

    default:
      return { type: 'talk', message: "I'm not sure how to handle that action." };
  }
} 