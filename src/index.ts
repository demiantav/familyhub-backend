import app from './app.js';
import { env } from './core/config/env.js';

const startServer = () => {
  try {
    app.listen(env.PORT, () => {
      console.log(`🚀 Servidor de FamilyApp corriendo en: http://localhost:${env.PORT}`);
      console.log(`📡 Entorno: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
