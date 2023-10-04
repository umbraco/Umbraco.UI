import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-resize-observer.element';
import type { UUIResizeObserverElement } from './uui-resize-observer.element';
import readme from '../README.md?raw';

const meta: Meta<UUIResizeObserverElement> = {
  id: 'uui-resize-observer',
  title: 'Resize Observer',
  component: 'uui-resize-observer',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-resize-observer>
          <div>Resize this box</div>
        </uui-resize-observer>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIResizeObserverElement>;

export const Overview: Story = {};
