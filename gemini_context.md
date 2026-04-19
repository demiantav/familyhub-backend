📑 FamilyApp: Master Blueprint & Getting Started

1. Resumen General del Proyecto
   FamilyApp es una plataforma de gamificación familiar diseñada para convertir las tareas del hogar en un RPG narrativo.

El "Core Loop" (Bucle de Juego):

1.  Admin crea una familia y asigna tareas.
2.  Miembros completan tareas y ganan XP (para la familia) y Coins (personales).
3.  El XP Colectivo desbloquea capítulos de una historia (Modo Historia).
4.  Los Coins se canjean por Recompensas reales definidas por el Admin.

Arquitectura Técnica:

- Backend: Node + Express con Screaming Architecture (organizado por Features: auth, tasks, story, shop).
- Base de Datos: PostgreSQL gestionado por Prisma ORM.
- Frontend: Expo (React Native) con animaciones de alto rendimiento.
- Seguridad: Autenticación dual (Email/Pass para Admins, PIN para Niños) vía JWT.

---

2. Qué debes investigar (Learning Path)
   Dado que estás integrando varias tecnologías nuevas, aquí están los conceptos clave por nivel de prioridad:

A. Prisma ORM (Prioridad: Alta)

- Conceptos: schema.prisma, Migraciones (npx prisma migrate dev), y el PrismaClient.
- Tip: Entiende cómo Prisma genera tipos de TypeScript automáticamente basándose en tu esquema. Te ahorrará horas de interfaces manuales.

B. Zod (Prioridad: Alta)

- Conceptos: Esquemas de validación de datos.
- Uso: Lo usaremos para validar que lo que llega al API sea exactamente lo que esperamos antes de que toque la base de datos.

C. Supabase (Prioridad: Media)

- Conceptos: Gestión de PostgreSQL en la nube y Connection Pooling.
- Diferencia: Aprende la diferencia entre conectar directamente a la DB y usar un "Transaction Pooler" (necesario en entornos serverless o de alta
  concurrencia).

D. Expo Router & Reanimated (Prioridad: Media)

- Conceptos: Navegación basada en archivos (Expo Router) y el hilo de UI de Reanimated.
- Tip: Investiga la librería Moti (es un wrapper de Reanimated que hace las animaciones mucho más sencillas y declarativas).

---

3. Checklist de Instalación (Setup)

Prepara tu entorno de desarrollo con los siguientes paquetes core.

Global / Herramientas de Sistema

- [ ] Node.js (v18+ recomendado).
- [ ] PNPM (npm install -g pnpm) - Es más rápido y eficiente que npm/yarn para monorepos o proyectos con muchas dependencias.
- [ ] Prisma VSCode Extension (Fundamental para el resaltado de sintaxis).

Backend (Dependencias Core)
Ejecuta esto en tu carpeta de backend:

1 pnpm install express prisma @prisma/client zod argon2 jsonwebtoken cors dotenv
2 pnpm install -D typescript @types/node @types/express @types/jsonwebtoken @types/cors ts-node-dev

- argon2: Para el hashing seguro de passwords y PINs.
- ts-node-dev: Para reiniciar el servidor automáticamente al cambiar código TS.

Frontend (Expo / UI)
Ejecuta esto en tu carpeta de frontend (usando npx expo install para asegurar compatibilidad):

1 npx expo install expo-router react-native-safe-area-context react-native-screens react-native-reanimated react-native-gesture-handler lucide-react-native
zustand

- zustand: Para el manejo de estado global (mucho más ligero y simple que Redux).
- lucide-react-native: Set de iconos consistentes y ligeros.

---

4. Próximos Pasos Técnicos

1. Backend: Crear la estructura de carpetas src/features/auth, src/features/families, etc.
1. Frontend: Configurar el Layout básico con Expo Router (Tabs para la app, Stack para el Login).
