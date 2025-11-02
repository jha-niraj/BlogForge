# Changelog

All notable changes to BlogForge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-02

### 🎉 Initial Release

BlogForge is now open source! A modern blogging platform built for developers to learn and contribute.

### ✨ Added

#### Authentication & User Management
- Email/Password authentication with verification
- Google OAuth integration
- Password reset functionality
- Email verification with OTP
- Role-based access control (User/Admin)
- Secure session management with NextAuth v4

#### Blog Features
- Rich markdown editor with live preview
- Syntax highlighting for code blocks
- Image upload with Cloudinary integration
- Draft and publish workflow
- Tag-based categorization
- Blog pagination (9 per page)
- Personal blog dashboard

#### UI/UX
- Modern gradient design system
- Dark/Light theme support with next-themes
- Fully responsive (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Toast notifications with Sonner
- Loading states and skeleton loaders
- Fixed sidebar navigation
- Bottom navigation for mobile

#### Performance
- Redis caching for improved performance
- Server-side rendering (SSR) with Next.js 15
- Optimized images with Next.js Image
- Database connection pooling with Prisma
- Efficient API routes

#### Developer Experience
- TypeScript for type safety
- ESLint and Prettier configuration
- Comprehensive error handling
- Clean code architecture
- Detailed documentation

#### Documentation
- Comprehensive README with badges and visuals
- Contributing guidelines (CONTRIBUTING.md)
- Code of Conduct (CODE_OF_CONDUCT.md)
- Quick Start Guide (QUICK_START.md)
- Environment variable templates (.env.example)
- Issue and PR templates
- Automated setup script

### 🛠️ Technical Stack
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Server Actions
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v4
- **Storage:** Cloudinary
- **Caching:** Redis
- **Email:** Resend
- **UI:** Radix UI, Framer Motion, Lucide Icons

### 📁 Project Structure
```
blogforge/
├── actions/              # Server actions
├── app/                  # Next.js App Router
│   ├── (auth)/          # Auth pages
│   ├── (main)/          # Main app
│   └── api/             # API routes
├── components/           # React components
├── lib/                  # Utilities
├── prisma/              # Database schema
└── public/              # Static assets
```

### 🎯 Key Features
1. **Authentication System**
   - Secure email/password auth
   - Google OAuth
   - Email verification
   - Password reset

2. **Blog Management**
   - Markdown editor
   - Image uploads
   - Tag system
   - Draft mode

3. **Dashboard**
   - Statistics overview
   - Personal blog management
   - Quick create access

4. **Modern UI**
   - Beautiful gradients
   - Theme switching
   - Responsive design
   - Smooth animations

### 🔐 Security
- Secure password hashing with bcrypt
- JWT-based sessions
- CSRF protection
- SQL injection prevention with Prisma
- XSS protection

### ♿ Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

### 🌐 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 📝 License
MIT License - See [LICENSE](LICENSE) for details

---

## [Unreleased]

### 🚧 In Development
- Comment system for blogs
- Like/Bookmark functionality
- User profile pages
- Advanced search
- Blog categories
- Newsletter integration

### 💡 Planned Features
- Real-time notifications
- Advanced analytics
- SEO optimization
- Social sharing
- API for third-party integrations
- Mobile app

---

## Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

## Support

- 🐛 [Report Bugs](https://github.com/jha-niraj/blogforge/issues)
- 💡 [Request Features](https://github.com/jha-niraj/blogforge/issues)
- 💬 [Discussions](https://github.com/jha-niraj/blogforge/discussions)

---

**[⬆ Back to README](README.md)**
