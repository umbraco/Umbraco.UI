import { html } from 'lit-html';
import './index';

export default {
  title: 'Inputs/Textfield',
  component: 'uui-textfield',
};

export const Text = () =>
  html` <uui-textfield value="Hello" label="Text"></uui-textfield> `;

export const HideLabel = () =>
  html` <uui-textfield hide-label value="Hello" label="Text"></uui-textfield> `;

export const Disabled = () =>
  html`
    <uui-textfield
      value="Hello"
      label="Disabled"
      .disabled=${true}
    ></uui-textfield>
  `;

export const Placeholder = () =>
  html`
    <uui-textfield
      placeholder="Type something..."
      label="Placeholder"
    ></uui-textfield>
  `;

export const Color = () =>
  html`
    <uui-textfield value="Hello" label="Color" type="color"></uui-textfield>
  `;

export const Date = () =>
  html`
    <uui-textfield value="Hello" label="Date" type="date"></uui-textfield>
  `;

export const Password = () =>
  html`
    <uui-textfield
      value="Hello"
      label="Password"
      type="password"
    ></uui-textfield>
  `;

export const DateTime = () =>
  html`
    <uui-textfield
      label="Date time"
      type="datetime-local"
      label="Date Time"
    ></uui-textfield>
  `;

export const Week = () =>
  html`
    <uui-textfield
      label="Date time"
      type="datetime-local"
      label="Week"
    ></uui-textfield>
  `;
