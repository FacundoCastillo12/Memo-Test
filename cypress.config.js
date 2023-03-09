const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dg78jr',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
