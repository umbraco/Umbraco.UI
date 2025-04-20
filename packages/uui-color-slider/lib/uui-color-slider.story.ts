import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { useState } from '@storybook/preview-api';
import { spread } from '../../../storyhelpers';
import { repeat } from 'lit/directives/repeat.js';

import { colord, HslaColor } from 'colord';

import type { UUIColorSliderElement } from '@umbraco-ui/uui-color-slider/lib';

const meta: Meta = {
  id: 'uui-color-slider',
  component: 'uui-color-slider',
  title: 'Inputs/Color/Color Slider',
  argTypes: {
    type: {
      options: ['hue', 'opacity', 'saturation', 'lightness'],
      control: { type: 'select' },
    },
  },
  render: args => html`<uui-color-slider ${spread(args)}></uui-color-slider>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 50,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    value: 50,
  },
};

export const Opacity: Story = {
  args: {
    type: 'opacity',
    color: '#0075ff',
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};

export const Advanced: Story = {
  render: () => {
    const sliders = [
      {
        label: 'H',
        type: 'hue',
        color: '#0075ff',
        value: 0,
        min: 0,
        max: 360,
      },
      {
        label: 'S',
        type: 'saturation',
        color: '#0075ff',
        value: 100,
        min: 0,
        max: 100,
      },
      {
        label: 'L',
        type: 'lightness',
        color: '#0075ff',
        value: 50,
        min: 0,
        max: 100,
      },
      {
        label: 'A',
        type: 'opacity',
        color: '#0075ff',
        value: 1,
        min: 0,
        max: 1,
        precision: 2,
      },
    ];

    const [value, setValue] = useState({ h: 0, s: 100, l: 50, a: 1 });

    function handleSliderChange(e: Event, slider: any) {
      e.stopPropagation();

      const element = e.target as UUIColorSliderElement;

      if (isNaN(element.value)) return;

      const newColor: HslaColor = {
        h: value.h,
        s: value.s,
        l: value.l,
        a: value.a,
      };

      if (slider.type === 'hue') {
        newColor.h = element.value;
      } else if (slider.type === 'saturation') {
        newColor.s = element.value;
      } else if (slider.type === 'lightness') {
        newColor.l = element.value;
      } else if (slider.type === 'opacity') {
        newColor.a = element.value;
      }

      slider.value = element.value;

      setValue({ h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a });
    }

    function handleInputChange(e: Event, slider: any) {
      e.stopPropagation();

      const input = e.target as HTMLInputElement;

      let newValue = parseFloat(input.value);

      if (isNaN(newValue)) {
        newValue = 0;
        input.value = '0';
      }

      const newColor: HslaColor = {
        h: value.h,
        s: value.s,
        l: value.l,
        a: value.a,
      };

      if (slider.type === 'hue') {
        newColor.h = newValue;
      } else if (slider.type === 'saturation') {
        newColor.s = newValue;
      } else if (slider.type === 'lightness') {
        newColor.l = newValue;
      } else if (slider.type === 'opacity') {
        newColor.a = newValue;
      }

      slider.value = newValue;

      setValue({ h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a });
    }

    /** Generates a hex string from HSL values. Hue must be 0-360. All other arguments must be 0-100. */
    function getHexString(
      hue: number,
      saturation: number,
      lightness: number,
      alpha = 100,
    ) {
      const color = colord(
        `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`,
      );
      if (!color.isValid()) {
        return '';
      }

      return color.toHex();
    }

    return html` <div style="display: flex; gap: 20px;">
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${repeat(sliders, (slider: any) => {
          return html`<div style="display: flex; gap: 10px 20px;">
            <label>${slider.label}</label>
            <uui-color-slider
              .type=${slider.type}
              .value=${slider.value}
              .min=${slider.min}
              .max=${slider.max}
              .color=${slider.type === 'opacity'
                ? getHexString(value.h, value.s, value.l)
                : undefined}
              ?precision=${ifDefined(slider.precision)}
              @change=${(e: Event) => handleSliderChange(e, slider)}
              style=${styleMap({
                '--uui-slider-background-image':
                  slider.type === 'saturation'
                    ? `linear-gradient(to right, hsl(${value.h}, 0%, ${value.l}%), hsl(${value.h}, 100%, ${value.l}%))`
                    : slider.type === 'lightness'
                      ? `linear-gradient(to right, hsl(${value.h}, ${value.s}%, 0%), hsl(${value.h}, ${value.s}%, ${slider.value}%))`
                      : undefined,
                width: '400px',
              })}>
            </uui-color-slider>
            <uui-input
              type="number"
              .min=${slider.min}
              .max=${slider.max}
              .step=${slider.precision > 1 ? slider.max / 10 : 1}
              .value=${slider.value}
              @change=${(e: Event) => handleInputChange(e, slider)}
              style="width: 60px;">
            </uui-input>
          </div>`;
        })}
      </div>
      <div
        style="width: 100px; height: 100px;
          border: 1px solid var(--uui-color-border-standalone);
          background-image: linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%), linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%), linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%);
          background-size: 10px 10px;
          background-position: 0 0, 0 0, -5px -5px, 5px 5px;">
        <div
          style="width: 100%; height: 100%; background-color: hsla(${value.h}, ${value.s}%, ${value.l}%, ${value.a});"></div>
      </div>
    </div>`;
  },
};
