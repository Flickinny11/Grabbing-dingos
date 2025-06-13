# Hi-API - Premium AI Service Aggregator

![Hi-API Logo](public/logo.png)

> **The most comprehensive AI service aggregator platform with 50+ providers for image, video, audio, 3D, and text generation. Professional tools for creators and developers.**

🌟 **Live Demo**: [https://flickinny11.github.io/Grabbing-dingos/](https://flickinny11.github.io/Grabbing-dingos/)

## ✨ Features

### 🎨 **Multi-Category AI Services**
- **Image Generation**: DALL-E 3, Midjourney, Stable Diffusion XL, Adobe Firefly, Leonardo AI, Flux Pro
- **Video Generation**: Minimax Video-01, Kling AI, Runway Gen-3, Pika Labs, Luma Dream Machine
- **Audio Generation**: ElevenLabs, Murf AI, Stability Audio, AIVA, Soundful
- **3D Generation**: Meshy, Luma AI, Kaedim, CSM
- **Text & Language**: GPT-4, Claude 3, Gemini Pro, Cohere, Llama 2

### 🎯 **Modern Design**
- **Glass Morphism UI** with electric blue and neon cyan theme
- **3D Animations** with hover effects and smooth transitions
- **Responsive Design** optimized for all devices
- **Interactive Components** with Framer Motion animations

### 💳 **Payment & Credits System**
- **Stripe Integration** for secure payments
- **Credit System**: 1 credit = $0.01 USD
- **Tiered Pricing**:
  - Basic: 40% markup
  - Pro: 20% markup ($50/month)
  - Enterprise: 10% markup ($500/month)
- **Minimum Purchase**: $5.00 (500 credits)

### 🔐 **Authentication**
- **NextAuth.js** with Google and GitHub providers
- **Secure Sessions** with JWT tokens
- **User Profiles** with credit tracking and tier management

### 🔗 **Service Chaining**
- **Visual Workflow Editor** for connecting multiple AI services
- **Template Workflows** for common tasks
- **API Integration** for programmatic access
- **Real-time Processing** with WebSocket updates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for production)
- Redis (for caching)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Flickinny11/Grabbing-dingos.git
cd Grabbing-dingos
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hi-api"

# Stripe
STRIPE_PUBLIC_KEY=pk_test_your-stripe-public-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key

# AI Provider APIs
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
# ... add more provider keys
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Homepage
│   ├── image/             # Image generation category
│   ├── video/             # Video generation category
│   ├── audio/             # Audio generation category
│   ├── 3d/                # 3D generation category
│   ├── text/              # Text generation category
│   ├── workflows/         # Workflow management
│   └── auth/              # Authentication pages
├── components/            # Reusable components
│   ├── ui/                # UI components (Button, Card, etc.)
│   ├── layout/            # Layout components
│   └── providers/         # Context providers
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Database client
│   └── stripe.ts         # Payment processing
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

### Color Palette
- **Primary**: Electric Blue (#0066FF), Neon Cyan (#00FFFF)
- **Secondary**: Iridescent Purple (#6366F1), Holographic Silver (#E5E7EB)
- **Accents**: Neon Green (#00FF88), Coral Pink (#FF6B6B), Golden Yellow (#FFD700)

### Components
- **Glass Morphism**: Semi-transparent panels with backdrop blur
- **3D Animations**: CSS transforms with perspective and hover effects
- **Responsive Grid**: Masonry layout for media previews
- **Interactive Elements**: Buttons with depth and smooth transitions

## 🔌 API Integration

### Provider Framework
Each AI service provider follows a unified interface:

```typescript
interface Provider {
  id: string;
  name: string;
  category: 'image' | 'video' | 'audio' | '3d' | 'text';
  pricing: PricingStructure;
  features: string[];
  generate: (params: GenerationParams) => Promise<GenerationResult>;
}
```

### Supported Services

#### Image Generation (15+ providers)
- OpenAI DALL-E 3
- Midjourney v6
- Stable Diffusion XL
- Adobe Firefly
- Leonardo AI
- Flux Pro
- Playground AI
- Ideogram
- And more...

#### Video Generation (12+ providers)
- Minimax Video-01
- Kling AI
- Runway Gen-3
- Pika Labs
- Luma Dream Machine
- Stable Video Diffusion
- Synthesia
- And more...

#### Audio Generation (18+ providers)
- ElevenLabs
- Murf AI
- Stability Audio
- AIVA
- Soundful
- Boomy
- Musicfy
- And more...

## 📱 Usage Examples

### Basic Image Generation
```typescript
import { generateImage } from '@/lib/providers';

const result = await generateImage({
  provider: 'dalle3',
  prompt: 'A beautiful sunset over mountains',
  size: '1024x1024',
  quality: 'hd'
});
```

### Workflow Chaining
```typescript
import { createWorkflow } from '@/lib/workflows';

const workflow = createWorkflow([
  { provider: 'dalle3', type: 'image', params: { prompt: 'A cat' } },
  { provider: 'runway', type: 'video', params: { image: 'previous' } },
  { provider: 'elevenlabs', type: 'audio', params: { text: 'Meow' } }
]);

const result = await workflow.execute();
```

## 🚢 Deployment

### GitHub Pages (Current)
The project is configured for automatic deployment to GitHub Pages:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - uses: actions/deploy-pages@v4
```

### Production Deployment
For full functionality, deploy to a platform that supports:
- Node.js API routes
- PostgreSQL database
- Redis caching
- Environment variables

Recommended platforms:
- Vercel
- Railway
- Render
- Digital Ocean App Platform

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use the established design system
- Write tests for new features
- Ensure responsive design
- Optimize for performance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for beautiful animations
- [Prisma](https://prisma.io/) for the excellent database toolkit
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Stripe](https://stripe.com/) for payment processing

## 📞 Support

- 📧 Email: support@hi-api.com
- 💬 Discord: [Join our community](https://discord.gg/hi-api)
- 📖 Documentation: [docs.hi-api.com](https://docs.hi-api.com)
- 🐛 Issues: [GitHub Issues](https://github.com/Flickinny11/Grabbing-dingos/issues)

---

**Built with ❤️ by the Hi-API Team**

> Making AI accessible to everyone, one API at a time.
