module.exports = {
    apps : [
        {
          name: "Binboard",
          script: "src/index.js",
          watch: false,
          env_production: {
              "PORT": 8081,
              "NODE_ENV": "production",
          }
        }
    ]
  }
