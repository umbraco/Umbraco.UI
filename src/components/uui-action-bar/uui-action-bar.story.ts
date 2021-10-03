import { html } from 'lit-html';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import './index';

export default {
  title: 'Buttons/Action Bar',
  component: 'uui-action-bar',
};

const buttons = ['bug', 'info', 'delete'];

export const Basic = () =>
  html`<uui-action-bar
    >${buttons.map(
      el => html`<uui-button><uui-icon name="${el}"></uui-icon></uui-button>`
    )}</uui-action-bar
  >`;

export const Single = () =>
  html`<uui-action-bar
    ><uui-button look="outline"><uui-icon name="delete"></uui-icon></uui-button>
  </uui-action-bar>`;

export const AllStyles = () => html`
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
`;
