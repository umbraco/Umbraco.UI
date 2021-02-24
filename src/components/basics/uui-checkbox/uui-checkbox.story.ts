import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Checkbox',
  component: 'uui-checkbox',
};

export const Basic = () =>
  html` <uui-checkbox .label=${'Checkbox label'} value="bike"></uui-checkbox> `;

export const Preselected = () =>
  html` <uui-checkbox label="Checkbox me" value="bike" checked></uui-checkbox>`;

export const WithSlottedLabel = () =>
  html`
    <uui-checkbox label="Toggle label" value="bike"
      >Using <b>Slot</b> for displayed label
    </uui-checkbox>
  `;

export const LabelPosition = () => html`
  <div style="display: flex; justify-content: space-evenly;">
    <uui-checkbox label="Left" label-position="left"></uui-checkbox>
    <uui-checkbox label="Top" label-position="top"></uui-checkbox>
    <uui-checkbox label="Right" label-position="right"></uui-checkbox>
    <uui-checkbox label="Bottom" label-position="bottom"></uui-checkbox>
  </div>
`;

export const NoLabel = () =>
  html`<uui-checkbox hide-label name="Hidden Label"></uui-checkbox
    ><uui-checkbox hide-label name="Hidden Label 2"></uui-checkbox>
    <p>
      label is set via label attribute. Hide it by adding hide-label bool
      attribute
    </p>`;

export const Disabled = () => html`
  <uui-checkbox disabled label="Can't touch this"></uui-checkbox>
  <uui-checkbox disabled label="Can't touch this" checked></uui-checkbox>
`;

export const InAForm = () => html`
  <form action="">
    <uui-checkbox label="Lol"></uui-checkbox>
  </form>
`;
