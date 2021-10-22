import { html } from 'lit-html';
import '@umbraco-ui/uui-button/lib/index';
// import '../uui-icon/index';
// import '../uui-badge/index';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import { Story } from '@storybook/web-components';

export default {
  title: 'Buttons/Button',
  component: 'uui-button',
  id: 'uui-button',

  args: {
    look: '',
  },
  argTypes: {
    look: {
      options: [
        '',
        'primary',
        'secondary',
        'outline',
        'placeholder',
        'positive',
        'warning',
        'danger',
      ],
      control: { type: 'select' },
    },
    state: {
      options: [null, 'waiting', 'success', 'failed'],
      control: { type: 'select' },
    },
    '--uui-button-height': { control: { type: 'text' } },
    '--uui-button-border-width': { control: { type: 'text' } },
    '--uui-button-border-color': { control: { type: 'color' } },
    '--uui-button-border-radius': { control: { type: 'text' } },
    '--uui-button-font-weight': { control: { type: 'text' } },
    '--uui-button-background-color': { control: { type: 'color' } },
    '--uui-button-background-color-hover': { control: { type: 'color' } },
    '--uui-button-border-color-hover': { control: { type: 'color' } },
    '--uui-button-contrast': { control: { type: 'color' } },
    '--uui-button-contrast-hover': { control: { type: 'color' } },
    '--uui-button-background-color-disabled': { control: { type: 'color' } },
    '--uui-button-contrast-disabled': { control: { type: 'color' } },
  },
};

const cssProps = [
  '--uui-button-height',
  '--uui-button-border-width',
  '--uui-button-border-color',
  '--uui-button-border-radius',
  '--uui-button-font-weight',
  '--uui-button-background-color',
  '--uui-button-background-color-hover',
  '--uui-button-border-color-hover',
  '--uui-button-contrast',
  '--uui-button-contrast-hover',
  '--uui-button-background-color-disabled',
  '--uui-button-contrast-disabled',
];

const reducer = (prev: string, next: string, i: number) =>
  (prev = next ? `${prev}${i === 1 ? ';' : ''} ${next};` : prev);

const Template: Story = props => {
  return html`
    <uui-button
      style="${cssProps
        .map(cssProp => (props[cssProp] ? `${cssProp}: ${props[cssProp]}` : ''))
        .reduce(reducer)}"
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      look=${props.look}
      label=${props.label}
      state=${props.state}
      >${props.content}</uui-button
    >
  `;
};

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.args = { label: 'Basic' };
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-button label="Basic">Basic</uui-button>`,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = { label: 'Disabled', disabled: true };
Disabled.parameters = {
  docs: {
    source: {
      code: `<uui-button label="Disabled" disabled>Disabled</uui-button>`,
    },
  },
};

export const Compact = Template.bind({});
Compact.args = { label: 'Compact', compact: true, look: 'secondary' };
Compact.parameters = {
  docs: {
    source: {
      code: `<uui-button label="Compact" compact>Compact</uui-button>`,
    },
  },
};

function uppercaseFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const Looks: Story = props => html`
  <h5>Default look</h5>
  <uui-button
    ?disabled=${props.disabled}
    ?compact=${props.compact}
    look=${props.look}
    label=${props.label}
    >${props.content}</uui-button
  >
  <h5>Looks</h5>
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html`<uui-button .look=${lookName} style="margin-right:12px;">
        ${uppercaseFirstLetter(lookName)} look
      </uui-button>`
  )}
`;
Looks.args = { label: 'Button' };
Looks.parameters = {
  docs: {
    source: {
      code: `
      <uui-button look="primary">Primary look</uui-button>`,
    },
  },
};

// export const WithIcon = () => html`
//   <uui-button look="danger">
//     <uui-icon .name=${'bug'}></uui-icon>
//   </uui-button>
//   <br />
//   <br />
//   <uui-button look="danger">
//     <uui-icon .name=${'bug'}></uui-icon><span>Hello button with icon</span>
//   </uui-button>
//   <br />
//   <br />
//   <p>
//     For buttons displaying an icon, its important to parse a aria-label
//     attribute to ensure accessibility. The default sixing for a button with just
//     a icon is generally too wide, there please use with the 'compact' attribute.
//   </p>
//   <uui-button look="positive" compact>
//     <uui-icon name="info"></uui-icon>
//   </uui-button>
// `;

// export const WithBadge = () => html` <uui-button look="primary">
//   Button label
//   <uui-badge>!</uui-badge>
// </uui-button>`;
