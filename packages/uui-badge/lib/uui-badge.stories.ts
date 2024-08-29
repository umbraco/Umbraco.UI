import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  id: 'uui-badge',
  component: 'uui-badge',
  title: 'Displays/Badge',
  args: {
    slot: '2',
  },
  argTypes: {
    look: {
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
    },
    color: {
      options: ['default', 'positive', 'warning', 'danger'],
    },
  },
  render: args => {
    return html`<uui-badge ${spread(args)}>${args.slot}</uui-badge>`;
  },
};

export default meta;
type Story = StoryObj;

// We can't have a component decorator because the looks and colors story needs to be rendered differently.
// Instead we inherit the default story.

export const Default: Story = {
  decorators: [
    story =>
      html`<div
        style="position:relative; width:80px; height:80px; border: 1px dashed rgba(0,0,0,0.3)">
        ${story()}
      </div>`,
  ],
};

export const Attention: Story = {
  ...Default,
  args: {
    attention: true,
  },
};

export const Icon: Story = {
  ...Default,
  render: args => {
    return html`<uui-badge ${spread(args)}>
      <uui-icon name="favorite"></uui-icon>
    </uui-badge>`;
  },
};

export const LooksAndColors: Story = {
  render: () => {
    const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];
    const colors = ['default', 'positive', 'warning', 'danger'];

    const uppercaseFirstLetter = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    return html`
      ${colors.map(
        color => html`
          <h5>${uppercaseFirstLetter(color)}</h5>
          <div style="margin-bottom: 32px; display: flex; gap: 16px;">
            ${looks.map(
              look => html`
                <div
                  style="position:relative; width:100px; height:80px; border: 1px dashed rgba(0,0,0,0.1); margin-top: 16px">
                  <uui-badge
                    .look=${look as any}
                    .color=${color as any}
                    style="margin-right:12px;"
                    >${uppercaseFirstLetter(look)}</uui-badge
                  >
                </div>
              `,
            )}
          </div>
        `,
      )}
    `;
  },
};
