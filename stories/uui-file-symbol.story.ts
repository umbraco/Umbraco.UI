import { html } from 'lit-html';
import '@umbraco-ui/uui-file-symbol/lib/index';
import { Story } from '@storybook/web-components';
export default {
  title: 'Symbols/File Symbol',
  component: 'uui-file-symbol',
};

export const Overview: Story = props =>
  html`<div style="width: 240px">
    <uui-file-symbol .type=${props.type}></uui-file-symbol>
  </div>`;

Overview.parameters = {
  docs: {
    source: {
      code: '<uui-file-symbol type="pdf"></uui-file-symbol>',
    },
  },
};
Overview.args = { type: 'pdf' };
