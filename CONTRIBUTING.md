# Contributing to BlogForge 🚀

First off, thank you for considering contributing to BlogForge! It's people like you that make BlogForge such a great learning platform.

## 🌟 Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

## 🤔 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests 🔧

1. **Fork the repository** and create your branch from `main`
2. **Follow the setup instructions** in README.md
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Write clear commit messages** following our commit conventions
7. **Create a pull request** with a clear description

## 🏗️ Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database (or use Neon/Supabase)
- Git

### Setup Steps

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/blogforge.git
   cd blogforge
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Open Browser**
   Navigate to http://localhost:3000

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Avoid `any` types where possible
- Define interfaces for component props
- Use meaningful variable and function names

### React/Next.js

- Use functional components with hooks
- Keep components small and focused
- Use server components by default, client components when needed
- Follow the existing file structure

### Code Style

- Use Prettier for formatting (will be auto-formatted on commit)
- Use ESLint rules (fix with `npm run lint`)
- Use meaningful commit messages
- Add comments for complex logic

### File Naming

- Components: `PascalCase.tsx` (e.g., `BlogCard.tsx`)
- Utils/Actions: `kebab-case.ts` (e.g., `blog-actions.ts`)
- Pages: `kebab-case/page.tsx` following Next.js conventions

## 🌿 Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-comment-system`)
- `fix/` - Bug fixes (e.g., `fix/authentication-redirect`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/optimize-queries`)
- `test/` - Adding tests (e.g., `test/add-blog-tests`)

## 💬 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(blog): add markdown preview feature
fix(auth): resolve redirect loop on dashboard
docs(readme): update installation instructions
refactor(ui): optimize sidebar component performance
```

## 🧪 Testing

- Test your changes locally before submitting
- Ensure the app builds successfully (`npm run build`)
- Check for TypeScript errors
- Test in both light and dark modes
- Test responsive design on mobile devices

## 📚 Project Structure

```
blogforge/
├── actions/          # Server actions
├── app/              # Next.js app directory
│   ├── (auth)/      # Authentication pages
│   ├── (main)/      # Main application pages
│   └── api/         # API routes
├── components/       # React components
│   └── ui/          # UI components
├── lib/             # Utility functions
├── prisma/          # Database schema
└── public/          # Static assets
```

## 🎯 Good First Issues

Look for issues labeled `good first issue` - these are great starting points for new contributors!

## 🆘 Getting Help

- **Discord/Slack**: [Join our community](#) (if you have one)
- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Check existing issues or create a new one

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in our README.md and release notes!

---

**Happy Contributing! 🎉**

Remember, the best way to learn is by doing. Don't be afraid to ask questions or make mistakes - that's how we all grow!
