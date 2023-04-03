const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": "http://localhost:8080/",
    experimentalStudio: true,
    viewportWidth: 1500,
    viewportHeight: 900,
    defaultCommandTimeout: 100000,
  },
});
