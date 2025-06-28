import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-symbol-drag.element';
import type { UUIDragHandleElement } from './uui-symbol-drag.element';
import readme from '../README.md?raw';

const meta: Meta<UUIDragHandleElement> = {
  id: 'uui-symbol-drag',
  title: 'Symbols/Drag Handle',
  component: 'uui-symbol-drag',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-symbol-drag></uui-symbol-drag>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIDragHandleElement>;

export const Overview: Story = {};
