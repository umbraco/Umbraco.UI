import { html } from 'lit-html';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import '@umbraco-ui/uui-button-group/lib/index';
import { Story } from '@storybook/web-components';
export default {
  title: 'Buttons/Button Group',
  component: 'uui-button-group',
  id: 'uui-button-group',
};

const buttons = ['development', 'staging', 'live'];

export const AAAOverview: Story = () =>
  html`<uui-button-group
    >${buttons.map(
      el => html`<uui-button look="secondary">${el}</uui-button>`
    )}</uui-button-group
  >`;
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: html`<uui-button-group>
        <uui-button look="secondary">development</uui-button>
        <uui-button look="secondary">staging</uui-button>
        <uui-button look="secondary">live</uui-button>
      </uui-button-group>`.strings,
    },
  },
};

function uppercaseFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
export const AllStyles = () => html`
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html` <uui-button-group>
          <uui-button .look=${lookName}>
            ${uppercaseFirstLetter(lookName)} look
          </uui-button>
          <uui-button .look=${lookName}> Second option </uui-button>
          <uui-button .look=${lookName}> Small </uui-button>
          <uui-button .look=${lookName}>
            Large other option
          </uui-button> </uui-button-group
        ><br /><br /><br />`
  )}
`;

export const MixedLooks = () =>
  html`<uui-button-group>
    <uui-button look="primary">Hello</uui-button>
    ${buttons.map(
      el => html`<uui-button look="secondary">${el}</uui-button>`
    )}<uui-button look="danger">World</uui-button></uui-button-group
  >`;
MixedLooks.parameters = {
  docs: {
    source: {
      code: html`<uui-button-group>
        <uui-button look="primary">Hello</uui-button>
        <uui-button>development</uui-button>
        <uui-button>staging</uui-button>
        <uui-button>live</uui-button>
        <uui-button look="danger">World</uui-button>
      </uui-button-group>`.strings,
    },
  },
};

// export const Icon = () =>
// html`<uui-button-group
//   >${buttons.map(
//     () =>
//       html`<uui-button look="secondary"
//         ><uui-icon name="bug"></uui-icon
//       ></uui-button>`
//   )}</uui-button-group
// >`;

// //* DO NOT DELETE START! they will work when dropdown component will come to this branch
// export const withDropdown = () =>
//   html`
//     <uui-button-group>
//       <uui-dropdown same-width position="bottom">
//         <uui-button
//           look="secondary"
//           @click=${(e: any) => {
//             console.log(e);
//             e.target.parentElement.open = !e.target.parentElement.open;
//           }}
//           >Open dropdown</uui-button
//         >
//         <div
//           slot="dropdown"
//           style="height: 180px;  background-color: blue;"></div>
//       </uui-dropdown>

//       ${buttons.map(
//         el => html`<uui-button look="secondary">${el}</uui-button>`
//       )}

//       <uui-dropdown same-width position="bottom">
//         <uui-button
//           look="secondary"
//           @click=${(e: any) => {
//             console.log(e);
//             e.target.parentElement.open = !e.target.parentElement.open;
//           }}
//           >Open dropdown</uui-button
//         >
//         <div slot="dropdown" style="height: 180px; background-color: blue;">
//           <uui-button look="primary">Inside button</uui-button>
//         </div>
//       </uui-dropdown>

//       ${buttons.map(
//         el => html`<uui-button look="secondary">${el}</uui-button>`
//       )}

//       <uui-dropdown same-width position="right">
//         <uui-button
//           look="secondary"
//           @click=${(e: any) => {
//             console.log(e);
//             e.target.parentElement.open = !e.target.parentElement.open;
//           }}
//           >Open dropdown</uui-button
//         >
//         <div
//           slot="dropdown"
//           style="height: 180px;  background-color: blue;"></div>
//       </uui-dropdown>
//     </uui-button-group>
//   `;

// export const withDropdownInTheMiddle = () =>
//   html`
//     <uui-button-group>
//       ${buttons.map(
//         el => html`<uui-button look="secondary">${el}</uui-button>`
//       )}
//       <uui-dropdown same-width position="bottom">
//         <uui-button
//           look="secondary"
//           @click=${(e: any) => {
//             console.log(e);
//             e.target.parentElement.open = !e.target.parentElement.open;
//           }}
//           >Open dropdown</uui-button
//         >
//         <div
//           slot="dropdown"
//           style="height: 180px;  background-color: blue;"></div>
//       </uui-dropdown>
//       <uui-dropdown same-width position="bottom">
//         <uui-button
//           look="secondary"
//           @click=${(e: any) => {
//             console.log(e);
//             e.target.parentElement.open = !e.target.parentElement.open;
//           }}
//           >Open dropdown</uui-button
//         >
//         <div
//           slot="dropdown"
//           style="height: 180px;  background-color: blue;"></div>
//       </uui-dropdown>
//       ${buttons.map(
//         el => html`<uui-button look="secondary">${el}</uui-button>`
//       )}
//     </uui-button-group>
//   `;
// //* DO NOT DELETE END!
