import { html } from 'lit';
import '.';
import readme from '../README.md?raw';
import '@umbraco-ui/uui-badge/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-loader-circle/lib';
import type { Meta, StoryObj } from '@storybook/web-components';
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
    '--uui-button-height': { control: { type: 'text' } },
    '--uui-button-border-width': { control: { type: 'text' } },
    '--uui-button-border-color': { control: { type: 'color' } },
    '--uui-button-border-radius': { control: { type: 'text' } },
    '--uui-button-font-size': { control: { type: 'text' } },
    '--uui-button-font-weight': { control: { type: 'text' } },
    '--uui-button-background-color': { control: { type: 'color' } },
    '--uui-button-background-color-hover': { control: { type: 'color' } },
    '--uui-button-border-color-hover': { control: { type: 'color' } },
    '--uui-button-contrast': { control: { type: 'color' } },
    '--uui-button-contrast-hover': { control: { type: 'color' } },
    '--uui-button-background-color-disabled': { control: { type: 'color' } },
    '--uui-button-contrast-disabled': { control: { type: 'color' } },
    '--uui-button-content-align': {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    '--uui-button-transition': { control: { type: 'text' } },
  },
  render: args => {
    return html`<uui-button ${spread(args)}>${renderSlots(args)}</uui-button>`;
  },
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

/**
 * The default button padding for a solo icon is generally too big, so please use the `compact` attribute.
 */
export const IconSolo: Story = {
  args: {
    compact: true,
    slot: html`<uui-icon name="favorite"></uui-icon>`,
  },
};

export const Sizing: Story = {
  args: {
    'font-size': '20px',
  },
  render: args => {
    return html`<uui-button
      style="font-size: ${args['font-size']}"
      ${spread(args, ['font-size'])}></uui-button>`;
  },
};

export const Loading: Story = {
  args: {
    state: 'waiting',
  },
};

export const ContentAlign: Story = {
  args: {
    '--uui-button-content-align': 'left',
  },
  render: args => {
    return html`<uui-button style="width: 400px" ${spread(args)}></uui-button>`;
  },
};

export const SlottedContent: Story = {
  args: {
    slot: html`<div
      style="display: flex; flex-direction: column; align-items: center; gap: 3px">
      <uui-icon name="settings"></uui-icon>
      Settings
    </div>`,
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
