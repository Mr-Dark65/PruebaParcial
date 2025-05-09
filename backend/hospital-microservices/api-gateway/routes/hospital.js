const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

const hospitalServiceProxy = createProxyMiddleware({
  target: 'http://hospital-service:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/hospital': '/api'
  }
});

router.use('/', hospitalServiceProxy);

module.exports = router;