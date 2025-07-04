// src/types/next-auth.d.ts

declare module "next-auth" {
  interface Session {
    // Google tokens (backward compatibility)
    accessToken?: string;
    refreshToken?: string;
    
    // Separate Google tokens
    googleAccessToken?: string;
    googleRefreshToken?: string;
    
    // Notion tokens
    notionAccessToken?: string;
    notionBotId?: string;
    notionWorkspaceId?: string;
    notionWorkspaceName?: string;
    
    error?: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User {
    // optional: custom user fields if needed
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Legacy tokens (backward compatibility)
    accessToken?: string;
    refreshToken?: string;
    
    // Google tokens
    googleAccessToken?: string;
    googleRefreshToken?: string;
    googleAccessTokenExpires?: number;
    
    // Notion tokens
    notionAccessToken?: string;
    notionBotId?: string;
    notionWorkspaceId?: string;
    notionWorkspaceName?: string;
    
    error?: string;
  }
}
