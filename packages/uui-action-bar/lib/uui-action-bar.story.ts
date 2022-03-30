import type { Story } from '@storybook/web-components';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';

import { html } from 'lit-html';

import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';

export default {
  id: 'uui-action-bar',
  title: 'Buttons/Action Bar',
  component: 'uui-action-bar',
  args: {
    look: '',
  },
  argTypes: {
    look: {
      control: {
        type: 'select',
      },
      options: InterfaceLookNames,
    },
  },
};

const buttons = ['copy', 'remove', 'delete'];

export const AAAOverview: Story = props => html`
  <uui-icon-registry-essential>
    <uui-action-bar
      >${buttons.map(
        el => html` <uui-button label="${el}" look="${props.look}">
          <uui-icon name="${el}"></uui-icon>
        </uui-button>`
      )}
    </uui-action-bar>
  </uui-icon-registry-essential>
`;

AAAOverview.storyName = 'Overview';

export const Single = () =>
  html`
    <uui-icon-registry-essential>
      <uui-action-bar>
        <uui-button label="Delete" look="outline"
          ><uui-icon name="delete"></uui-icon
        ></uui-button>
      </uui-action-bar>
    </uui-icon-registry-essential>
  `;

export const Looks = () => html`
  <uui-icon-registry-essential>
    ${InterfaceLookNames.map(
      (lookName: InterfaceLookType) =>
        html` <div>${lookName}</div>
          <uui-action-bar>
            ${buttons.map(
              button => html`<uui-button label="${button}" .look=${lookName}>
                <uui-icon name="${button}"></uui-icon>
              </uui-button>`
            )} </uui-action-bar
          ><br /><br />`
    )}
  </uui-icon-registry-essential>
`;

Looks.parameters = {
  docs: {
    source: {
      code: `
<uui-icon-registry-essential>
  <uui-action-bar>
    
    <uui-button look="[look]" label="Copy">
      <uui-icon name="copy"></uui-icon>
    </uui-button>

    <uui-button look="[look]" label="Remove">
      <uui-icon name="remove"></uui-icon>
    </uui-button>

    <uui-button look="[look]" label="Delete">
      <uui-icon name="delete"></uui-icon>
    </uui-button>

  </uui-action-bar>
</uui-icon-registry-essential>`,
    },
  },
};
