const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://10.1.1.84:4200',
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
    pathRewrite: { '^/api': '' }
  },
];

module.exports = PROXY_CONFIG;
