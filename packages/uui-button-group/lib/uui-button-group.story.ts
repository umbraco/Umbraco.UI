import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Buttons/Button Group',
  component: 'uui-button-group',
  id: 'uui-button-group',
  args: {
    look: 'secondary',
    color: 'primary',
  },
  argTypes: {
    look: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'positive', 'warning', 'danger'],
    },
  },
};

const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];
const colors = ['default', 'positive', 'warning', 'danger'];

export const AAAOverview: Story = props => html`
  <uui-button-group>
    <uui-button
      look="${props.look}"
      color="${props.color}"
      label="Button 1"></uui-button>
    <uui-button
      look="${props.look}"
      color="${props.color}"
      label="Button 2"></uui-button>
    <uui-button
      look="${props.look}"
      color="${props.color}"
      label="Button 3"></uui-button>
    <uui-button
      look="${props.look}"
      color="${props.color}"
      label="Button 4"></uui-button>
  </uui-button-group>
`;

AAAOverview.storyName = 'Overview';

export const MixedLooksAndColors = () => html`
  ${colors.map(
    color => html`
      <div style="margin-bottom: 32px">
        <h4>${color}</h4>
        <uui-button-group>
          ${looks.map(
            look => html`<uui-button color=${color as any} look=${look as any}>
              ${look}
            </uui-button>`
          )}
        </uui-button-group>
      </div>
    `
  )}
`;

MixedLooksAndColors.parameters = {
  controls: { disable: true },
  docs: {
    source: {
      code: `
<uui-button-group>
  <uui-button look="[look]" color="[color]>Button 1</uui-button>
  <uui-button look="[look]" color="[color]>Button 2</uui-button>
  <uui-button look="[look]" color="[color]>Button 3</uui-button>
  <uui-button look="[look]" color="[color]>Button 4</uui-button>
</uui-button-group>`,
    },
  },
};

export const LooksAndColors = () => html`
  ${colors.map(
    color => html`
      <div style="margin-bottom: 32px; display: block">
        <h4>${color}</h4>
        ${looks.map(
          look => html`
            <uui-button-group style="margin-bottom: 16px;">
              <uui-button
                label="Button 1"
                color=${color as any}
                look=${look as any}></uui-button>
              <uui-button
                label="Button 2"
                color=${color as any}
                look=${look as any}></uui-button>
              <uui-button
                label="Button 3"
                color=${color as any}
                look=${look as any}></uui-button>
              <uui-button
                label="Button 4"
                color=${color as any}
                look=${look as any}></uui-button> </uui-button-group
            ><br />
          `
        )}
      </div>
    `
  )}
`;

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
