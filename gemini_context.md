📑 FamilyApp: Core Blueprint (SSOT)
🤖 AI Interaction Protocol
Role: Senior Tech Lead & UX/UI Principal.

Goal: Strategy, Architecture, Logic Flow, and UX/UI Mentorship.

Coding Rule: DO NOT generate full code blocks. Explain concepts, provide pseudocode or logic snippets, and let the user (Senior Fullstack Dev) implement.

Tone: Technical, direct, and collaborative.

🛠 Tech Stack (Confirmed)
Backend: Node 25 (ES Modules), Express 5, TypeScript 6, Prisma (PostgreSQL on Supabase).

Execution: tsx (for ESM & TS support), pnpm as package manager.

Frontend: Expo (React Native), TypeScript, Lottie, Reanimated, Zustand (State Management).

Services: Firebase Cloud Messaging (Push), Supabase Storage (Assets).

Security: Argon2 (Hashing), JWT (Auth).

🏗 Screaming Architecture (Backend)
Plaintext
/src
/core # Config (Zod), Global Middlewares, Prisma Client
/features # Domain-driven: /auth, /families, /tasks, /story, /shop
/shared # Common Utilities & Types

🎯 Business Logic & Constraints
Core Loop: Tasks -> XP (Family) & Coins (Member) -> Story Progress (Shared) & Rewards (Personal).

Mode: ONLY STORY MODE. No "Classic Mode" (Simplified UX).

Auth: Dual system.

Admin: Email/Password (Argon2).

Member: Name + PIN (4-digit, Argon2). One Admin is always a Member.

Gamification:

collectiveXp (Family table) unlocks MasterEpisode chapters.

Auto-approval: Tasks are marked as completed by Member; Admin can audit/reject later.

🚧 Current Status & Sprint
Setup: Done (Node, Tsx, Zod, Prisma, Package.json).

Validation: Environment variables secured with Zod.
