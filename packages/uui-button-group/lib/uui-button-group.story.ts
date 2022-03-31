import '.';

import { Story } from '@storybook/web-components';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import { html } from 'lit-html';

export default {
  title: 'Buttons/Button Group',
  component: 'uui-button-group',
  id: 'uui-button-group',
  args: {
    look: '',
  },
  argTypes: {
    look: {
      control: {
        type: 'select',
      },
      options: InterfaceLookNames,
    },
  },
};

export const AAAOverview: Story = props => html`
  <uui-button-group>
    <uui-button look="${props.look}" label="Button 1"></uui-button>
    <uui-button look="${props.look}" label="Button 2"></uui-button>
    <uui-button look="${props.look}" label="Button 3"></uui-button>
    <uui-button look="${props.look}" label="Button 4"></uui-button>
  </uui-button-group>
`;

AAAOverview.storyName = 'Overview';

export const Looks = () => html`
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html` <div>${lookName}</div>
        <uui-button-group>
          <uui-button .look=${lookName} label="Button 1"></uui-button>
          <uui-button .look=${lookName} label="Button 2"></uui-button>
          <uui-button .look=${lookName} label="Button 3"></uui-button>
          <uui-button
            .look=${lookName}
            label="Button 4"></uui-button> </uui-button-group
        ><br /><br />`
  )}
`;

Looks.parameters = {
  controls: { disable: true },
  docs: {
    source: {
      code: `
<uui-button-group>
  <uui-button look="[look]">Button 1</uui-button>
  <uui-button look="[look]">Button 2</uui-button>
  <uui-button look="[look]">Button 3</uui-button>
  <uui-button look="[look]">Button 4</uui-button>
</uui-button-group>`,
    },
  },
};

export const MixedLooks = () =>
  html`<uui-button-group>
    <uui-button look="outline" label="Button 1"></uui-button>
    <uui-button look="outline" label="Button 2"></uui-button>
    <uui-button look="outline" label="Button 3"></uui-button>
    <uui-button look="danger" label="Button 4"></uui-button>
  </uui-button-group>`;

MixedLooks.parameters = {
  controls: { disable: true },
  docs: {
    source: {
      code: `
<uui-button-group>
  <uui-button look="outline">Button 1</uui-button>
  <uui-button look="outline">Button 2</uui-button>
  <uui-button look="outline">Button 3</uui-button>
  <uui-button look="danger">Button 4</uui-button>
</uui-button-group>`,
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
