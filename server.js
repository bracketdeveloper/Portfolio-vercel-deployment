import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
import app from './src/app.js';
import { connectDatabase } from './src/config/database.js';
import { env } from './src/config/env.js';

let serverStarted = false;

const startServer = async () => {
  try {
    // Only start once
    if (serverStarted) return;
    
    await connectDatabase();
    serverStarted = true;

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// For local development
if (env.NODE_ENV !== 'test' && typeof global.serverStarted === 'undefined') {
  startServer();
}

export default app;
