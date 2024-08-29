import '.';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  id: 'uui-box',
  component: 'uui-box',
  title: 'Layout/Box',
  args: {},
  argTypes: {
    headlineVariant: {
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  render: args => {
    return html`<uui-box ${spread(args)}>
      ${args['headline slot']
        ? html`<div slot="headline">${args['headline slot']}</div>`
        : nothing}
      ${args['header']
        ? html`<div slot="header">${args['header']}</div>`
        : nothing}
      ${args['header-actions']
        ? html`<div slot="header-actions">${args['header-actions']}</div>`
        : nothing}
      ${args['slot']}
    </uui-box>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    headline: 'Headline',
    slot: 'Some content of this box, appended in the default slot.',
  },
};

export const Slots: Story = {
  args: {
    slot: 'Default slot',
    'headline slot': 'Headline Slot',
    header: 'Header Slot',
    'header-actions': 'Header actions slot',
  },
};
