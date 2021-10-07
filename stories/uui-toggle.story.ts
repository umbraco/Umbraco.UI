import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toggle/lib/index';

export default {
  title: 'Inputs/Toggle',
  component: 'uui-toggle',
  args: {
    value: 'toggle',
    name: 'toggle',
    error: false,
    label: 'label',
    labelPosition: 'right',
    disabled: false,
    checked: false,
    'hide-label': false,
    '--uui-toggle-size': '18px',
    '--uui-toggle-switch-width': '36px',
  },
  parameters: {
    controls: {
      exclude: ['formAssociated', 'change-'],
    },
  },
};

export const Overview: Story = props =>
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
      ?hide-label=${props['hide-label']}
      >${props.slot}</uui-toggle
    >
  `;
Overview.storyName = 'Overview';
Overview.args = { label: 'I am a label' };
Overview.argTypes = {
  labelPosition: { options: ['left', 'right', 'top', 'bottom'] },
  slot: { control: { type: 'text' } },
  '--uui-toggle-size': { control: { type: 'text' } },
  '--uui-toggle-switch-width': { control: { type: 'text' } },
};

export const Error: Story = props =>
  html`
    <uui-toggle
      ?error=${props.error}
      .label=${'Toggle label'}
      value="toggle"></uui-toggle
    ><br />
    <uui-toggle
      ?error=${props.error}
      label="Toggle me"
      value="toggle"
      checked></uui-toggle
    ><br /><uui-toggle
      disabled
      ?error=${props.error}
      label="Disabled"></uui-toggle
    ><br />
    <uui-toggle
      disabled
      checked
      ?error=${props.error}
      label="Disabled"></uui-toggle>
  `;
Error.args = { error: true };
Error.parameters = {
  controls: { include: ['error'] },
};

export const WithSlottedLabel: Story = props =>
  html`
    <uui-toggle label="Toggle label" ?checked=${props.checked} value="toggle"
      >Using <b>Slot</b> for displayed label</uui-toggle
    >
  `;
WithSlottedLabel.parameters = {
  controls: { include: ['checked'] },
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
};

export const NoLabel: Story = props =>
  html`
    <uui-toggle
      label="Toggle label"
      ?checked=${props.checked}
      ?hide-label=${props['hide-label']}
      value="toggle"></uui-toggle>
  `;
NoLabel.parameters = {
  controls: { include: ['checked', 'hide-label'] },
};

export const Disabled: Story = props => html`
  <uui-toggle ?disabled=${props.disabled} label="Disabled"></uui-toggle>
  <uui-toggle
    ?disabled=${props.disabled}
    label="Disabled &amp; checked"
    checked></uui-toggle>
`;
Disabled.args = { disabled: true };
Disabled.parameters = {
  controls: { include: ['disabled'] },
};
