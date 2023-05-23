import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  id: 'uui-caret',
  title: 'Symbols/Caret',
  component: 'uui-caret',
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-caret></uui-caret>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html` <uui-caret .open=${props.open}></uui-caret>`;
