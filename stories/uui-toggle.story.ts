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

export const Error: Story = () =>
  html`
    <uui-toggle error .label=${'Toggle label'} value="bike"></uui-toggle><br />
    <uui-toggle error label="Toggle me" value="bike" checked></uui-toggle
    ><br /><uui-toggle disabled error label="Disabled"></uui-toggle><br />
    <uui-toggle disabled checked error label="Disabled"></uui-toggle>
  `;

export const WithSlottedLabel: Story = props =>
  html`
    <uui-toggle label="Toggle label" value="bike"
      >Using <b>Slot</b> for displayed label</uui-toggle
    >
  `;
WithSlottedLabel.parameters = {
  controls: { include: [] },
};

export const LabelPosition: Story = () => html`
  <div
    style="display: grid; grid-template-columns: repeat(4, 128px); align-items: center; justify-items: center">
    <uui-toggle label="Left" label-position="left"></uui-toggle>
    <uui-toggle label="Top" label-position="top"></uui-toggle>
    <uui-toggle label="Right" label-position="right"></uui-toggle>
    <uui-toggle label="Bottom" label-position="bottom"></uui-toggle>
  </div>
`;

export const NoLabel: Story = () =>
  html`<uui-toggle
    hide-label
    label="Toggle label"
    name="Hidden Label"></uui-toggle>`;

export const Disabled: Story = () => html`
  <uui-toggle disabled label="Disabled"></uui-toggle>
  <uui-toggle disabled label="Disabled &amp; checked" checked></uui-toggle>
`;
