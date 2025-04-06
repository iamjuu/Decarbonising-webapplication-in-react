import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',       // Allows access from other devices in the network
    port: 5173,            // You can change if needed
    strictPort: true,      // Ensures port 5173 is always used (optional)
    cors: true             // Enable CORS (if needed for dev testing)
  }
});
