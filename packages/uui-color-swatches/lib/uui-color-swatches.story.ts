import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { UUIColorSwatchesElement } from './uui-color-swatches.element';
import readme from '../README.md?raw';

import './uui-color-swatches.element';

const swatchesColor = [
  { label: 'Blood Orange', value: '#d0021b' },
  { label: 'Marigold', value: '#f5a623' },
  { label: 'Yellow Sun', value: '#f8e71c' },
  { label: 'Milk Chocolate', value: '#8b572a' },
  { label: 'Lemon Lime', value: '#7ed321' },
  { label: 'Avocado', value: '#417505' },
  { label: 'Vivid Mulberry', value: '#bd10e0' },
  { label: 'Electric Violet', value: '#9013fe' },
  { label: 'Tufts Blue', value: '#4a90e2' },
  { label: 'Crayola', value: '#b8e986' },
  { label: 'Black', value: '#000000' },
  { label: 'Grey', value: '#888' },
  { label: 'Outer Space', value: '#444' },
  { label: 'Chinese Silver', value: '#ccc' },
  { label: 'White', value: '#fff' },
];

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

const swatchesGrouped = [
  { value: '#f0f9ff', group: 'Primary' },
  { value: '#e0f2fe', group: 'Primary' },
  { value: '#bae6fd', group: 'Primary' },
  { value: '#7dd3fc', group: 'Primary' },
  { value: '#38bdf8', group: 'Primary' },
  { value: '#0ea5e9', group: 'Primary' },
  { value: '#0284c7', group: 'Primary' },
  { value: '#0369a1', group: 'Primary' },
  { value: '#075985', group: 'Primary' },
  { value: '#0c4a6e', group: 'Primary' },
  { value: '#0b3249', group: 'Primary' },

  { value: '#f0fdf4', group: 'Success' },
  { value: '#dcfce7', group: 'Success' },
  { value: '#bbf7d0', group: 'Success' },
  { value: '#86efac', group: 'Success' },
  { value: '#4ade80', group: 'Success' },
  { value: '#22c55e', group: 'Success' },
  { value: '#16a34a', group: 'Success' },
  { value: '#15803d', group: 'Success' },
  { value: '#166534', group: 'Success' },
  { value: '#14532d', group: 'Success' },
  { value: '#0c311b', group: 'Success' },

  { value: '#fffbeb', group: 'Warning' },
  { value: '#fef3c7', group: 'Warning' },
  { value: '#fde68a', group: 'Warning' },
  { value: '#fcd34d', group: 'Warning' },
  { value: '#fbbf24', group: 'Warning' },
  { value: '#f59e0b', group: 'Warning' },
  { value: '#d97706', group: 'Warning' },
  { value: '#b45309', group: 'Warning' },
  { value: '#92400e', group: 'Warning' },
  { value: '#78350f', group: 'Warning' },
  { value: '#4a230b', group: 'Warning' },

  { value: '#fef2f2', group: 'Danger' },
  { value: '#fee2e2', group: 'Danger' },
  { value: '#fecaca', group: 'Danger' },
  { value: '#fca5a5', group: 'Danger' },
  { value: '#f87171', group: 'Danger' },
  { value: '#ef4444', group: 'Danger' },
  { value: '#dc2626', group: 'Danger' },
  { value: '#b91c1c', group: 'Danger' },
  { value: '#991b1b', group: 'Danger' },
  { value: '#7f1d1d', group: 'Danger' },
  { value: '#501414', group: 'Danger' },

  { value: '#f9f9f9', group: 'Neutral' },
  { value: '#f4f4f5', group: 'Neutral' },
  { value: '#e4e4e7', group: 'Neutral' },
  { value: '#d4d4d8', group: 'Neutral' },
  { value: '#a1a1aa', group: 'Neutral' },
  { value: '#71717a', group: 'Neutral' },
  { value: '#52525b', group: 'Neutral' },
  { value: '#3f3f46', group: 'Neutral' },
  { value: '#27272a', group: 'Neutral' },
  { value: '#18181b', group: 'Neutral' },
  { value: '#131316', group: 'Neutral' },

  { value: '#fff', group: 'Black & White' },
  { value: '#000', group: 'Black & White' },
];

const meta: Meta<typeof UUIColorSwatchesElement> = {
  id: 'uui-color-swatches',
  title: 'Inputs/Color/Color Swatches',
  component: 'uui-color-swatches',
  args: {
    swatchesColor,
    showLabel: false,
  } as any,
  argTypes: {
    swatchesColor: {
      control: { type: 'array' },
    },
    showLabel: {
      control: { type: 'boolean' },
    },
  } as any,
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-color-swatches></uui-color-swatches>`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<UUIColorSwatchesElement>;

const Template: Story = {
  render: (args: any) => {
    const groups = Array.from(
      new Set(
        args.swatchesColor
          .filter(color => color.group)
          .map(color => color.group ?? ('' as string)),
      ),
    ) as Array<any>;

    console.log('groups', groups);

    function _renderSwatches(group: string | null) {
      const swatchColors = group
        ? args.swatchesColor.filter(color => color.group === group)
        : args.swatchesColor;

      return html` <uui-color-swatches
        .value=${args.value}
        label="my color pallette">
        ${repeat(swatchColors, (swatch: any) => {
          const label = typeof swatch === 'string' ? swatch : swatch.label;
          const value = typeof swatch === 'string' ? swatch : swatch.value;

          return html`<uui-color-swatch
            label="${label}"
            .showLabel=${args.showLabel}
            .value=${value}>
          </uui-color-swatch>`;
        })}
      </uui-color-swatches>`;
    }

    if (groups.length === 0) {
      return _renderSwatches(null);
    }

    return html` ${repeat(groups, (group: string) => {
      return html`<label style="display: inline-block; margin-top: 10px;"
          >${group}</label
        >
        ${_renderSwatches(group)}`;
    })}`;
  },
};

export const Overview: Story = {
  ...Template,
};

export const Preselected: Story = {
  ...Template,
  args: {
    value: '#7ed321',
  },
};

export const Transparent: Story = {
  ...Template,
  args: {
    swatchesColor: swatchesTransparent,
  } as any,
};

export const Grouped: Story = {
  ...Template,
  args: {
    swatchesColor: swatchesGrouped,
  } as any,
};
