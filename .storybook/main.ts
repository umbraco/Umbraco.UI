import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'node:url';

const config: StorybookConfig & {
  managerEntries?: (entry?: string[]) => string[];
} = {
  stories: [
    '../packages/**/*.mdx',
    '../packages/**/*.story.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.story.@(js|jsx|mjs|ts|tsx)',
  ],

  staticDirs: ['./images'],

  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],

  managerEntries(entry = []) {
    return [
      ...entry,
      fileURLToPath(
        import.meta.resolve('../storyhelpers/storybook-readme/manager.ts'),
      ),
    ];
  },

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  viteFinal: async config => {
    config.plugins?.unshift({
      name: 'css-default-import',
      enforce: 'pre',
      resolveId(source, importer) {
        // rollup-plugin-import-css returns CSS as a default string export,
        // but Vite treats CSS imports as side effects. Adding ?inline makes
        // Vite return the CSS as a string, matching the rollup behavior.
        if (source.endsWith('.css') && importer?.endsWith('.styles.ts')) {
          const resolved = new URL(source, 'file://' + importer).pathname;
          return resolved + '?inline';
        }
      },
    });
    return config;
  },

  docs: {},
};
export default config;
