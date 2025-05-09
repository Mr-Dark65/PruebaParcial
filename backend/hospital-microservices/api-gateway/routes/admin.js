const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

const adminServiceProxy = createProxyMiddleware({
  target: 'http://admin-service:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/admin': '/api'
  }
});

router.use('/', adminServiceProxy);

module.exports = router;