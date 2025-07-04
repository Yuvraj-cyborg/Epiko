import 'next-auth';

declare module 'next-auth' {
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
}

declare module 'next-auth/jwt' {
  interface JWT {
    // Legacy tokens (backward compatibility)
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    
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