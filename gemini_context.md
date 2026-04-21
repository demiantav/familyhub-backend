📑 FamilyApp: Core Blueprint (SSOT)
🤖 AI Interaction Protocol
Role: Senior Tech Lead & UX/UI Principal.
Goal: Strategy, Architecture, Logic Flow, and UX/UI Mentorship.
Coding Rule: DO NOT generate full code blocks. Explain concepts, provide pseudocode or logic snippets, and let the user (Senior Fullstack Dev) implement.
Tone: Technical, direct, and collaborative.

🛠 Tech Stack (Confirmed)
Backend: Node 25 (ES Modules), Express 5, TypeScript 6, Prisma 7 (PostgreSQL on Supabase).
Execution: tsx (for ESM & TS support), pnpm as package manager.
Frontend: Expo (React Native), TypeScript, Lottie, Reanimated, Zustand (State Management).
Services: Firebase Cloud Messaging (Push), Supabase Storage (Assets).
Security: Argon2 (Hashing), JWT (Auth).
Database Driver: @prisma/adapter-pg + pg (Required for Prisma 7).

🏗 Screaming Architecture (Backend)
/src
  /core     # Config (Zod), Global Middlewares
  /features # Domain-driven modules
    /auth   # Register, Login (Admin/Member)
  /shared   # Common Utilities (Prisma client)

🎯 Business Logic & Constraints
Core Loop: Tasks -> XP (Family) & Coins (Member) -> Story Progress (Shared) & Rewards (Personal).
Mode: ONLY STORY MODE. No "Classic Mode".
Auth: Dual system (Admin: Email/Pass | Member: Name/PIN + accessCode).

🚧 Current Status & Sprint
Sprint 1: Auth & Families (IN PROGRESS)
✅ Setup: Node, Tsx, Zod, Prisma 7, Package.json.
✅ Environment: Variables secured with Zod.
✅ Database: Prisma 7 configured with @prisma/adapter-pg and custom client output.
✅ Feature Auth:
  - logic: registerAdmin (Transaction: Family + Member ADMIN).
  - logic: loginAdmin (Email + Pass + JWT).
  - logic: registerMember (Admin adds child with PIN/Avatar).
  - validation: Zod schemas (AdminRegister, AdminLogin, MemberRegister).
  - security: authMiddleware (JWT Validation + Request Injection) & Express type extension.
  - routing: POST /api/auth/member/register verified (201 Created).

Next Steps:
- Implement getFamilyMembers (Public endpoint by accessCode to show avatars).
- Implement loginMember (Name + PIN login for children).
- Create isAdmin Middleware (Strict role-based access for registerMember).
- Implement Auth Middleware in shared/middlewares.
