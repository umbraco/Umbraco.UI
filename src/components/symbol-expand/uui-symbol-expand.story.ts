import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';
import { UUISymbolExpandElement } from './uui-symbol-expand.element.js';
import '../button/index.js';

const meta: Meta<UUISymbolExpandElement> = {
  id: 'uui-symbol-expand',
  component: 'uui-symbol-expand',
  title: 'Symbols/Expand',
  render: args =>
    html`<uui-symbol-expand
      ${spread(args)}
      @click=${(e: MouseEvent) => {
        (e.target as any).open = !(e.target as any).open;
      }}></uui-symbol-expand>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Open: Story = {
  args: { open: true },
};

export const WithButton: Story = {
  render: args =>
    html`<uui-button look="primary">
      Toggle
      <uui-symbol-expand ${spread(args)}></uui-symbol-expand>
    </uui-button>`,
};
