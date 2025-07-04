import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function POST(req: NextRequest) {
  try {
    const { notionAccessToken } = await req.json();

    if (!notionAccessToken) {
      return NextResponse.json({ error: "Notion access token required" }, { status: 400 });
    }

    const notion = new Client({ auth: notionAccessToken });

    // Get user's databases
    const databases = await notion.search({
      filter: {
        value: "database",
        property: "object"
      },
      page_size: 50
    });

    // Get pages the user has access to
    const pages = await notion.search({
      filter: {
        value: "page",
        property: "object"
      },
      page_size: 20
    });

    return NextResponse.json({ 
      success: true, 
      databases: databases.results,
      pages: pages.results
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error("Notion auth error:", err);
    return NextResponse.json({ 
      error: "Failed to authenticate with Notion",
      details: errorMessage 
    }, { status: 500 });
  }
} 