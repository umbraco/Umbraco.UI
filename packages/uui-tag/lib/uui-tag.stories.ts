import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta: Meta = {
  id: 'uui-tag',
  component: 'uui-tag',
  title: 'Displays/Tag',
  args: {
    slot: 'Hello',
  },
  argTypes: {
    '--uui-tag-font-size': { control: { type: 'text' } },
    '--uui-tag-padding': { control: { type: 'text' } },
    '--uui-tag-border-radius': { control: { type: 'text' } },
    '--uui-tag-border-color': { control: { type: 'text' } },
  },
  render: args => html`<uui-tag ${spread(args)}>${renderSlots(args)}</uui-tag>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Sizing: Story = {
  args: {
    '--uui-tag-font-size': '24px',
  },
};

export const LooksAndColors: Story = {
  render: () => {
    const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];
    const colors = ['default', 'positive', 'warning', 'danger'];

    function uppercaseFirstLetter(s: string) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return html`
      ${colors.map(
        color => html`
          <h5>${uppercaseFirstLetter(color)}</h5>
          <div style="margin-bottom: 32px; display: flex; gap: 16px;">
            ${looks.map(
              look => html`
                <uui-tag
                  .look=${look as any}
                  .color=${color as any}
                  style="margin-right:12px;"
                  >${uppercaseFirstLetter(look)}</uui-tag
                >
              `,
            )}
          </div>
        `,
      )}
    `;
  },
};
