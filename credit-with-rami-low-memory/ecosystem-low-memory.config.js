module.exports = {
  apps: [{
    name: 'credit-with-rami-low-memory',
    script: 'server-low-memory.js',
    cwd: process.cwd(),
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M', // Reiniciar si usa más de 512MB
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000,
      NODE_OPTIONS: '--max-old-space-size=1024 --max-semi-space-size=128'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
