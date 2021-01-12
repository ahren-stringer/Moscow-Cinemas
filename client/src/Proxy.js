import proxy from "http-proxy-middleware"

module.exports = function(app) {
  app.use(proxy("/**", { // https://github.com/chimurai/http-proxy-middleware
    target: "http://localhost:8001",
    secure: false
  }));
};