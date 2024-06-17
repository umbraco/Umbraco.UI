import type { Meta, StoryObj } from '@storybook/web-components';
import type { UUIColorSwatchElement } from './uui-color-swatch.element';
import readme from '../README.md?raw';

import './uui-color-swatch.element';

const meta: Meta<UUIColorSwatchElement> = {
  id: 'uui-color-swatch',
  title: 'Inputs/Color/Color Swatch',
  component: 'uui-color-swatch',
  args: {
    value: '#d0021b',
  },
  argTypes: {
    value: { control: 'color' },
    color: { control: 'color' },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;

type Story = StoryObj<UUIColorSwatchElement>;

export const Overview: Story = {};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch selectable></uui-color-swatch>`,
      },
    },
  },
};

export const InvalidValue: Story = {
  args: {
    value: 'askjhsdiusyhdiudhg',
    label: 'Invalid color',
    showLabel: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    selectable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch disabled></uui-color-swatch>`,
      },
    },
  },
};

export const DisabledSelected: Story = {
  args: {
    disabled: true,
    selectable: true,
    selected: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch disabled selectable selected></uui-color-swatch>`,
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: "This is the most beautiful color I've ever seen",
    showLabel: true,
    selectable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch label="This is the most beautiful color I've ever seen" show-label="true"></uui-color-swatch>`,
      },
    },
  },
};

export const DifferentColorThanValue: Story = {
  args: {
    value: 'color1',
    color: 'green',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch value="color1" color="green"></uui-color-swatch>`,
      },
    },
  },
};

export const Transparent: Story = {
  args: {
    color: 'rgba(53, 68, 177, 0.5)',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatch color="rgba(53, 68, 177, 0.5)"></uui-color-swatch>`,
      },
    },
  },
};
