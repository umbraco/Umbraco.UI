import { html } from 'lit-html';
import './index';

export default {
  title: 'Inputs/Select',
  component: 'uui-select',
};

const options = [
  {
    color: 'red',
    value: '#f00',
  },
  {
    color: 'green',
    value: '#0f0',
  },
  {
    color: 'blue',
    value: '#00f',
  },
  {
    color: 'cyan',
    value: '#0ff',
  },
  {
    color: 'magenta',
    value: '#f0f',
  },
  {
    color: 'yellow',
    value: '#ff0',
  },
  {
    color: 'black',
    value: '#000',
  },
];

export const Overview = () => html`
  <uui-select label="Select the color" placeholder="Choose the color">
    ${options.map(
      option =>
        html`<uui-select-option value="${option.color}" label="${option.color}">
          <uui-icon name="bug" .style="color: ${option.value}"> </uui-icon>
          ${option.color}
        </uui-select-option>`
    )}
  </uui-select>
`;

export const WithInput = () => html`
  <uui-select autocomplete>
    ${options.map(
      option =>
        html`<uui-select-option value="${option.color}" label="${option.color}">
          <uui-icon name="bug" .style="color: ${option.value}"></uui-icon>
          ${option.color}</uui-select-option
        >`
    )}
  </uui-select>
`;
