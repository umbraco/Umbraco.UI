import { html } from 'lit';
import '.';
import readme from '../README.md?raw';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-action-bar',
  component: 'uui-action-bar',
  title: 'Buttons/Action Bar',
  args: {
    look: 'primary',
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
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  // prettier-ignore
  render: args => html`
<uui-action-bar>
  <uui-button ${spread(args)} label="copy">
    <uui-icon name="copy"></uui-icon>
  </uui-button>
  <uui-button ${spread(args)} label="remove">
    <uui-icon name="remove"> </uui-icon>
  </uui-button>
  <uui-button ${spread(args)} label="delete">
    <uui-icon name="delete"></uui-icon>
  </uui-button>
</uui-action-bar>
  `,
};

export const Single: Story = {
  // prettier-ignore
  render: args => {
    return html`
<uui-action-bar>
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
