module.exports = {
    apps : [
        {
          name: "Binboard",
          script: "cross-env NODE_ENV=production nodemon -i \"*.test.js\" -r dotenv-safe/config .",
          watch: false,
          env_production: {
              "PORT": 8081,
              "NODE_ENV": "production",
          }
        }
    ]
  }
