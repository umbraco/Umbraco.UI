import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Symbols/File',
  component: 'uui-symbol-file',
  id: 'uui-symbol-file',
  parameters: {
    readme: { markdown: readme },
  },
};

export const Overview: Story = props =>
  html`<div style="width: 240px">
    <uui-symbol-file .type=${props.type}></uui-symbol-file>
  </div>`;

Overview.parameters = {
  docs: {
    source: {
      code: '<uui-symbol-file type="pdf"></uui-symbol-file>',
    },
  },
};
Overview.args = { type: 'pdf' };
