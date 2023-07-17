import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import type { UUIColorAreaElement } from './uui-color-area.element';
import readme from '../README.md?raw';

import './uui-color-area.element';

const meta: Meta<UUIColorAreaElement> = {
  id: 'uui-color-area',
  title: 'Inputs/Color/Color Area',
  component: 'uui-color-area',
  argTypes: {
    value: { control: 'color' },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-color-area></uui-color-area>`,
      },
    },
    actions: {
      handles: ['change'],
    },
  },
  decorators: [withActions as any],
};

export default meta;

type Story = StoryObj<UUIColorAreaElement>;

export const Overview: Story = {};
