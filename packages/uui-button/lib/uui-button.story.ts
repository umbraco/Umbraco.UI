import '.';
import '@umbraco-ui/uui-badge/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-loader-circle/lib';

import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';
import { UUIButtonElement } from './uui-button.element';

import readme from '../README.md?raw';

export default {
  title: 'Buttons/Button',
  component: 'uui-button',
  id: 'uui-button',

  args: {
    href: undefined,
    target: undefined,
    rel: undefined,
    look: 'default',
    color: 'default',
    type: undefined,
    label: 'Button',
    state: undefined,
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
    type: {
      options: ['', 'submit', 'button', 'reset'],
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
    '--uui-button-font-size': { control: { type: 'text' } },
    '--uui-button-font-weight': { control: { type: 'text' } },
    '--uui-button-background-color': { control: { type: 'color' } },
    '--uui-button-background-color-hover': { control: { type: 'color' } },
    '--uui-button-border-color-hover': { control: { type: 'color' } },
    '--uui-button-contrast': { control: { type: 'color' } },
    '--uui-button-contrast-hover': { control: { type: 'color' } },
    '--uui-button-background-color-disabled': { control: { type: 'color' } },
    '--uui-button-contrast-disabled': { control: { type: 'color' } },
    '--uui-button-content-align': {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
} as Meta<UUIButtonElement>;

const cssProps = [
  '--uui-button-height',
  '--uui-button-border-width',
  '--uui-button-border-color',
  '--uui-button-border-radius',
  '--uui-button-font-size',
  '--uui-button-font-weight',
  '--uui-button-background-color',
  '--uui-button-background-color-hover',
  '--uui-button-border-color-hover',
  '--uui-button-contrast',
  '--uui-button-contrast-hover',
  '--uui-button-background-color-disabled',
  '--uui-button-contrast-disabled',
  '--uui-button-content-align',
];

const reducer = (prev: string, next: string, i: number) =>
  (prev = next ? `${prev}${i === 1 ? ';' : ''} ${next};` : prev);

const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];
const colors = ['default', 'positive', 'warning', 'danger'];

const Template: Story = props => {
  return html`
    <uui-button
      type=${props.type}
      style=${cssProps
        .map(cssProp => (props[cssProp] ? `${cssProp}: ${props[cssProp]}` : ''))
        .reduce(reducer)}
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      .state=${props.state}
      .href=${props.href}
      .target=${props.target}
      .rel=${props.rel}
      look=${props.look}
      color=${props.color}
      label=${props.label}
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
      type: 'dynamic',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = { label: 'Disabled', disabled: true, look: 'primary' };
Disabled.parameters = {
  docs: {
    source: {
      code: `<uui-button label="Disabled" disabled></uui-button>`,
    },
  },
};

export const WithBadge: Story = props => {
  return html`
    <uui-button
      type=${props.type}
      style=${cssProps
        .map(cssProp => (props[cssProp] ? `${cssProp}: ${props[cssProp]}` : ''))
        .reduce(reducer)}
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      look=${props.look}
      color=${props.color}
      label=${props.label}
      state=${props.state}>
      <uui-badge color="danger">2</uui-badge>
      I have a badge
    </uui-button>

    <br /><br />

    <uui-button
      type=${props.type}
      style=${cssProps
        .map(cssProp => (props[cssProp] ? `${cssProp}: ${props[cssProp]}` : ''))
        .reduce(reducer)}
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      look=${props.look}
      color=${props.color}
      label=${props.label}
      state=${props.state}>
      <uui-badge color="danger" attention>!</uui-badge>
      My badge requires attention
    </uui-button>
  `;
};
WithBadge.args = { look: 'primary' };
WithBadge.parameters = {
  docs: {
    source: {
      code: `<uui-button><uui-badge slot="extra" label="A11Y label">!</uui-badge>I can have badge</uui-button>`,
    },
  },
};

export const Compact = Template.bind({});
Compact.args = { label: 'Compact', compact: true, look: 'secondary' };
Compact.parameters = {
  docs: {
    source: {
      code: `<uui-button label="Compact" compact></uui-button>`,
    },
  },
};

export const ContentAndLabel = Template.bind({});
ContentAndLabel.args = { label: 'A11Y Label', content: 'Visual Label' };
ContentAndLabel.parameters = {
  docs: {
    source: {
      code: `<uui-button label="A11Y Label">Visual Label</uui-button>`,
    },
  },
};

export const Sizing: Story = props => {
  return html`
    <uui-button
      style="font-size: 9px;"
      type=${props.type}
      look=${props.look}
      color=${props.color}
      state=${props.state}
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      label=${props.label}></uui-button>
    <uui-button
      style="font-size: 12px;"
      type=${props.type}
      look=${props.look}
      color=${props.color}
      state=${props.state}
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      label=${props.label}></uui-button>
    <uui-button
      style="font-size: 15px;"
      type=${props.type}
      look=${props.look}
      color=${props.color}
      state=${props.state}
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      label=${props.label}></uui-button>
  `;
};
Sizing.args = {
  label: 'Controlled by font-size',
  compact: false,
  look: 'primary',
};
Sizing.parameters = {
  docs: {
    source: {
      code: `<uui-button style="font-size: 15px;">I can be controlled by font-size.</uui-button>`,
    },
  },
};

function uppercaseFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const LooksAndColors: Story = props => html`
  <h4>Default look</h4>
  <uui-button
    type=${props.type}
    ?disabled=${props.disabled}
    ?compact=${props.compact}
    look=${props.look}
    color=${props.color}
    label=${props.label}
    >${props.content}</uui-button
  >
  <h4>Looks and colors</h4>
  ${colors.map(
    color => html`
      <h5>${uppercaseFirstLetter(color)}</h5>
      <div style="margin-bottom: 32px">
        ${looks.map(
          look =>
            html` <uui-button
              type=${props.type}
              .look=${look as any}
              .color=${color as any}
              label="Button displaying the ${uppercaseFirstLetter(look)} look"
              state=${props.state}
              ?disabled=${props.disabled}
              ?compact=${props.compact}
              style="margin-right:12px;"
              >${uppercaseFirstLetter(look)}</uui-button
            >`,
        )}
      </div>
    `,
  )}
`;
LooksAndColors.args = { label: 'Button', look: 'default', color: 'default' };
LooksAndColors.parameters = {
  docs: {
    source: {
      code: `
      <uui-button look="primary">Primary look</uui-button>`,
    },
  },
};

export const WithIcon = () => html`
  <uui-icon-registry-essential>
    <uui-button look="primary" color="danger" label="A11Y proper label">
      <uui-icon .name=${'favorite'}></uui-icon>
    </uui-button>
    <br />
    <br />
    <uui-button look="primary" color="danger" label="A11Y proper label">
      <uui-icon .name=${'favorite'}></uui-icon>Button with icon
    </uui-button>
    <br />
    <br />
    <p>
      The default sizing for a button with only an icon is generally too wide,
      there please use with the 'compact' attribute.
    </p>
    <uui-button
      look="primary"
      color="positive"
      compact
      label="A11Y proper label">
      <uui-icon name="favorite"></uui-icon>
    </uui-button>
  </uui-icon-registry-essential>
`;
WithIcon.parameters = {
  docs: {
    source: {
      code: `
      <uui-button look="primary" label="A11Y proper label"><uui-icon name="alert"></uui-icon>Button Label</uui-button>`,
    },
  },
};

export const WaitingState = Template.bind({});
WaitingState.args = { state: 'waiting' };
WaitingState.parameters = {
  docs: {
    source: {
      code: `
      <uui-button state="waiting" label="A11Y proper label">Loading button</uui-button>`,
    },
  },
  chromatic: { disableSnapshot: true },
};

export const AnchorTag = Template.bind({});
AnchorTag.args = {
  href: 'https://www.umbraco.com',
  target: '_blank',
  rel: 'noopener noreferrer',
  look: 'primary',
};
AnchorTag.parameters = {
  docs: {
    source: {
      code: html`
        <uui-button
          look="primary"
          label="Open umbraco.com"
          href="http://www.umbraco.com"
          target="_blank"
          rel="noopener noreferrer">
        </uui-button>
      `.strings,
    },
  },
};

export const MultiLine: Story = props => {
  return html`
    <uui-button
      type=${props.type}
      style=${cssProps
        .map(cssProp => (props[cssProp] ? `${cssProp}: ${props[cssProp]}` : ''))
        .reduce(reducer)}
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      look=${props.look}
      color=${props.color}
      label=${props.label}
      state=${props.state}
      href=${props.href}
      target=${props.target}
      >Hello <br />
      I am button</uui-button
    >
    <br /><br />
    <uui-button
      type=${props.type}
      style=${cssProps
        .map(cssProp => (props[cssProp] ? `${cssProp}: ${props[cssProp]}` : ''))
        .reduce(reducer)}
      ?disabled=${props.disabled}
      ?compact=${props.compact}
      look=${props.look}
      color=${props.color}
      label=${props.label}
      state=${props.state}
      href=${props.href}
      target=${props.target}>
      <uui-badge color="danger">2</uui-badge>
      Hello <br />
      I am button
    </uui-button>
    <br /><br />
    <uui-button
      type=${props.type}
      style=${cssProps
        .map(cssProp => (props[cssProp] ? `${cssProp}: ${props[cssProp]}` : ''))
        .reduce(reducer)}
      ?disabled=${props.disabled}
      compact
      look=${props.look}
      color=${props.color}
      label=${props.label}
      state=${props.state}
      href=${props.href}
      target=${props.target}>
      Hi <br />
      I am compact
    </uui-button>
    <br /><br />
    <uui-icon-registry-essential>
      <uui-button
        type=${props.type}
        style=${cssProps
          .map(cssProp =>
            props[cssProp] ? `${cssProp}: ${props[cssProp]}` : '',
          )
          .reduce(reducer)}
        ?disabled=${props.disabled}
        ?compact=${props.compact}
        look=${props.look}
        color=${props.color}
        label=${props.label}
        state=${props.state}
        href=${props.href}
        target=${props.target}>
        <uui-icon .name=${'favorite'}></uui-icon>
        <br />Home
      </uui-button>
    </uui-icon-registry-essential>
  `;
};

MultiLine.args = { look: 'primary' };

export const ContentAlignment: Story = props => html`
  <uui-button
    style="max-width: 400px; width: 100%;
      --uui-button-content-align: ${props['--uui-button-content-align']}"
    look="primary"
    color="danger"
    label="A11Y proper label">
    Content alignment
  </uui-button>
`;
ContentAlignment.args = { '--uui-button-content-align': 'left' };
ContentAlignment.parameters = {
  controls: { include: ['--uui-button-content-align'] },
  docs: {
    source: {
      code: `
<uui-button style="max-width: 400px; width: 100%; --uui-button-content-align: left}"
  look="primary"
  color="danger"
  label="A11Y proper label">
  Content alignment
</uui-button>
      `,
    },
  },
};
