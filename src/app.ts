import express from 'express';
import cors from 'cors';
import authRouter from './features/auth/auth.routes.js';

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

// Ruta de salud para verificar que el servidor está vivo
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// TODO: Registrar rutas de las features acá
// app.use('/api/auth', authRoutes);
// app.use('/api/families', familyRoutes);

export default app;
