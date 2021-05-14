import { html } from 'lit-html';
import './index';

export default {
  title: 'Inputs/Dropdown',
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
    <uui-button slot="toggle" look="positive">Click</uui-button>
    <uui-overflow-container style="min-width: 400px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-option
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
            ></uui-select-option>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
`;

export const withInput = () => html`
  <uui-dropdown>
    <uui-textfield slot="input"></uui-textfield>
    <uui-button slot="toggle" look="positive">Click</uui-button>
    <uui-overflow-container style="min-width: 400px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-option
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
            ></uui-select-option>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
`;

export const top = () => html`
  <uui-dropdown .position=${'top'} style="position: relative; top: 50vh">
    <uui-button slot="toggle" look="positive">Click</uui-button>
    <uui-overflow-container style="min-width: 200px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-option
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
            ></uui-select-option>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
`;

export const auto = () => html`
  <div style="height: 150vh;">scroll down...</div>
  <uui-dropdown position="bottom" auto>
    <uui-textfield slot="input"></uui-textfield>
    <uui-button slot="toggle" look="positive">Click</uui-button>
    <uui-overflow-container style="min-width: 400px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-option
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
            ></uui-select-option>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
  <div style="height: 150vh;"></div>
`;

export const sameWidth = () => html`
  <uui-dropdown position="bottom" same-width>
    <uui-button slot="toggle" look="positive">Click</uui-button>
    <div style="height: 180px; background-color: blue;"></div>
  </uui-dropdown>
`;

export const closeOnOutsideClickDisabled = () => html`
  <uui-dropdown position="bottom" same-width disable-outside-click>
    <uui-button slot="toggle" look="positive">Click</uui-button>
    <div style="height: 180px; background-color: blue;"></div>
  </uui-dropdown>
`;
