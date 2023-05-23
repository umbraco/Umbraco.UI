import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  id: 'uui-symbol-lock',
  title: 'Symbols/Lock',
  component: 'uui-symbol-lock',
  parameters: {
    docs: {
      source: {
        code: `<uui-symbol-lock></uui-symbol-lock>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`
    <uui-symbol-lock
      ?open=${props.open}
      @click=${(e: MouseEvent) => {
        (e.target as any).open = !(e.target as any).open;
      }}></uui-symbol-lock>
  `;
Overview.parameters = {
  docs: {
    source: {
      type: 'dynamic',
    },
  },
};
