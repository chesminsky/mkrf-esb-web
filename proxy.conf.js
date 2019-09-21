const PROXY_CONFIG = {
  "/esb/*": {
    "target": "https://esb.mkrf.ru/",
    "secure": false,
    "changeOrigin": true,
    "onProxyReq": function (proxyReq, req) {
      if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
      }
    },
  }
}

module.exports = PROXY_CONFIG;