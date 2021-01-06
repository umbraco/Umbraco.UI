import { html } from 'lit-html';
import './index';

// const LabelPosition = {
//   Top: 'top',
//   Bottom: 'bottom',
//   Left: 'left',
//   Right: 'right'
// }

// const LabelSelect = select('Label position', LabelPosition, 'left');

export default {
  title: 'Basics/Toggle',
  component: 'uui-toggle',
};

export const Basic = () => html`
  <uui-toggle></uui-toggle>
  <uui-toggle disabled></uui-toggle>
`;
export const Rounded = () => html` <uui-toggle rounded></uui-toggle> `;

export const Vertical = () => html`
  <uui-toggle rounded label-position="bottom"></uui-toggle>
`;
