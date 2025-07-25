import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@/components/lib/utils": path.resolve(__dirname, "./src/utils/tailwind.ts")
    }
  }
});
