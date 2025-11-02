<div align="center">
  <img src="public/sajilodaanlogo.ico" alt="BlogForge Logo" width="120" height="120">
  
  # 🔥 BlogForge
  
  ### _Forge Your Stories, Shape The Future_
  
  [![GitHub stars](https://img.shields.io/github/stars/jha-niraj/blogforge?style=social)](https://github.com/jha-niraj/blogforge/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/jha-niraj/blogforge?style=social)](https://github.com/jha-niraj/blogforge/network/members)
  [![GitHub issues](https://img.shields.io/github/issues/jha-niraj/blogforge)](https://github.com/jha-niraj/blogforge/issues)
  [![GitHub license](https://img.shields.io/github/license/jha-niraj/blogforge)](https://github.com/jha-niraj/blogforge/blob/main/LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

  **A modern, open-source blogging platform built for developers, by developers** 🚀

  [🌐 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](https://github.com/jha-niraj/blogforge/issues) • [✨ Request Feature](https://github.com/jha-niraj/blogforge/issues)

</div>

---

## 🌟 What is BlogForge?

BlogForge is a **collaborative learning platform** where developers can write, share, and discover technical blogs while learning modern web development. Built with the latest technologies, it serves as both a **functional blogging platform** and a **hands-on learning project** for contributors.

### 🎯 Why BlogForge?

- 🎓 **Learn by Contributing** - Real-world experience with Next.js 15, React 19, and modern web technologies
- 🤝 **Collaborative Development** - Work with other developers and learn from code reviews
- 📚 **Production-Ready Code** - Learn industry best practices and clean code patterns
- 🔧 **Full-Stack Experience** - Frontend, Backend, Database, Authentication, and more
- 🚀 **Portfolio Builder** - Contribute to an open-source project for your resume

---

## ✨ Features

### � Authentication & User Management
- Email/Password authentication with verification
- Google OAuth integration
- Password reset functionality
- Role-based access control (User/Admin)
- Secure session management with NextAuth v4

### 📝 Blog Management
- Rich markdown editor with live preview
- Syntax highlighting for code blocks
- Image upload with Cloudinary integration
- Draft and publish workflow
- Tag-based categorization
- Responsive blog cards with modern UI

### 🎨 Modern UI/UX
- Beautiful gradient designs
- Dark/Light theme support
- Fully responsive (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Toast notifications
- Loading states and skeletons

### ⚡ Performance & Optimization
- Redis caching for faster data retrieval
- Server-side rendering (SSR)
- Optimized images with Next.js Image
- Database connection pooling with Prisma
- API route optimization

### 📊 Dashboard & Analytics
- Personal dashboard with statistics
- Total blogs count
- Recent posts overview
- Tag analytics
- User blog management

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, Server Actions |
| **Database** | PostgreSQL with Prisma ORM |
| **Authentication** | NextAuth.js v4 |
| **Storage** | Cloudinary (Images) |
| **Caching** | Redis |
| **Email** | Resend |
| **UI Components** | Radix UI, Framer Motion, Lucide Icons |
| **Validation** | Zod |
| **Code Quality** | ESLint, Prettier, TypeScript |

</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (or use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app))
- **Git** ([Download](https://git-scm.com/))

### Installation

1️⃣ **Fork and Clone the Repository**

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/blogforge.git
cd blogforge
```

2️⃣ **Install Dependencies**

```bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
```

> **Note:** We use `--legacy-peer-deps` due to React 19 compatibility with some packages.

3️⃣ **Set Up Environment Variables**

```bash
cp .env.example .env
```

Edit `.env` and fill in your configuration:

```env
# Database (Get from Neon, Supabase, or Railway)
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Google OAuth (Optional)
NEXT_GOOGLE_CLIENT_ID="your-google-client-id"
NEXT_GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Resend (Email)
RESEND_API_KEY="your-resend-api-key"

# Cloudinary (Images)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Redis (Optional)
REDIS_URL="redis://localhost:6379"
```

4️⃣ **Set Up the Database**

```bash
# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

5️⃣ **Run the Development Server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6️⃣ **Open Your Browser**

Navigate to [http://localhost:3000](http://localhost:3000) 🎉

---

## 📚 Project Structure

```
blogforge/
├── actions/              # Server actions for data mutations
│   ├── auth.action.ts
│   ├── blogs.action.ts
│   └── onboarding.action.ts
├── app/                  # Next.js App Router
│   ├── (auth)/          # Authentication pages (signin, signup, etc.)
│   ├── (main)/          # Main app (dashboard, blogs, create)
│   ├── api/             # API routes (NextAuth, etc.)
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── components/           # React components
│   ├── ui/              # Reusable UI components (buttons, cards, etc.)
│   ├── blog-card.tsx
│   ├── navbar.tsx
│   └── mainsidebar.tsx
├── lib/                  # Utility functions and configs
│   ├── auth.ts          # Auth helper functions
│   ├── prisma.ts        # Prisma client singleton
│   ├── redisclient.ts   # Redis client
│   └── utils.ts         # Common utilities
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets
├── .env.example         # Environment variables template
├── CONTRIBUTING.md      # Contribution guidelines
└── README.md            # You are here!
```

---

## 🤝 Contributing

We **love** contributions! BlogForge is built for learning, so whether you're a beginner or an expert, there's a place for you here.

### How to Contribute

1. 📖 Read our [Contributing Guide](CONTRIBUTING.md)
2. 🍴 Fork the repository
3. 🌿 Create a branch (`git checkout -b feature/amazing-feature`)
4. 💻 Make your changes
5. ✅ Test thoroughly
6. 📝 Commit with meaningful messages (`git commit -m 'feat: add amazing feature'`)
7. 🚀 Push to your fork (`git push origin feature/amazing-feature`)
8. 🎉 Open a Pull Request

### Good First Issues

New to open source? Look for issues labeled [`good first issue`](https://github.com/jha-niraj/blogforge/labels/good%20first%20issue) - they're perfect for beginners!

### What Can You Contribute?

- 🐛 **Bug Fixes** - Found a bug? Fix it!
- ✨ **New Features** - Have an idea? Implement it!
- 📝 **Documentation** - Improve docs, add tutorials
- 🎨 **UI/UX** - Enhance the design
- ♿ **Accessibility** - Make it accessible to everyone
- 🧪 **Tests** - Add unit/integration tests
- 🌐 **Translations** - Translate to other languages
- 📊 **Performance** - Optimize code and queries

---

## 🎓 Learning Opportunities

By contributing to BlogForge, you'll learn:

### Frontend Development
- ⚛️ Next.js 15 App Router and Server Components
- 🎨 Tailwind CSS and modern design patterns
- 🎭 Framer Motion animations
- 📱 Responsive design and mobile-first approach

### Backend Development
- 🔒 Authentication with NextAuth.js
- 🗄️ Database design with Prisma ORM
- ⚡ Redis caching strategies
- 📧 Email integration with Resend

### DevOps & Tools
- 🐙 Git workflow and collaboration
- 📦 Package management
- 🧪 Code quality tools (ESLint, Prettier)
- 🚀 Deployment strategies

### Best Practices
- 🏗️ Clean code architecture
- 📖 Documentation writing
- 👥 Code review process
- 🔄 CI/CD pipelines

---

## 📖 Documentation

- [Getting Started Guide](docs/getting-started.md) - _(Coming Soon)_
- [API Documentation](docs/api.md) - _(Coming Soon)_
- [Database Schema](prisma/schema.prisma)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- [x] Basic authentication (email/password, Google OAuth)
- [x] Blog creation with markdown
- [x] User dashboard
- [x] Blog listing and pagination
- [x] Dark/Light theme
- [x] Responsive design

### Version 1.1 (In Progress)
- [ ] Comment system
- [ ] Like/Bookmark functionality
- [ ] User profiles
- [ ] Search functionality
- [ ] Blog categories

### Version 2.0 (Future)
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] SEO optimization
- [ ] Newsletter integration
- [ ] Social sharing
- [ ] API for third-party integrations

[View Full Roadmap](https://github.com/jha-niraj/blogforge/projects)

---

## 🙏 Contributors

Thanks to all the amazing contributors who make BlogForge better! 🎉

<a href="https://github.com/jha-niraj/blogforge/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jha-niraj/blogforge" />
</a>

Want to see your face here? [Start contributing!](CONTRIBUTING.md)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 💬 Community & Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/jha-niraj/blogforge/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/jha-niraj/blogforge/discussions)
- 📧 **Email**: [your-email@example.com]
- 🐦 **Twitter**: [@YourHandle]
- 💬 **Discord**: [Join our Discord](#) _(Coming Soon)_

---

## ⭐ Show Your Support

If you find BlogForge helpful, please consider:

- ⭐ Starring the repository
- 🍴 Forking it for your own experiments
- 📢 Sharing it with others
- 🤝 Contributing to the project
- 💬 Providing feedback

---

## 🙌 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Hosted on [Vercel](https://vercel.com)

---

<div align="center">

**Built with ❤️ by developers, for developers**

[⬆ Back to Top](#-blogforge)

</div>
