const { defineConfig } = require('@vue/cli-service')
const {resolve} = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: resolve(__dirname, '../public')
})
