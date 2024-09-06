import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-symbol-expand',
  component: 'uui-symbol-expand',
  title: 'Symbols/Expand',
  render: args =>
    html`<uui-symbol-expand
      ${spread(args)}
      @click=${(e: MouseEvent) => {
        (e.target as any).open = !(e.target as any).open;
      }}></uui-symbol-expand>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
