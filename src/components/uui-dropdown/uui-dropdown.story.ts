import { html } from 'lit-html';
import './index';

export default {
  title: 'Compositions/Dropdown',
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

function open(e: any) {
  e.target.parentElement.open = !e.target.parentElement.open;
}

export const Overview = () => html`
  <uui-dropdown>
    <uui-button
      look="positive"
      @click=${(e: any) => {
        console.log(e);
        e.target.parentElement.open = !e.target.parentElement.open;
      }}
      >Click</uui-button
    >
    <uui-overflow-container slot="dropdown" style="min-width: 400px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-option
              ><uui-icon
                slot="left"
                name="bug"
                .style="color: ${option.value}"></uui-icon
              >${option.color}<uui-icon
                slot="right"
                name="bug"
                .style="color: ${option.value}"></uui-icon
            ></uui-select-option>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
`;

export const withInput = () => html`
  <uui-dropdown>
    <uui-textfield></uui-textfield>
    <uui-button
      look="positive"
      @click=${(e: any) => {
        console.log(e);
        e.target.parentElement.open = !e.target.parentElement.open;
      }}
      >Click</uui-button
    >
    <uui-overflow-container slot="dropdown" style="min-width: 400px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-option
              ><uui-icon
                slot="left"
                name="bug"
                .style="color: ${option.value}"></uui-icon
              >${option.color}<uui-icon
                slot="right"
                name="bug"
                .style="color: ${option.value}"></uui-icon
            ></uui-select-option>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
`;

export const top = () => html`
  <uui-dropdown .position=${'top'} style="position: relative; top: 50vh">
    <uui-button
      look="positive"
      @click=${(e: any) => {
        console.log(e);
        e.target.parentElement.open = !e.target.parentElement.open;
      }}
      >Click</uui-button
    >
    <uui-overflow-container slot="dropdown" style="min-width: 200px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-option
              ><uui-icon
                slot="left"
                name="bug"
                .style="color: ${option.value}"></uui-icon
              >${option.color}<uui-icon
                slot="right"
                name="bug"
                .style="color: ${option.value}"></uui-icon
            ></uui-select-option>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
`;

export const auto = () => html`
  <div style="height: 150vh;">scroll down...</div>
  <uui-dropdown position="bottom" auto>
    <uui-textfield></uui-textfield>
    <uui-button
      look="positive"
      @click=${(e: any) => {
        console.log(e);
        e.target.parentElement.open = !e.target.parentElement.open;
      }}
      >Click</uui-button
    >
    <uui-overflow-container slot="dropdown" style="min-width: 400px">
      <uui-select-list>
        ${options.map(
          option =>
            html`<uui-select-option
              ><uui-icon
                slot="left"
                name="bug"
                .style="color: ${option.value}"></uui-icon
              >${option.color}<uui-icon
                slot="right"
                name="bug"
                .style="color: ${option.value}"></uui-icon
            ></uui-select-option>`
        )}
      </uui-select-list>
    </uui-overflow-container>
  </uui-dropdown>
  <div style="height: 150vh;"></div>
`;

export const closeOnOutsideClickDisabled = () => html`
  <uui-dropdown position="bottom" same-width disable-outside-click>
    <uui-button
      look="positive"
      @click=${(e: any) => {
        console.log(e);
        e.target.parentElement.open = !e.target.parentElement.open;
      }}
      >Click</uui-button
    >
    <div slot="dropdown" style="height: 180px; background-color: blue;"></div>
  </uui-dropdown>
`;

export const sameWidth = () => html`
  <uui-dropdown same-width>
    <uui-button look="primary" @click=${open}> Click to open </uui-button>

    <div slot="dropdown" style="height: 180px; background-color: blue;"></div>
  </uui-dropdown>
`;

export const slots = () => html`
  <uui-dropdown same-width>
    <uui-button look="placeholder" @click=${open}>Default slot</uui-button>

    <uui-button
      slot="dropdown"
      look="placeholder"
      style="height: 180px; background-color: white;"
      >Dropdown slot</uui-button
    >
  </uui-dropdown>
`;
