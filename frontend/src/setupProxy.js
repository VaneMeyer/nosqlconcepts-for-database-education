const proxy = require('http-proxy-middleware');
const fs = require('fs');

const protocol = JSON.parse(process.env.HTTPS) ? "https:" : "http:";
const host = process.env.REACT_APP_PROXY_HOST
const port = process.env.REACT_APP_PROXY_PORT

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: {
        protocol: protocol,
        host: host,
        port: port,
        //pfx: fs.readFileSync('src/root-cert.pem')
      },
      changeOrigin: true,
    })
  );
};
