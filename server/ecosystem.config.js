module.exports = {
    apps : [
        {
          name: "Binboard API server",
          script: "index.js",
          watch: true,
          env_production: {
              "PORT": 8081,
              "NODE_ENV": "production",
          }
        }
    ]
  }