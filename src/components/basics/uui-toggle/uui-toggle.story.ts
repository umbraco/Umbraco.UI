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

export const Basic = () => html` <uui-toggle label="Toggle me"></uui-toggle> `;

export const Rounded = () => html` <uui-toggle rounded></uui-toggle> `;

export const Vertical = () => html`
  <uui-toggle rounded label-position="bottom"></uui-toggle>
`;

export const Disabled = () => html`
  <uui-toggle disabled label="Can't touch this"></uui-toggle>
  <uui-toggle rounded disabled label="Can't touch this"></uui-toggle>
`;
