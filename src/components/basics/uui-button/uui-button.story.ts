import { html } from 'lit-html';
import './index';
import {
  SymbolicColorNames,
  SymbolicColorType,
} from '../../../type/SymbolicColor';

export default {
  title: 'Basics/Button',
  component: 'uui-button',
};

export const Default = () => html` <uui-button>Basic button</uui-button> `;

export const Disabled = () =>
  html` <uui-button disabled>Disabled button</uui-button> `;

export const Loading = () =>
  html` <uui-button loading>Button waiting for something</uui-button> `;

export const Styles = () => html`
  <uui-button>Default style</uui-button>
  ${SymbolicColorNames.map(
    (symbolicColorName: SymbolicColorType) =>
      html`<uui-button button-style="${symbolicColorName}"
        >${symbolicColorName} style</uui-button
      >`
  )}
`;
