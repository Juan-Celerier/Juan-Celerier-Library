// apps/web/.storybook/main.cjs
const path = require("path");

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    autodocs: "tag",
  },

  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src/"),
        },
      },
    };
  },
};

module.exports = config;
