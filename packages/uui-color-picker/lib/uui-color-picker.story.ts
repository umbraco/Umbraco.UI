import '@umbraco-ui/uui-button-group/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-color-area/lib';
import '@umbraco-ui/uui-color-slider/lib';
import '@umbraco-ui/uui-color-swatch/lib';
import '@umbraco-ui/uui-color-swatches/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-popover-container/lib';

import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import type { UUIColorPickerElement } from './uui-color-picker.element';
import './uui-color-picker.element';
import readme from '../README.md?raw';
import { html } from 'lit';

const defaultSwatches = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#7ed321',
  '#417505',
  '#bd10e0',
  '#9013fe',
  '#4a90e2',
  '#50e3c2',
  '#b8e986',
  '#000',
  '#444',
  '#888',
  '#ccc',
  '#fff',
];

const formats = ['hex', 'rgb', 'hsl', 'hsv'];
const sizes = ['small', 'medium', 'large'];

const meta: Meta<UUIColorPickerElement> = {
  id: 'uui-color-picker',
  title: 'Inputs/Color/Color Picker',
  component: 'uui-color-picker',
  args: {
    inline: false,
    swatches: defaultSwatches,
    format: 'hex',
    size: 'medium',
    value: '#000000',
  },
  argTypes: {
    format: {
      options: formats,
      control: { type: 'select' },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    value: {
      control: { type: 'color' },
    },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
    actions: {
      handles: ['change'],
    },
  },
  decorators: [withActions as any],
};

export default meta;

type Story = StoryObj<UUIColorPickerElement>;

export const Overview: Story = {};

export const UndefinedValue: Story = {
  args: {
    value: undefined,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-picker></uui-color-picker>`,
      },
    },
  },
};

export const Inline: Story = {
  args: {
    inline: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-picker inline></uui-color-picker>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    inline: true,
    opacity: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-picker inline disabled opacity></uui-color-picker>`,
      },
    },
  },
};

export const WithOpacity: Story = {
  args: {
    opacity: true,
    value: 'rgba(0, 0, 0, 0.5)',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-color-picker opacity></uui-color-picker>`,
      },
    },
  },
};

export const Formats: Story = {
  args: {
    format: 'hex',
    value: 'blue',
  },
  decorators: [
    (story, props) =>
      html`<div style="display: flex; flex-direction: column;">
        <h5>${props.args.format}</h5>
        ${story()}
      </div> `,
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <uui-color-picker format="hex"></uui-color-picker>`,
      },
    },
  },
};
