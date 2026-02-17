import './index.js';
import '../badge/index.js';
import '../icon/index.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread, renderSlots } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-button',
  component: 'uui-button',
  title: 'Buttons/Button',
  args: {
    label: 'Button',
    look: 'primary',
  },
  argTypes: {
    look: {
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
    },
    color: {
      options: ['default', 'positive', 'warning', 'danger', 'invalid'],
    },
    type: {
      options: ['button', 'submit', 'reset'],
    },
    state: {
      options: [null, 'waiting', 'success', 'failed'],
    },
  },
  render: args => {
    return html`<uui-button ${spread(args)}>${renderSlots(args)}</uui-button>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const Anchor: Story = {
  args: {
    href: 'https://www.umbraco.com',
  },
};

export const Badge: Story = {
  args: {
    slot: html`Button<uui-badge color="danger">2</uui-badge>`,
  },
};

export const Icon: Story = {
  args: {
    slot: html`Button <uui-icon name="favorite"></uui-icon>`,
  },
};

export const IconSolo: Story = {
  args: {
    compact: true,
    slot: html`<uui-icon name="favorite"></uui-icon>`,
  },
};

export const Loading: Story = {
  args: {
    state: 'waiting',
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const LooksAndColors: Story = {
  render: args => {
    const looks = [
      'default',
      'primary',
      'secondary',
      'outline',
      'placeholder',
    ] as const;
    const colors = [
      'default',
      'positive',
      'warning',
      'danger',
      'invalid',
    ] as const;

    const uppercaseFirstLetter = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    return html`
      ${colors.map(
        color => html`
          <h5>${uppercaseFirstLetter(color)}</h5>
            ${looks.map(
              look =>
                html` <uui-button
                  ${spread(args)}
                  look=${look}
                  color=${color}
                  label=${uppercaseFirstLetter(look)}></uui-button>`,
            )}
          </div>
        `,
      )}
    `;
  },
};
