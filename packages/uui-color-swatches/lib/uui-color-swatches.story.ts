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
  '#000',
  '#444',
  '#888',
  '#ccc',
  '#fff'
];

export default {
  id: 'uui-color-swatches',
  title: 'Color Swatches',
  component: 'uui-color-swatches',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-swatches></uui-color-swatches>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-color-swatches .swatches=${swatches}></uui-color-swatches>`;
