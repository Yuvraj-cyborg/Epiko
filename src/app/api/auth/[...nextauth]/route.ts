// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Custom Notion OAuth Provider
const NotionProvider = {
  id: "notion",
  name: "Notion",
  type: "oauth" as const,
  authorization: {
    url: "https://api.notion.com/v1/oauth/authorize",
    params: {
      response_type: "code",
      owner: "user",
    },
  },
  token: "https://api.notion.com/v1/oauth/token",
  userinfo: {
    url: "https://api.notion.com/v1/users/me",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async request({ tokens }: any) {
      const response = await fetch("https://api.notion.com/v1/users/me", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          "Notion-Version": "2022-06-28",
        },
      });
      return await response.json();
    },
  },
  clientId: process.env.NOTION_CLIENT_ID!,
  clientSecret: process.env.NOTION_CLIENT_SECRET!,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile(profile: any) {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.person?.email || profile.bot?.owner?.user?.person?.email,
      image: profile.avatar_url,
    };
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  try {
    const url = "https://oauth2.googleapis.com/token?" + new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.googleRefreshToken,
    });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      googleAccessToken: refreshedTokens.access_token,
      googleAccessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      googleRefreshToken: refreshedTokens.refresh_token ?? token.googleRefreshToken,
      // Update legacy tokens for backward compatibility
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.googleRefreshToken,
    };
  } catch (error) {
    console.error("RefreshAccessTokenError", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline", // 👈 important to get refresh token
          prompt: "consent",      // 👈 always show consent screen
          scope: "openid email profile https://www.googleapis.com/auth/gmail.send",
        },
      },
    }),
    NotionProvider,
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign in
      if (account) {
        if (account.provider === "google") {
          token.googleAccessToken = account.access_token;
          token.googleRefreshToken = account.refresh_token;
          token.googleAccessTokenExpires = Date.now() + (Number(account.expires_in) || 3600) * 1000;
        } else if (account.provider === "notion") {
          token.notionAccessToken = account.access_token;
          token.notionBotId = account.bot_id as string;
          token.notionWorkspaceId = account.workspace_id as string;
          token.notionWorkspaceName = account.workspace_name as string;
        }
        return token;
      }

      // Handle Google token refresh
      if (token.googleAccessToken && Date.now() >= (token.googleAccessTokenExpires as number)) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      // Add all tokens to session
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).googleAccessToken = token.googleAccessToken;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).googleRefreshToken = token.googleRefreshToken;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).notionAccessToken = token.notionAccessToken;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).notionBotId = token.notionBotId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).notionWorkspaceId = token.notionWorkspaceId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).notionWorkspaceName = token.notionWorkspaceName;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).error = token.error;
      
      // Keep backward compatibility
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).accessToken = token.googleAccessToken;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).refreshToken = token.googleRefreshToken;
      
      return session;
    },
  },
});

export { handler as GET, handler as POST };
