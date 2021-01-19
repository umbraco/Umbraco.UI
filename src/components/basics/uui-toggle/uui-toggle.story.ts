import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Toggle',
  component: 'uui-toggle',
};

export const Basic = () => html` <uui-toggle label="Toggle me"></uui-toggle> `;

export const Rounded = () =>
  html` <uui-toggle label="Toggle me" rounded></uui-toggle> `;

export const Preselected = () =>
  html` <uui-toggle label="Toggle me" rounded checked></uui-toggle> `;

export const LabelPosition = () => html`
  <div style="display: flex; justify-content: space-evenly;">
    <uui-toggle rounded label="Left" label-position="left"></uui-toggle>
    <uui-toggle rounded label="Top" label-position="top"></uui-toggle>
    <uui-toggle rounded label="Right" label-position="right"></uui-toggle>
    <uui-toggle rounded label="Bottom" label-position="bottom"></uui-toggle>
  </div>
`;

export const NoLabel = () =>
  html`<uui-toggle hide-label name="Hidden Label"></uui-toggle
    ><uui-toggle hide-label rounded name="Hidden Label 2"></uui-toggle>
    <p>
      label is set via label attribute. Hide it by adding hide-label bool
      attribute
    </p>`;

export const Disabled = () => html`
  <uui-toggle label="Active" rounded></uui-toggle>
  <uui-toggle disabled label="Can't touch this"></uui-toggle>
  <uui-toggle rounded disabled label="Can't touch this"></uui-toggle>
`;
