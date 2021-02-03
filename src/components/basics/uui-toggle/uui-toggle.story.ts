import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Toggle',
  component: 'uui-toggle',
};

export const Basic = () => html` <uui-toggle label="Toggle me"></uui-toggle> `;

export const Preselected = () =>
  html` <uui-toggle label="Toggle me" checked></uui-toggle>`;

export const LabelPosition = () => html`
  <div style="display: flex; justify-content: space-evenly;">
    <uui-toggle label="Left" label-position="left"></uui-toggle>
    <uui-toggle label="Top" label-position="top"></uui-toggle>
    <uui-toggle label="Right" label-position="right"></uui-toggle>
    <uui-toggle label="Bottom" label-position="bottom"></uui-toggle>
  </div>
`;

export const NoLabel = () =>
  html`<uui-toggle hide-label name="Hidden Label"></uui-toggle
    ><uui-toggle hide-label name="Hidden Label 2"></uui-toggle>
    <p>
      label is set via label attribute. Hide it by adding hide-label bool
      attribute
    </p>`;

export const Disabled = () => html`
  <uui-toggle label="Active"></uui-toggle>
  <uui-toggle disabled label="Can't touch this"></uui-toggle>
  <uui-toggle disabled label="Can't touch this"></uui-toggle>
`;

export const LongLabel = () => html`
  <uui-toggle
    label="Let's see how it looks when someone out of reason put's the label in."
  ></uui-toggle>
`;
