export default {
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    },
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/append-csv': 'http://localhost:3001',
      '/health': 'http://localhost:3001'
    }
  },
  preview: {
    port: 3000,
    proxy: {
      '/append-csv': 'http://localhost:3001',
      '/health': 'http://localhost:3001'
    }
  },
  publicDir: 'public'
} 