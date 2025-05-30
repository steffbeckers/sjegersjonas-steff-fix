const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:44353';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/relations",
      "/api/products",
      "/api/value-added-tax-rates",
      "/api/product-categories",
      "/api/product-units",
    ],
    target: target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
