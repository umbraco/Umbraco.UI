import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-input-color.element';
import type { UUIInputColorElement } from './uui-input-color.element';
import readme from '../README.md?raw';

const meta: Meta<UUIInputColorElement> = {
  id: 'uui-input-color',
  title: 'Inputs/Input Color',
  component: 'uui-input-color',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-input-color></uui-input-color>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIInputColorElement>;

export const Overview: Story = {};

export const Empty: Story = {
  args: {
    value: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};
