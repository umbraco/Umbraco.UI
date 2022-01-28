import '../define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Inputs/Checkbox',
  component: 'uui-checkbox',
  id: 'uui-checkbox',
  args: {
    value: 'toggle',
    name: 'toggle',
    error: false,
    label: 'label',
    labelPosition: 'right',
    disabled: false,
    checked: false,
    '--uui-checkbox-size': '18px',
  },
  parameters: {
    controls: {
      exclude: ['change'],
    },
    docs: {
      source: {
        code: `<uui-checkbox label="Checkbox"></uui-checkbox>`,
      },
    },
  },
};

export const AAAOverview: Story = props =>
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
      >${props.slot}</uui-checkbox
    >
  `;
AAAOverview.args = { label: 'label' };
AAAOverview.storyName = 'Overview';

AAAOverview.argTypes = {
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
  docs: {
    source: {
      code: `<uui-checkbox label="Checkbox" error></uui-checkbox>`,
    },
  },
};

export const WithSlottedLabel: Story = props =>
  html`
    <uui-checkbox
      .label=${'Checkbox label'}
      ?checked=${props.checked}
      value="checkbox"
      >Using <b>Slot</b> to display label
    </uui-checkbox>
  `;
WithSlottedLabel.parameters = {
  controls: { include: ['checked'] },
  docs: {
    source: {
      code: `<uui-checkbox>Using <b>Slot</b> to display label</uui-checkbox>`,
    },
  },
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
  docs: {
    source: {
      code: `
      <uui-checkbox label-position="left"></uui-checkbox>
      <uui-checkbox label-position="top"></uui-checkbox>
      <uui-checkbox label-position="right"></uui-checkbox>
      <uui-checkbox label-position="bottom"></uui-checkbox>
      `,
    },
  },
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
  docs: {
    source: {
      code: `<uui-checkbox label="Checkbox label" disabled></uui-checkbox>`,
    },
  },
};
