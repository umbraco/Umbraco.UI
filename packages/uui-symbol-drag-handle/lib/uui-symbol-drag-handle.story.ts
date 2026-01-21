import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-symbol-drag-handle.element';
import type { UUISymbolDragHandleElement } from './uui-symbol-drag-handle.element';
import readme from '../README.md?raw';

const meta: Meta<UUISymbolDragHandleElement> = {
  id: 'uui-symbol-drag-handle',
  title: 'Symbols/Drag Handle',
  component: 'uui-symbol-drag-handle',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-symbol-drag-handle></uui-symbol-drag-handle>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUISymbolDragHandleElement>;

export const Overview: Story = {};
