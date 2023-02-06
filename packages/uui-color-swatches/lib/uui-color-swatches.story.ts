import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

const swatches = [
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
  '#000000',
  '#444',
  '#888',
  '#ccc',
  '#fff',
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

export default {
  id: 'uui-color-swatches',
  title: 'Inputs/Color/Color Swatches',
  component: 'uui-color-swatches',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatches></uui-color-swatches>`,
      },
    },
  },
};

const Template: Story = props => html`
  <uui-color-swatches .value=${props.value ?? ''} label="my color pallette">
    ${props.swatches.map(
      (swatch: string) =>
        html`<uui-color-swatch label="${swatch}" .showLabel=${props.showLabel}
          >${swatch}</uui-color-swatch
        >`
    )}
  </uui-color-swatches>
`;

export const Overview: Story = Template.bind({});
Overview.args = {
  swatches,
  showLabel: false,
};

export const WithLabels: Story = Template.bind({});
WithLabels.args = {
  swatches: swatches,
  showLabel: true,
};

export const Preselected: Story = Template.bind({});
Preselected.args = {
  swatches: swatches,
  value: '#7ed321',
};

export const Transparent = Template.bind({});
Transparent.args = {
  swatches: swatchesTransparent,
};
