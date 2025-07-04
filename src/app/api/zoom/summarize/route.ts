import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { transcript, meetingTitle, attendees } = await request.json();

    if (!transcript) {
      return NextResponse.json({ error: "Meeting transcript is required" }, { status: 400 });
    }

    const prompt = `
As Agent Bob, the Zoom specialist, please analyze this meeting transcript and provide:

1. **Meeting Summary** (2-3 sentences)
2. **Key Discussion Points** (bullet points)
3. **Action Items** (who needs to do what)
4. **Decisions Made** (if any)
5. **Next Steps** (follow-up items)

Meeting: ${meetingTitle || "Untitled Meeting"}
Attendees: ${attendees || "Not specified"}

Transcript:
${transcript}

Please format your response clearly with the sections above.
`;

    const summary = await askGemini(prompt);
    
    return NextResponse.json({ 
      summary,
      meetingTitle,
      attendees,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Zoom summarize error:", error);
    return NextResponse.json({ 
      error: "Failed to summarize meeting" 
    }, { status: 500 });
  }
}

// GET endpoint for retrieving meeting summaries
export async function GET() {
  try {
    // This would typically fetch from a database
    // For now, return a placeholder response
    return NextResponse.json({ 
      message: "Agent Bob: I can help you summarize Zoom meetings. Please provide a meeting transcript via POST request." 
    });
  } catch {
    return NextResponse.json({ 
      error: "Failed to retrieve meeting data" 
    }, { status: 500 });
  }
} 