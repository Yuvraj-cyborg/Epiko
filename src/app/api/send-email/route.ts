import { NextRequest, NextResponse } from "next/server";

async function sendEmail(accessToken: string, emailData: { to: string; subject: string; message: string }) {
  const raw = makeRawEmail(emailData);

  const res = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to send email: ${errorText}`);
  }

  return await res.json();
}

export async function POST(request: NextRequest) {
  try {
    const { accessToken, to, subject, message } = await request.json();

    if (!accessToken || !to || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await sendEmail(accessToken, { to, subject, message });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

function makeRawEmail({ to, subject, message }: { to: string; subject: string; message: string }) {
  const email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    "",
    message,
  ].join("\n");

  return Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
