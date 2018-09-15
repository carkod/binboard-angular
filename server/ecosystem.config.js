module.exports = {
    apps : [
        {
          name: "Binboard",
          script: "npm run dev",
          watch: true,
          env_production: {
              "PORT": 8081,
              "NODE_ENV": "production",
          }
        }
    ]
  }
