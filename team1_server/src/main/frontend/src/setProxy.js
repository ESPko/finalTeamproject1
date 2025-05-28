// src/main/front/src/setProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://3.39.53.78:8080',	// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};