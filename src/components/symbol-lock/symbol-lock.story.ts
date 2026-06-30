import './symbol-lock.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-symbol-lock',
  component: 'uui-symbol-lock',
  title: 'Symbols/Lock',
  render: args =>
    html`<uui-symbol-lock
      ${spread(args)}
      @click=${(e: MouseEvent) => {
        (e.target as any).open = !(e.target as any).open;
      }}></uui-symbol-lock>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
