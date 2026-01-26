import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    '../src/**/**/*.stories.(ts|tsx|mdx)',   // deeper in src subfolders
    '../**/src/**/*.stories.(ts|tsx|mdx)',   // other feature packages with src/...
    '../**/*.stories.(ts|tsx|mdx)' 
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    console.log(config)
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias
        }
      }
    }
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
export default config;