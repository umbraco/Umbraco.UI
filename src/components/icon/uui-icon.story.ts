import './index.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta: Meta = {
  id: 'uui-icon',
  component: 'uui-icon',
  title: 'Symbols/Icon',
  args: {
    name: 'favorite',
  },
  render: args =>
    html` <uui-icon-registry-essential>
      <uui-icon style=${ifDefined(args.style)} ${spread(args, ['style'])}>
        ${renderSlots(args)}
      </uui-icon>
    </uui-icon-registry-essential>`,
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomIcon: Story = {
  render: () =>
    html`<uui-icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M246.486 299.31l-85.604-91.047-58.21 107.66v29.658h289.12c-36.821-31.753-114.476-99.682-114.476-99.682l-30.83 53.411zM347 230.786c16.062 0 29.073-13 29.073-29.06 0-16.04-13.012-29.062-29.073-29.062-16.019 0-29.038 13.021-29.038 29.062 0 16.06 13.019 29.06 29.038 29.06zM37.74 102.699v306.569h434.688V102.699H37.74zm396.082 267.916H77.635l-.016-228.033h354.928v.017h1.275v228.016z"></path>
      </svg>
    </uui-icon>`,
};

export const Size: Story = {
  args: {
    name: 'favorite',
    style: 'font-size: 50px;',
  },
};

export const Color: Story = {
  args: {
    name: 'favorite',
    style: 'color: green;',
  },
};
