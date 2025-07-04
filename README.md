# Epiko - AI Agent Command Center

A powerful AI-powered assistant platform that provides automated services for Gmail, Zoom, and Notion through specialized AI agents.

## 🤖 AI Agents

- **Agent Dev** - Gmail automation and email management
- **Agent Bob** - Zoom meeting transcription and summarization  
- **Agent Flow** - Notion workspace organization and content creation

## 🚀 Features

- **Multi-Agent System** - Command multiple specialized AI agents from one interface
- **Natural Language** - Interact with your tools using simple, conversational commands
- **OAuth Integration** - Secure connections to Google (Gmail) and Notion
- **Modern UI** - Beautiful glassmorphic design with dark theme
- **Real-time Chat** - Live messaging with typing indicators and message status
- **Secure & Private** - Enterprise-grade security with end-to-end encryption

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Google Cloud Project (for Gmail integration)
- A Notion Integration (for Notion features)
- A Gemini API key (for AI responses)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd epiko
```

### 2. Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Or using npm:
```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Google OAuth (for Gmail)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Notion OAuth
NOTION_CLIENT_ID=your-notion-client-id
NOTION_CLIENT_SECRET=your-notion-client-secret

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Application URL
NEXT_PUBLIC_URL=http://localhost:3000
```

## 🔑 OAuth Setup

### Google OAuth Setup (for Gmail)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy the Client ID and Client Secret to your `.env.local`

### Notion OAuth Setup

1. Go to [Notion Developers](https://developers.notion.com/)
2. Create a new integration
3. Set the redirect URI to:
   - `http://localhost:3000/api/auth/callback/notion` (development)
   - `https://yourdomain.com/api/auth/callback/notion` (production)
4. Copy the OAuth client ID and client secret to your `.env.local`
5. Add these URLs in your Notion integration settings:
   - **Privacy Policy URL**: `https://yourdomain.com/privacy`
   - **Terms of Use URL**: `https://yourdomain.com/terms`

### Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key to your `.env.local`

## 🏃‍♂️ Running the Application

### Development Mode

Using Bun:
```bash
bun dev
```

Using npm:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application
bun run build

# Start production server
bun start
```

## 📱 Usage

1. **Sign In**: Use Google OAuth to sign in with your Gmail account
2. **Connect Notion**: Optional - connect your Notion workspace for Agent Flow
3. **Chat with Agents**: Select an agent and start chatting:
   - **Agent Dev**: "Send an email to john@example.com about the meeting"
   - **Agent Bob**: "Summarize this meeting transcript: [paste transcript]"
   - **Agent Flow**: "Create a Notion page titled 'Project Notes' with content about our discussion"

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update OAuth redirect URIs to use your production domain
5. Deploy!

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

Make sure to:
1. Set all environment variables
2. Update OAuth redirect URIs
3. Update `NEXT_PUBLIC_URL` to your production domain

## 🗂️ Project Structure

```
epiko/
├── src/
│   ├── app/                 # Next.js 13+ app directory
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── chat/           # Chat interface
│   │   ├── privacy/        # Privacy policy
│   │   └── terms/          # Terms of use
│   ├── components/         # React components
│   │   ├── chat/          # Chat-related components
│   │   ├── ui/            # UI components
│   │   └── ...
│   ├── lib/               # Utilities and configurations
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── ...
```

## 🔧 Configuration

### Adding New Agents

1. Add agent configuration in `src/lib/agents/index.ts`
2. Update the agent selector in `src/components/agent-selector.tsx`
3. Add agent-specific logic in `src/app/api/chat/route.ts`

### Customizing UI

- Colors and themes: `tailwind.config.ts`
- Component styles: Individual component files
- Global styles: `src/app/globals.css`

## 🐛 Troubleshooting

### Common Issues

1. **OAuth Redirect URI Mismatch**
   - Ensure redirect URIs in OAuth providers match your application URLs

2. **Environment Variables**
   - Double-check all required environment variables are set
   - Restart the development server after changes

3. **API Errors**
   - Check API keys are valid and have proper permissions
   - Verify network connectivity

### Logs

Check the browser console and terminal for detailed error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email [We will add later] or create an issue in the repository.

---

**Location**: Bhubaneshwar, Odisha, India

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
