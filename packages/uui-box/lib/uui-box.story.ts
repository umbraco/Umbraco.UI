import '.';
import readme from '../README.md?raw';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-box',
  component: 'uui-box',
  title: 'Layout/Box',
  args: {},
  argTypes: {
    headline: {
      control: {
        type: 'text',
      },
    },
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
      ${args['header slot']
        ? html`<div slot="header">${args['header slot']}</div>`
        : nothing}
      ${args['header-actions slot']
        ? html`<div slot="header-actions">${args['header-actions slot']}</div>`
        : nothing}
      ${args['slot']}
    </uui-box>`;
  },
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
    headline: 'Headline',
    slot: 'Some content of this box, appended in the default slot.',
  },
};

export const Slots: Story = {
  args: {
    slot: 'Default slot',
    'headline slot': 'Headline Slot',
    'header slot': 'Header Slot',
    'header-actions slot': 'Header actions slot',
  },
};
