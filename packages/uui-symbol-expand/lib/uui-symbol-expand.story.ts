import '../define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-symbol-expand',
  title: 'Symbols/Expand',
  component: 'uui-symbol-expand',
  parameters: {
    docs: {
      source: {
        code: `<uui-symbol-expand></uui-symbol-expand>`,
      },
    },
  },
  args: {
    open: false,
  },
  argTypes: {
    value: {
      open: { type: 'boolean' },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-symbol-expand
    ?open=${props.open}
    @click=${(e: MouseEvent) => {
      (e.target as any).open = !(e.target as any).open;
    }}>
  </uui-symbol-expand>`;
