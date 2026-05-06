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

🌳 Git Strategy: Gitflow
- main: Production-ready code.
- develop: Integration branch for features.
- feature/sprintX-name: Feature-specific branches.
- Workflow: feature -> develop -> main.

🎯 Business Logic & Constraints
Core Loop: Tasks -> XP (Family) & Coins (Member) -> Story Progress (Shared) & Rewards (Personal).
Mode: ONLY STORY MODE. No "Classic Mode".
Auth: Dual system (Admin: Email/Pass | Member: Name/PIN + accessCode).

🚧 Current Status & Sprint
Sprint 1: Auth & Families (✅ COMPLETED)
✅ Setup: Node, Tsx, Zod, Prisma 7, Package.json.
✅ Database: Prisma 7 + PostgreSQL + custom client output.
✅ Feature Auth:
  - registerAdmin & loginAdmin (Email/Pass).
  - registerMember (Admin adds child with PIN).
  - getFamilyMembers (Public endpoint by accessCode).
  - loginMember (PIN login for children/members).
✅ Security: authMiddleware & isAdminMiddleware implemented and verified.
✅ Git: Feature branch merged into develop.

Sprint 2: Tasks & Gamification Loop (IN PROGRESS)
Goals:
- Implement Task Creation (Admin only).
- Implement Task Listing (Filtered by member/family).
- Implement Task Completion Logic (XP & Coins rewards).
- Setup Story Episode Unlock Check.

✅ Task Schema (Zod) defined in task.schema.ts.

Next Steps:
- Implement `taskService.createTask` (Include validation for `assignedToId` family integrity).
- Implement `taskController.createTask` & `taskRoutes.ts`.
- Implement `getTasks` service & controller (Member/Family filtering).
- Implement Task Completion Logic (Update Status -> XP/Coins Reward -> Family XP).
