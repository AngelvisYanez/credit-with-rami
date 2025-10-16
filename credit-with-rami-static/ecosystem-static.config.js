module.exports = {
  apps: [{
    name: 'credit-with-rami-static',
    script: 'server-static.js',
    cwd: process.cwd(),
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M', // Reiniciar si usa más de 256MB
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000,
      NODE_OPTIONS: '--max-old-space-size=512 --max-semi-space-size=64'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
