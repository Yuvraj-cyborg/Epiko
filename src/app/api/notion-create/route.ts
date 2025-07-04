// src/app/api/notion-create/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function POST(req: NextRequest) {
  try {
    const { title, content, notionAccessToken, databaseId } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
    }

    if (!notionAccessToken) {
      return NextResponse.json({ error: "Notion access token required. Please connect your Notion account first." }, { status: 400 });
    }

    if (!databaseId) {
      return NextResponse.json({ error: "Database ID required. Please select a database." }, { status: 400 });
    }

    const notion = new Client({ auth: notionAccessToken });

    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content,
                },
              },
            ],
          },
        },
      ],
    });

    return NextResponse.json({ success: true, data: response });
  } catch (err: unknown) {
    console.error("Notion error:", err);
    return NextResponse.json({ error: "Failed to create Notion page" }, { status: 500 });
  }
}
