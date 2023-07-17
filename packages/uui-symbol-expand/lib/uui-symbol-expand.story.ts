import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './uui-symbol-expand.element';
import type { UUISymbolExpandElement } from './uui-symbol-expand.element';
import readme from '../README.md?raw';

const meta: Meta<UUISymbolExpandElement> = {
  id: 'uui-symbol-expand',
  title: 'Symbols/Expand',
  component: 'uui-symbol-expand',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-symbol-expand></uui-symbol-expand>`,
      },
    },
  },
  args: {
    open: false,
  },
};

export default meta;
type Story = StoryObj<UUISymbolExpandElement>;

export const Overview: Story = {
  render: props =>
    html`<uui-symbol-expand
      ?open=${props.open}
      @click=${(e: MouseEvent) => {
        (e.target as any).open = !(e.target as any).open;
      }}>
    </uui-symbol-expand>`,
};
