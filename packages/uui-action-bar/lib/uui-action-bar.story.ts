import type { StoryFn } from '@storybook/web-components';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';

import { html } from 'lit';

import readme from '../README.md?raw';

export default {
  id: 'uui-action-bar',
  title: 'Buttons/Action Bar',
  component: 'uui-action-bar',
  args: {
    look: 'secondary',
    color: 'default',
  },
  argTypes: {
    look: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'positive', 'warning', 'danger'],
    },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

const buttons = ['copy', 'remove', 'delete'];

export const AAAOverview: StoryFn = props => html`
  <uui-icon-registry-essential>
    <uui-action-bar
      >${buttons.map(
        el =>
          html` <uui-button
            label="${el}"
            look="${props.look}"
            color="${props.color}">
            <uui-icon name="${el}"></uui-icon>
          </uui-button>`,
      )}
    </uui-action-bar>
  </uui-icon-registry-essential>
`;

AAAOverview.storyName = 'Overview';

export const Single = () => {
  const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];

  return html`
    <uui-icon-registry-essential>
      ${looks.map(
        look =>
          html`<div
            style="display: grid; grid-template-columns: repeat( auto-fill, 120px ); gap: 16px; margin-bottom: 32px">
            <uui-action-bar style="justify-self: left;">
              <uui-button label="Delete" .look="${look as any}">
                <uui-icon name="delete"></uui-icon>
              </uui-button>
            </uui-action-bar>
          </div> `,
      )}
    </uui-icon-registry-essential>
  `;
};

export const LooksAndColors = () => {
  const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];
  const colors = ['default', 'positive', 'warning', 'danger'];

  return html`
    <uui-icon-registry-essential>
      ${colors.map(
        color =>
          html`<div
            style="display: grid; grid-template-columns: repeat( auto-fill, 100px ); gap: 16px; margin-bottom: 32px">
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
          </div> `,
      )}
    </uui-icon-registry-essential>
  `;
};

LooksAndColors.parameters = {
  docs: {
    source: {
      code: `
<uui-icon-registry-essential>
  <uui-action-bar>

    <uui-button look="[look]" color="[color]" label="Copy">
      <uui-icon name="copy"></uui-icon>
    </uui-button>

    <uui-button look="[look]" color="[color]" label="Remove">
      <uui-icon name="remove"></uui-icon>
    </uui-button>

    <uui-button look="[look]" color="[color]" label="Delete">
      <uui-icon name="delete"></uui-icon>
    </uui-button>

  </uui-action-bar>
</uui-icon-registry-essential>`,
    },
  },
};
