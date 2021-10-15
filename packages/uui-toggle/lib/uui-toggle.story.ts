import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toggle/lib/index';

export default {
  title: 'Inputs/Toggle',
  component: 'uui-toggle',
  id: 'uui-toggle',
  args: {
    value: 'toggle',
    name: 'toggle',
    error: false,
    label: 'label',
    labelPosition: 'right',
    disabled: false,
    checked: false,
    hideLabel: false,
    '--uui-toggle-size': '18px',
    '--uui-toggle-switch-width': '36px',
  },
  parameters: {
    controls: {
      exclude: ['change-'],
    },
  },
};

export const AAAOverview: Story = props =>
  html`
    <uui-toggle
      style="--uui-toggle-size: ${props[
        '--uui-toggle-size'
      ]}; --uui-toggle-switch-width: ${props['--uui-toggle-switch-width']};"
      .value=${props.value}
      .name=${props.name}
      .error=${props.error}
      .label=${props.label}
      .labelPosition=${props.labelPosition}
      ?disabled=${props.disabled}
      ?checked=${props.checked}
      ?hide-label=${props.hideLabel}
      >${props.slot}</uui-toggle
    >
  `;
AAAOverview.storyName = 'Overview';

AAAOverview.args = { label: 'label' };
AAAOverview.argTypes = {
  labelPosition: { options: ['left', 'right', 'top', 'bottom'] },
  slot: { control: { type: 'text' } },
  '--uui-toggle-size': { control: { type: 'text' } },
  '--uui-toggle-switch-width': { control: { type: 'text' } },
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-toggle label="label"></uui-toggle>`,
    },
  },
};

export const Error: Story = props =>
  html`
    <uui-toggle ?error=${props.error} label="Error"></uui-toggle><br />
    <uui-toggle ?error=${props.error} label="Error checked" checked></uui-toggle
    ><br /><uui-toggle
      disabled
      ?error=${props.error}
      label="Disabled Error"></uui-toggle
    ><br />
    <uui-toggle
      disabled
      checked
      ?error=${props.error}
      label="Disabled Error Checked"></uui-toggle>
  `;
Error.args = { error: true };
Error.parameters = {
  controls: { include: ['error'] },
  docs: {
    source: {
      code: `<uui-toggle error>Error</uui-toggle>
      <uui-toggle error checked>Error checked</uui-toggle>
      <uui-toggle error disabled>Disabled Error</uui-toggle>
      <uui-toggle error checked disabled>Disabled Error Checked</uui-toggle>`,
    },
  },
};

export const WithSlottedLabel: Story = props =>
  html`
    <uui-toggle label="Toggle label" ?checked=${props.checked} value="toggle"
      >Using <b>Slot</b> for displayed label</uui-toggle
    >
  `;
WithSlottedLabel.parameters = {
  controls: { include: ['checked'] },
  docs: {
    source: {
      code: `<uui-toggle>Using <b>Slot</b> for displayed label</uui-toggle>`,
    },
  },
};

export const LabelPosition: Story = props => html`
  <div
    style="display: grid; grid-template-columns: repeat(4, 128px); align-items: center; justify-items: center">
    <uui-toggle
      ?checked=${props.checked}
      label="Left"
      label-position="left"></uui-toggle>
    <uui-toggle
      ?checked=${props.checked}
      label="Top"
      label-position="top"></uui-toggle>
    <uui-toggle
      ?checked=${props.checked}
      label="Right"
      label-position="right"></uui-toggle>
    <uui-toggle
      ?checked=${props.checked}
      label="Bottom"
      label-position="bottom"></uui-toggle>
  </div>
`;
LabelPosition.parameters = {
  controls: { include: ['checked'] },
  docs: {
    source: {
      code: `  <uui-toggle label="Left" label-position="left"></uui-toggle>
    <uui-toggle label="Top" label-position="top"></uui-toggle>
    <uui-toggle label="Right" label-position="right"></uui-toggle>
    <uui-toggle label="Bottom" label-position="bottom"></uui-toggle>`,
    },
  },
};

export const NoLabel: Story = props =>
  html`
    <uui-toggle
      label="label"
      ?checked=${props.checked}
      ?hide-label=${props.hideLabel}
      value="toggle"></uui-toggle>
  `;
NoLabel.args = {
  hideLabel: true,
};
NoLabel.parameters = {
  controls: { include: ['checked', 'hideLabel'] },
  docs: {
    source: {
      code: `<uui-toggle label="Label" hide-label></uui-toggle>
      `,
    },
  },
};

export const Disabled: Story = props => html`
  <uui-toggle ?disabled=${props.disabled} label="Disabled"></uui-toggle>
  <uui-toggle
    ?disabled=${props.disabled}
    label="Disabled Checked"
    checked></uui-toggle>
`;
Disabled.args = { disabled: true };
Disabled.parameters = {
  controls: { include: ['disabled'] },
  docs: {
    source: {
      code: `<uui-toggle disabled>Disabled</uui-toggle>
      <uui-toggle disabled checked>Disabled</uui-toggle>`,
    },
  },
};
