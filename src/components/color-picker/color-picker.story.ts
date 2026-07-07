import './color-picker.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';
import { useState } from 'storybook/preview-api';

import '../button-group/button-group.js';
import '../button/button.js';
import '../color-area/color-area.js';
import '../color-slider/color-slider.js';
import '../color-swatch/color-swatch.js';
import '../color-swatches/color-swatches.js';
import '../icon/icon.js';
import '../input/input.js';
import '../popover-container/popover-container.js';
import type { UUIColorPickerElement } from './color-picker.element.js';

const formats = ['hex', 'rgb', 'hsl', 'hsv'];
const sizes = ['small', 'medium', 'large'];

const swatchesTransparent = [
  'rgba(208, 2, 27, 0.5)',
  'rgba(245, 166, 35, 0.5)',
  'rgba(248, 231, 28, 0.5)',
  'rgba(139, 87, 42, 0.5)',
  'rgba(126, 211, 33, 0.5)',
  'rgba(65, 117, 5, 0.5)',
  'rgba(189, 16, 224, 0.5)',
  'rgba(144, 19, 254, 0.5)',
  'rgba(74, 144, 226, 0.5)',
  'rgba(80, 227, 194, 0.5)',
  'rgba(184, 233, 134, 0.5)',
  'rgba(0, 0, 0, 0.5)',
  'rgba(68, 68, 68, 0.5)',
  'rgba(136, 136, 136, 0.5)',
  'rgba(204, 204, 204, 0.5)',
  'rgba(255, 255, 255, 0.5)',
];

const meta: Meta = {
  id: 'uui-color-picker',
  component: 'uui-color-picker',
  title: 'Inputs/Color/Color Picker',
  argTypes: {
    format: {
      options: formats,
    },
    size: {
      options: sizes,
    },
    value: {
      control: { type: 'color' },
    },
  },
  render: args => html`<uui-color-picker ${spread(args)}></uui-color-picker>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: '#000000',
  },
};

export const Empty: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Formats: Story = {
  args: {
    format: 'hex',
    inline: true,
  },
};

export const Inline: Story = {
  args: {
    inline: true,
  },
};

export const Opacity: Story = {
  args: {
    opacity: true,
    value: swatchesTransparent[8],
    inline: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    value: 'rgb(75, 145, 226)',
  },
};

export const NoSwatches: Story = {
  args: {
    swatches: [],
  },
};

export const TransparentSwatches: Story = {
  args: {
    opacity: true,
    swatches: swatchesTransparent,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('#4b91e2');

    function handleChange(e: Event) {
      setValue((e.target as UUIColorPickerElement).value);
    }

    return html`
      <div style="display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap;">
        <uui-color-picker
          inline
          value="#4b91e2"
          @change=${handleChange}></uui-color-picker>
        <div style="font-family: monospace; font-size: 13px; padding-top: 4px; min-width: 220px;">
          <div style="font-weight: bold; margin-bottom: 10px; font-size: 14px;">
            Emitted value
          </div>
          <div
            style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #f5f5f5; border-radius: 4px; margin-bottom: 16px;">
            <div
              style="width: 20px; height: 20px; border-radius: 3px; border: 1px solid rgba(0,0,0,0.2); background: ${value}; flex-shrink: 0;"></div>
            <code>${value || '(empty)'}</code>
          </div>
          <div style="color: #888; font-size: 12px; line-height: 1.6;">
            Switch the format selector in the picker<br />to see different output string formats.
          </div>
        </div>
      </div>
    `;
  },
};
