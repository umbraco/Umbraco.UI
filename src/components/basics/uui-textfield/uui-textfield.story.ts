import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Textfield',
  component: 'uui-textfield',
};

export const Text = () =>
  html` <uui-textfield value="Hello" label=""></uui-textfield> `;

export const Disabled = () =>
  html`
    <uui-textfield value="Hello" label="" .disabled=${true}></uui-textfield>
  `;

export const Placeholder = () =>
  html`
    <uui-textfield placeholder="Type something..." label=""></uui-textfield>
  `;

export const labelOutside = () =>
  html`
    <label for="something">
      Label with ${'<label>'} tag outside component
      <uui-textfield id="something" value="Hello"></uui-textfield>
    </label>
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

export const Search = () =>
  html`
    <uui-textfield value="Hello" label="Password" type="search"></uui-textfield>
  `;
export const DateTime = () =>
  html`
    <uui-textfield
      value="Hello"
      label="Date time"
      type="datetime-local"
    ></uui-textfield>
  `;
