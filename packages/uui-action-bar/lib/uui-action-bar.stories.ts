import { html } from 'lit';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import './uui-action-bar.element';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  component: 'uui-action-bar',
  title: 'Action Bar',
  args: {
    look: 'primary',
    color: 'default',
  },
  argTypes: {
    look: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'positive', 'warning', 'danger'],
    },
  },
  decorators: [
    story =>
      html`<uui-icon-registry-essential>
        ${story()}
      </uui-icon-registry-essential>`,
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: args => {
    const buttons = ['copy', 'remove', 'delete'];
    return html`<uui-action-bar>
      ${buttons.map(
        el =>
          html`<uui-button ${spread(args)} label="${el}">
            <uui-icon name="${el}"></uui-icon>
          </uui-button>`,
      )}
    </uui-action-bar>`;
  },
};

export const Single: Story = {
  render: args => {
    return html`<uui-action-bar>
      <uui-button ${spread(args)} label="trash">
        <uui-icon name="delete"></uui-icon>
      </uui-button>
    </uui-action-bar>`;
  },
};

export const LooksAndColors: Story = {
  render: () => {
    const buttons = ['copy', 'remove', 'delete'];
    const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];
    const colors = ['default', 'positive', 'warning', 'danger'];

    const uppercaseFirstLetter = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    return html`
      ${colors.map(
        color => html`
        <h5>${uppercaseFirstLetter(color)}</h5>
          ${looks.map(
            look => html`
              <uui-action-bar
                >${buttons.map(
                  el =>
                    html` <uui-button
                      label="${el}"
                      .look="${look as any}"
                      .color="${color as any}">
                      <uui-icon name="${el}"></uui-icon>
                    </uui-button>`,
                )}
              </uui-action-bar>
            `,
          )}
        </div>
      `,
      )}
    `;
  },
};
