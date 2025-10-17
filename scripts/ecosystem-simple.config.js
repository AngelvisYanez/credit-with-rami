module.exports = {
  apps: [{
    name: 'credit-with-rami-simple',
    script: 'server-simple.js',
    cwd: process.cwd(),
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '128M', // Reiniciar si usa más de 128MB
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000,
      DOMAIN: 'creditwithrami.com',
      NODE_OPTIONS: '--max-old-space-size=256 --max-semi-space-size=32'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
