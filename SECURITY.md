# Security Policy

## 🔒 Reporting a Vulnerability

We take the security of BlogForge seriously. If you discover a security vulnerability, please help us protect our users by reporting it responsibly.

### How to Report

**Please DO NOT create a public GitHub issue for security vulnerabilities.**

Instead, please report security vulnerabilities by:

1. **Email:** Send details to [your-email@example.com]
2. **Subject Line:** Use "SECURITY: [Brief Description]"
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment:** We'll acknowledge your report within 48 hours
- **Updates:** We'll keep you informed about our progress
- **Credit:** With your permission, we'll credit you in our security advisories
- **Timeline:** We aim to patch critical vulnerabilities within 7 days

### Scope

The following are in scope for vulnerability reports:

- ✅ Authentication bypass
- ✅ SQL injection
- ✅ Cross-site scripting (XSS)
- ✅ Cross-site request forgery (CSRF)
- ✅ Server-side request forgery (SSRF)
- ✅ Remote code execution
- ✅ Privilege escalation
- ✅ Data exposure
- ✅ Session hijacking

### Out of Scope

The following are NOT considered security vulnerabilities:

- ❌ Missing security headers (unless exploitable)
- ❌ Self-XSS
- ❌ Social engineering attacks
- ❌ Denial of service (DoS/DDoS)
- ❌ Issues in outdated browsers
- ❌ Clickjacking on pages without sensitive actions

## 🛡️ Security Measures

### Authentication
- Secure password hashing with bcrypt (10+ rounds)
- JWT-based session management
- OAuth 2.0 integration (Google)
- Email verification required
- Password reset with secure tokens

### Database
- Parameterized queries (Prisma ORM)
- Connection pooling
- Environment-based credentials
- Regular backups (recommended)

### API Security
- CSRF protection
- Rate limiting (recommended for production)
- Input validation with Zod
- Secure headers

### Data Protection
- Environment variables for secrets
- No sensitive data in client-side code
- Secure cookie settings
- HTTPS enforced (production)

### Dependencies
- Regular dependency updates
- Automated security scanning
- Minimal dependency footprint

## 🔍 Security Best Practices for Contributors

### When Contributing Code

1. **Never commit secrets:**
   - No API keys, passwords, or tokens
   - Use environment variables
   - Check `.env.example` for guidance

2. **Validate all inputs:**
   - Use Zod schemas
   - Sanitize user input
   - Validate on both client and server

3. **Follow authentication patterns:**
   - Use provided auth helpers
   - Don't roll your own crypto
   - Check permissions properly

4. **Review dependencies:**
   - Check for known vulnerabilities
   - Use `npm audit`
   - Keep packages updated

### Code Review Checklist

- [ ] No secrets in code
- [ ] Input validation present
- [ ] Authentication/authorization checked
- [ ] SQL injection prevented (using Prisma)
- [ ] XSS prevented (React escapes by default)
- [ ] CSRF tokens used for state-changing operations
- [ ] Error messages don't leak sensitive info
- [ ] File uploads validated and restricted

## 🚨 Known Security Considerations

### Development Environment
- `.env` files are gitignored
- Development server is not production-ready
- Use HTTPS in production

### Database
- Use strong passwords
- Restrict database access
- Enable SSL for database connections
- Regular backups recommended

### Email
- Resend API key must be kept secret
- Rate limit email sending
- Verify sender domain

### File Uploads
- Cloudinary handles file validation
- Size limits enforced
- File types restricted
- No executable uploads

## 📚 Security Resources

### For Developers
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/authentication)
- [Prisma Security](https://www.prisma.io/docs/guides/security)
- [NextAuth.js Security](https://next-auth.js.org/configuration/options#security)

### Security Tools
- `npm audit` - Check for vulnerabilities
- ESLint security plugins
- Dependabot - Automated dependency updates
- Snyk - Continuous security scanning

## ✅ Security Checklist for Deployment

Before deploying to production:

- [ ] All environment variables set securely
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Database has strong password
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] Error logging set up (without sensitive data)
- [ ] Regular backups configured
- [ ] Monitoring and alerting in place

## 📞 Contact

For security concerns, contact:
- **Email:** [your-email@example.com]
- **GitHub:** [@jha-niraj](https://github.com/jha-niraj)

## 🙏 Responsible Disclosure

We appreciate security researchers who:
- Give us reasonable time to fix issues
- Don't exploit vulnerabilities
- Don't access user data unnecessarily
- Report in good faith

Thank you for helping keep BlogForge and our users safe! 🔐

---

**[⬆ Back to README](README.md)**
