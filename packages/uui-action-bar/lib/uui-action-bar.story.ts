import { html } from 'lit-html';
import '@umbraco-ui/uui-action-bar/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import '@umbraco-ui/uui-icon/lib/index';
import '@umbraco-ui/uui-icon-registry-essential/lib/index';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';

export default {
  id: 'uui-action-bar',
  title: 'Buttons/Action Bar',
  component: 'uui-action-bar',
  parameters: {
    docs: {
      source: {
        code: `<uui-action-bar>...</uui-action-bar>`,
      },
    },
  },
};

const buttons = ['copy', 'remove', 'delete'];

export const Basic = () =>
  html`
    <uui-icon-registry-essential>
      <uui-action-bar
        >${buttons.map(
          el =>
            html`<uui-button><uui-icon name="${el}"></uui-icon></uui-button>`
        )}
      </uui-action-bar>
    </uui-icon-registry-essential>
  `;

export const Single = () =>
  html`
    <uui-icon-registry-essential>
      <uui-action-bar>
        <uui-button look="outline"
          ><uui-icon name="delete"></uui-icon
        ></uui-button>
      </uui-action-bar>
    </uui-icon-registry-essential>
  `;

export const AllStyles = () => html`
  <uui-icon-registry-essential>
    ${InterfaceLookNames.map(
      (lookName: InterfaceLookType) =>
        html` <uui-action-bar>
            ${buttons.map(
              button => html`<uui-button .look=${lookName}>
                <uui-icon name="${button}"></uui-icon>
              </uui-button>`
            )} </uui-action-bar
          ><br /><br /><br />`
    )}
  </uui-icon-registry-essential>
`;
