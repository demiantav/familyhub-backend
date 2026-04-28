# 🗺 FamilyApp: Architectural Flows & Logic Maps

Este documento detalla el flujo de datos y la jerarquía de permisos de la aplicación. Sirve como mapa para entender cómo interactúan las piezas del **Screaming Architecture**.

---

## 🔐 1. Authentication & Family Setup

### 1.1 Admin Registration (The "Big Bang")
Cuando un padre/madre crea la cuenta inicial.

```mermaid
graph TD
    A[Client: Register Admin] -->|POST /api/auth/register| B(auth.controller)
    B -->|Validate Zod| C{Valid?}
    C -->|No| D[400 Error]
    C -->|Yes| E(auth.service: registerAdmin)
    E -->|Transaction Start| F[Create Family + accessCode]
    F --> G[Create Member: ROLE_ADMIN]
    G -->|Transaction End| H[Generate JWT]
    H --> I[Response: {admin, family, token}]
```

### 1.2 Member Discovery & Login (The Child's Path)
Los niños no usan email; usan el código de la casa y su PIN.

**Fase A: Descubrimiento (Pública)**
1. **Endpoint:** `GET /api/auth/family/:accessCode`
2. **Acción:** El sistema busca la familia y devuelve `[{ id, name, avatarKey }]`.
3. **UX:** El niño busca su avatar en la lista y lo selecciona.

**Fase B: Autenticación**
1. **Endpoint:** `POST /api/auth/login/member`
2. **Body:** `{ accessCode, name, pin }`
3. **Acción:** El service verifica el `pinHash` contra el PIN enviado.
4. **Resultado:** JWT con `role: 'CHILD'`.

---

## 🛡 2. Middleware Hierarchy (Security Layers)

Las rutas se protegen en capas para asegurar que solo los usuarios autorizados realicen acciones críticas.

| Ruta | Middleware | Propósito |
| :--- | :--- | :--- |
| `/auth/register` | Ninguno | Público: Creación de cuenta nueva. |
| `/auth/family/:code`| Ninguno | Público: Listar avatares de la familia. |
| `/tasks/my-tasks` | `authMiddleware` | Privado: Cualquier miembro logueado. |
| `/auth/member/reg` | `authMiddleware` + `isAdmin` | Restringido: Solo el Admin crea miembros. |

---

## 🎮 3. Core Loop: Progress & Rewards

Flujo de valor desde que se crea una tarea hasta que impacta en la historia.

1. **Creación:** Admin crea `Task` asignada a un Miembro.
2. **Acción:** Miembro marca `Task` como completada (`status: PENDING` -> `COMPLETED`).
3. **Validación:** Admin aprueba la tarea (`status: APPROVED`).
4. **Impacto:**
   - **Personal:** El Miembro recibe `coins` y `xp`.
   - **Familiar:** La `Family` recibe `collectiveXp`.
5. **Progreso:** Si `Family.collectiveXp` alcanza el umbral, se desbloquea un nuevo `Episode` de la historia.

---

## 📁 4. Screaming Architecture Map

```text
src/
 ├── core/          # El "cerebro": Config, Envs, Tipos Globales.
 ├── shared/        # Lo común: Prisma Client, Middlewares de Seguridad.
 └── features/      # El "corazón" (Dominio):
      ├── auth/     # Quién eres y qué familia eres.
      ├── families/ # Gestión de miembros y ajustes de casa.
      ├── tasks/    # El motor de XP y Coins.
      └── story/    # La recompensa narrativa (Episodios).
```
