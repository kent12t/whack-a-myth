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
    open: true
  },
  publicDir: 'public'
} 