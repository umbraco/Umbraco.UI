import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Dropdown',
  component: 'uui-dropdown',
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
  <uui-dropdown style="max-width: 300px">
    <uui-overflow-container>
      <uui-list>
        ${options.map(
          option => html`<uui-list-item>${option.color}</uui-list-item>`
        )}
      </uui-list>
    </uui-overflow-container>
  </uui-dropdown>
`;
