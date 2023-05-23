import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  id: 'uui-progress-bar',
  title: 'Displays/Progress Bar',
  component: 'uui-progress-bar',
  args: {
    progress: 25,
  },
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-progress-bar></uui-progress-bar>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-progress-bar progress="${props.progress}"></uui-progress-bar>`;
