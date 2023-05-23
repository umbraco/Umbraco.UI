import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  id: 'uui-symbol-more',
  title: 'Symbols/More',
  component: 'uui-symbol-more',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-symbol-more></uui-symbol-more>`,
      },
    },
  },
};

export const Overview: Story = () => html` <uui-symbol-more></uui-symbol-more>`;
