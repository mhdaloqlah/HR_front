import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-polyfills';
import optimizedDeps from 'vite-plugin-optimized-deps';

export default defineConfig({
  plugins: [
    nodePolyfills({
      protocolImports: true,
    }),
    optimizedDeps({
      exclude: ['fs'], // Exclude fs from being bundled
    })
  ],
  resolve: {
    alias: {
      fs: false, // Ignore fs explicitly
    }
  }
});
