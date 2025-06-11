import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-drag-handle.element';
import type { UUIDragHandleElement } from './uui-drag-handle.element';
import readme from '../README.md?raw';

const meta: Meta<UUIDragHandleElement> = {
  id: 'uui-drag-handle',
  title: 'Symbols/Drag Handle',
  component: 'uui-drag-handle',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-drag-handle></uui-drag-handle>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIDragHandleElement>;

export const Overview: Story = {};
