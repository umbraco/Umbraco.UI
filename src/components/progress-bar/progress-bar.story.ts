import './progress-bar.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-progress-bar',
  component: 'uui-progress-bar',
  title: 'Displays/Progress Bar',
  render: args => html`<uui-progress-bar ${spread(args)}></uui-progress-bar>`,
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
    progress: 50,
  },
};

export const Fraction: Story = {
  args: {
    progress: 3,
    max: 10,
    label: 'Upload progress',
  },
  render: args => html`
    <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
      <uui-progress-bar ${spread(args)}></uui-progress-bar>
      <span>${args.progress}/${args.max}</span>
    </div>
  `,
};

export const Percentage: Story = {
  args: {
    progress: 35,
    max: 100,
    label: 'Upload progress',
  },
  render: args => {
    const percentage = Math.round(
      (Number(args.progress) / Number(args.max)) * 100,
    );

    return html`
      <div
        style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
        <uui-progress-bar ${spread(args)}></uui-progress-bar>
        <span>${percentage}%</span>
      </div>
    `;
  },
};
