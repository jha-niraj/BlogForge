# 🚀 Quick Start Guide for BlogForge

Welcome to BlogForge! This guide will help you get started quickly.

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] **PostgreSQL database** or account on:
  - [Neon](https://neon.tech) (Recommended - Free tier available)
  - [Supabase](https://supabase.com)
  - [Railway](https://railway.app)
- [ ] **Resend account** for emails ([Sign up](https://resend.com))
- [ ] **Cloudinary account** for images ([Sign up](https://cloudinary.com))
- [ ] (Optional) **Google OAuth credentials** ([Setup Guide](https://console.cloud.google.com/))

## 🎯 Installation Methods

### Method 1: Automated Setup (Recommended)

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/blogforge.git
cd blogforge

# 2. Run the setup script
./setup.sh
```

The script will:
- Install dependencies
- Create .env file
- Generate Prisma client
- Optionally push database schema

### Method 2: Manual Setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/blogforge.git
cd blogforge

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 4. Set up database
npx prisma generate
npx prisma db push

# 5. Start development server
npm run dev
```

## 🔑 Environment Variables Setup

### Required Variables

1. **Database URL** (PostgreSQL)
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```
   
   **Using Neon (Recommended):**
   - Go to [console.neon.tech](https://console.neon.tech)
   - Create a new project
   - Copy the connection string
   - Paste in .env

2. **NextAuth Configuration**
   ```env
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key"
   ```
   
   Generate secret:
   ```bash
   openssl rand -base64 32
   ```

3. **Resend API Key** (Email)
   ```env
   RESEND_API_KEY="re_your_api_key"
   ```
   
   Get from: [resend.com/api-keys](https://resend.com/api-keys)

4. **Cloudinary** (Images)
   ```env
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```
   
   Get from: [cloudinary.com/console](https://cloudinary.com/console)

### Optional Variables

5. **Google OAuth** (Optional - for Google Sign-In)
   ```env
   NEXT_GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
   NEXT_GOOGLE_CLIENT_SECRET="your-client-secret"
   ```
   
   Setup guide: [Google OAuth Setup](#google-oauth-setup)

6. **Redis** (Optional - for caching)
   ```env
   REDIS_URL="redis://localhost:6379"
   ```
   
   Use [Upstash](https://upstash.com) for free Redis

## 🎨 First Steps After Installation

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

3. **Create an account:**
   - Click "Sign Up"
   - Fill in your details
   - Verify your email (check your inbox)

4. **Create your first blog:**
   - Go to Dashboard
   - Click "Create New Blog"
   - Write in markdown
   - Publish!

## 🐛 Common Issues & Solutions

### Issue: `npm install` fails with peer dependency errors

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue: Database connection error

**Solutions:**
- Check DATABASE_URL in .env is correct
- Ensure database is running (if local)
- Verify network connectivity to cloud database
- Check database credentials

### Issue: Prisma errors

**Solutions:**
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset

# View database in Prisma Studio
npx prisma studio
```

### Issue: Authentication not working

**Solutions:**
- Check NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your app URL
- Clear browser cookies and try again

### Issue: Email verification not sending

**Solutions:**
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for delivery status
- Ensure "from" email is verified in Resend

## 📱 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Client Secret to .env

## 🗄️ Database Management

### View your database:
```bash
npx prisma studio
```

### Create a migration:
```bash
npx prisma migrate dev --name your_migration_name
```

### Reset database (WARNING: Deletes all data):
```bash
npx prisma db push --force-reset
```

## 🧪 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open database GUI |
| `npx prisma generate` | Generate Prisma client |

## 🎓 Next Steps

1. **Explore the codebase:**
   - Check out `/app` for pages
   - Look at `/components` for UI components
   - Review `/actions` for server actions

2. **Read the documentation:**
   - [Contributing Guide](CONTRIBUTING.md)
   - [Full README](README.md)
   - [Code of Conduct](CODE_OF_CONDUCT.md)

3. **Find something to work on:**
   - Check [Issues](https://github.com/jha-niraj/blogforge/issues)
   - Look for `good first issue` labels
   - Suggest new features

4. **Join the community:**
   - Star the repository ⭐
   - Fork for your experiments
   - Submit your first PR

## 💬 Need Help?

- 🐛 **Bug?** [Open an issue](https://github.com/jha-niraj/blogforge/issues/new?template=bug_report.md)
- 💡 **Feature idea?** [Request a feature](https://github.com/jha-niraj/blogforge/issues/new?template=feature_request.md)
- ❓ **Questions?** [GitHub Discussions](https://github.com/jha-niraj/blogforge/discussions)

## 🎉 You're All Set!

Happy coding! Remember:
- 🌟 Star the repo if you find it helpful
- 🤝 Contribute to help others learn
- 📢 Share with friends who want to learn

---

**[⬆ Back to Main README](README.md)**
