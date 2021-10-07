import { html } from 'lit-html';
import '@umbraco-ui/uui-checkbox/lib/index';
import { Story } from '@storybook/web-components';

export default {
  title: 'Inputs/Checkbox',
  component: 'uui-checkbox',
  args: {
    value: 'toggle',
    name: 'toggle',
    error: false,
    label: 'label',
    labelPosition: 'right',
    disabled: false,
    checked: false,
    'hide-label': false,
    '--uui-checkbox-size': '18px',
  },
  parameters: {
    controls: {
      exclude: ['change'],
    },
  },
};

export const Overview: Story = props =>
  html`
    <uui-checkbox
      style="--uui-checkbox-size: ${props['--uui-checkbox-size']}"
      .value=${props.value}
      .name=${props.name}
      .error=${props.error}
      .label=${props.label}
      .labelPosition=${props.labelPosition}
      ?disabled=${props.disabled}
      ?checked=${props.checked}
      ?hide-label=${props['hide-label']}
      >${props.slot}</uui-checkbox
    >
  `;
Overview.args = { label: 'label' };
Overview.argTypes = {
  labelPosition: {
    options: ['left', 'right', 'top', 'bottom'],
    control: 'select',
  },
  slot: { control: { type: 'text' } },
  '--uui-checkbox-size': { control: { type: 'text' } },
};

export const Error: Story = props => html`
  <uui-checkbox .label=${'Checkbox label'} ?error=${props.error}></uui-checkbox>
  <uui-checkbox
    ?error=${props.error}
    .label=${'Checkbox label'}
    style="margin-left: 20px;"
    checked></uui-checkbox>
  <uui-checkbox
    disabled
    .label=${'Checkbox label'}
    ?error=${props.error}></uui-checkbox>
  <uui-checkbox
    ?error=${props.error}
    disabled
    .label=${'Checkbox label'}
    style="margin-left: 20px;"
    checked></uui-checkbox>
`;
Error.args = { error: true };
Error.parameters = {
  controls: { include: ['error'] },
};

export const WithSlottedLabel: Story = props =>
  html`
    <uui-checkbox
      .label=${'Checkbox label'}
      ?checked=${props.checked}
      value="checkbox"
      >Using <b>Slot</b> for displayed label
    </uui-checkbox>
  `;
WithSlottedLabel.parameters = {
  controls: { include: ['checked'] },
};

export const LabelPosition: Story = props => html`
  <div
    style="display: grid; grid-template-columns: repeat(4, 128px); align-items: center; justify-items: center">
    <uui-checkbox
      ?checked=${props.checked}
      .label=${'left'}
      label-position="left"></uui-checkbox>
    <uui-checkbox
      ?checked=${props.checked}
      .label=${'top'}
      label-position="top"></uui-checkbox>
    <uui-checkbox
      ?checked=${props.checked}
      .label=${'right'}
      label-position="right"></uui-checkbox>
    <uui-checkbox
      ?checked=${props.checked}
      .label=${'bottom'}
      label-position="bottom"></uui-checkbox>
  </div>
`;
LabelPosition.parameters = {
  controls: { include: ['checked'] },
};

export const NoLabel: Story = props =>
  html`<uui-checkbox
    label="label"
    ?checked=${props.checked}
    ?hide-label=${props['hide-label']}
    value="checkbox"></uui-checkbox>`;
NoLabel.args = {
  'hide-label': true,
};
NoLabel.parameters = {
  controls: { include: ['checked', 'hide-label'] },
};

export const Disabled: Story = props => html`
  <uui-checkbox
    ?disabled=${props.disabled}
    .label=${'Checkbox label'}></uui-checkbox>
  <uui-checkbox
    ?disabled=${props.disabled}
    .label=${'Checkbox label'}
    style="margin-left: 20px;"
    checked></uui-checkbox>
`;
Disabled.args = { disabled: true };
Disabled.parameters = {
  controls: { include: ['disabled'] },
};
