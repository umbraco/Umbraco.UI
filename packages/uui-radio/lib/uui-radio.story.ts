import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Inputs/Radio',
  component: 'uui-radio',
  id: 'uui-radio',
  args: {
    label: 'label',
    checked: false,
    disabled: false,
  },
  argTypes: {
    slot: { control: { type: 'text' } },
  },
};

export const AAAOverview: Story = props =>
  html`<uui-radio
    .value=${props.value}
    .label=${props.label}
    .name=${props.name}
    ?disabled=${props.disabled}
    ?checked=${props.checked}
    >${props.slot}</uui-radio
  >`;
AAAOverview.storyName = 'Overview';

export const Disabled: Story = props => html` <uui-radio
  value="1"
  ?disabled=${props.disabled}
  >Disabled</uui-radio
>`;

Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  controls: { include: ['disabled'] },
  docs: {
    source: {
      code: `
<uui-radio value="1" disabled>Disabled</uui-radio>
`,
    },
  },
};

export const Checked: Story = props => html` <uui-radio
  value="1"
  ?checked=${props.checked}
  >Checked</uui-radio
>`;

Checked.args = {
  checked: true,
};

Checked.parameters = {
  controls: { include: ['checked'] },
  docs: {
    source: {
      code: `
<uui-radio value="1" checked>Checked</uui-radio>
`,
    },
  },
};

export const RadioGroup: Story = () =>
  html`
    <uui-radio-group name="radioGroup">
      <uui-radio value="1">Option 1</uui-radio>
      <uui-radio value="2" disabled>Option 2</uui-radio>
      <uui-radio value="3">Option 3</uui-radio>
    </uui-radio-group>
  `;

RadioGroup.parameters = {
  controls: { include: [] },
  docs: {
    source: {
      code: `
<uui-radio-group name="radioGroup">
  <uui-radio value="1">Option 1</uui-radio>
  <uui-radio value="2" disabled>Option 2</uui-radio>
  <uui-radio value="3">Option 3</uui-radio>
</uui-radio-group>
`,
    },
  },
};
