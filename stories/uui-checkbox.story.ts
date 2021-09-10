import { html } from 'lit-html';
import '@umbraco-ui/uui-checkbox/src/index'; 

export default {
  title: 'Inputs/Checkbox',
  component: 'uui-checkbox',
};

export const Basic = () =>
  html` <uui-checkbox .label=${'Checkbox label'} value="bike"></uui-checkbox> `;

export const Preselected = () =>
  html` <uui-checkbox
    .label=${'Checkbox label'}
    value="bike"
    checked
  ></uui-checkbox>`;

export const WithSlottedLabel = () =>
  html`
    <uui-checkbox .label=${'Checkbox label'} value="bike"
      >Using <b>Slot</b> for displayed label
    </uui-checkbox>
  `;

export const LabelPosition = () => html`
  <div style="display: flex; justify-content: space-evenly;">
    <uui-checkbox
      .label=${'Checkbox left label'}
      label-position="left"
    ></uui-checkbox>
    <uui-checkbox
      .label=${'Checkbox top label'}
      label-position="top"
    ></uui-checkbox>
    <uui-checkbox
      .label=${'Checkbox right label'}
      label-position="right"
    ></uui-checkbox>
    <uui-checkbox
      .label=${'Checkbox bottom label'}
      label-position="bottom"
    ></uui-checkbox>
  </div>
`;

export const NoLabel = () =>
  html`<uui-checkbox
      hide-label
      .label=${'Checkbox label'}
      name="Hidden Label"
    ></uui-checkbox
    ><uui-checkbox
      hide-label
      .label=${'Checkbox label'}
      name="Hidden Label 2"
    ></uui-checkbox>
    <p>
      label is set via label attribute. Hide it by adding hide-label bool
      attribute
    </p>`;

export const Disabled = () => html`
  <uui-checkbox disabled .label=${'Checkbox label'}></uui-checkbox>
  <uui-checkbox
    disabled
    .label=${'Checkbox label'}
    style="margin-left: 20px;"
    checked
  ></uui-checkbox>
`;

export const Error = () => html`
  <uui-checkbox .label=${'Checkbox label'} error></uui-checkbox>
  <uui-checkbox
    error
    .label=${'Checkbox label'}
    style="margin-left: 20px;"
    checked
  ></uui-checkbox>
  <uui-checkbox disabled .label=${'Checkbox label'} error></uui-checkbox>
  <uui-checkbox
    error
    disabled
    .label=${'Checkbox label'}
    style="margin-left: 20px;"
    checked
  ></uui-checkbox>
`;

export const InAForm = () => html`
  <form action="">
    <uui-checkbox .label=${'Checkbox label'}></uui-checkbox>
  </form>
`;
