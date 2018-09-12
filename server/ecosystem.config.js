module.exports = {
    apps : [
        {
          name: "Binboard API",
          script: "src/index.js",
          watch: true,
          env_production: {
              "PORT": 8081,
              "NODE_ENV": "production",
          }
        }
    ]
  }