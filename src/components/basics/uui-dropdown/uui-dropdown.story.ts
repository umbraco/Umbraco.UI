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
  <uui-dropdown>
    <uui-button slot="input" look="positive">Click</uui-button>
    <uui-overflow-container style="min-width: 400px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-list-item
              ><uui-icon
                slot="left"
                name="bug"
                .style="color: ${option.value}"
              ></uui-icon
              >${option.color}<uui-icon
                slot="right"
                name="bug"
                .style="color: ${option.value}"
              ></uui-icon
            ></uui-select-list-item>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
`;
