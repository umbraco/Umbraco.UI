import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Button Group',
  component: 'uui-button-group',
};

const buttons = ['development', 'staging', 'live'];

export const Overview = () =>
  html`<uui-button-group
    >${buttons.map(
      el => html`<uui-button look="secondary">${el}</uui-button>`
    )}</uui-button-group
  >`;

export const Outline = () =>
  html`<uui-button-group
    >${buttons.map(
      el => html`<uui-button look="outline">${el}</uui-button>`
    )}<uui-button look="danger">Hello</uui-button></uui-button-group
  >`;

export const Look = () =>
  html`<uui-button-group
    >${buttons.map(
      el => html`<uui-button look="secondary">${el}</uui-button>`
    )}<uui-button look="danger">Hello</uui-button></uui-button-group
  >`;

//* DO NOT DELETE START! they will work when dropdown component will come to this branch
// export const withDropdown = () =>
//   html`<uui-button-group
//     ><uui-dropdown>
//       <uui-button slot="toggle" look="secondary">Open dropdown</uui-button>
//       <div
//         style="height: 180px; width: 290px; background-color: blue;"
//       ></div> </uui-dropdown
//     >${buttons.map(
//       el => html`<uui-button look="secondary">${el}</uui-button>`
//     )}<uui-dropdown>
//       <uui-button slot="toggle" look="secondary">Open dropdown</uui-button>
//       <div
//         style="height: 180px; width: 600px; background-color: blue;"
//       ></div> </uui-dropdown
//   ></uui-button-group>`;

// export const withDropdownInTheMiddle = () =>
//   html`<uui-button-group
//     >${buttons.map(
//       el => html`<uui-button look="secondary">${el}</uui-button>`
//     )}<uui-dropdown>
//       <uui-button slot="toggle" look="secondary">Open dropdown</uui-button>
//       <div
//         style="height: 180px; width: 290px; background-color: blue;"
//       ></div> </uui-dropdown
//     ><uui-dropdown>
//       <uui-button slot="toggle" look="secondary">Open dropdown</uui-button>
//       <div
//         style="height: 180px; width: 600px; background-color: blue;"
//       ></div> </uui-dropdown
//     >${buttons.map(
//       el => html`<uui-button look="secondary">${el}</uui-button>`
//     )}</uui-button-group
//   >`;
//* DO NOT DELETE END!
