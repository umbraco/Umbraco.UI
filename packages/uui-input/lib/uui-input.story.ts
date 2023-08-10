import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-icon/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Inputs/Input',
  component: 'uui-input',
  id: 'uui-input',
  args: {
    disabled: false,
    readonly: false,
    value: '',
    label: 'Label',
    placeholder: 'Placeholder',
  },
  argTypes: {
    type: {
      options: [
        'text',
        'tel',
        'url',
        'email',
        'password',
        'date',
        'month',
        'week',
        'time',
        'datetime-local',
        'number',
        'color',
      ],
    },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

const Template: Story = props => html`
  <uui-input
    .min=${props.min}
    .max=${props.max}
    .step=${props.step}
    .disabled=${props.disabled}
    .readonly=${props.readonly}
    .error=${props.error}
    .label=${props.label}
    .type=${props.type}
    .name=${props.name}
    .placeholder=${props.placeholder}
    .value=${props.value}
    .spellcheck=${props.spellcheck}
    .autocomplete=${props.autocomplete}
    .pattern=${props.pattern}
    .errorMessage=${props.errorMessage}
    .inputmode=${props.inputmode}
    .minlength=${props.minlength}
    .maxlength=${props.maxlength}
    .minlength-message=${props.minlengthMessage}
    .maxlength-message=${props.maxlengthMessage}></uui-input>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

AAAOverview.args = { type: 'text' };

AAAOverview.parameters = {
  docs: {
    source: {
      code: '<uui-input></uui-input>',
    },
  },
};

export const PatternAndInputmode: Story = props =>
  html`Enter Email<br />
    <uui-input
      label="Email"
      error-message=${props.errorMessage}
      inputmode=${props.inputmode}
      pattern=${props.pattern}></uui-input>`;

PatternAndInputmode.args = {
  pattern: '[a-zA-Z0-9_.+\\-]+@[a-zA-Z0-9\\-]+\\.[a-zA-Z0-9\\-.]+',
  inputmode: 'email',
  errorMessage: 'Not an email',
};

export const MinMaxLength = Template.bind({});
MinMaxLength.args = {
  minlength: 3,
  maxlength: 4,
  minlengthMessage: 'Minimum 3',
  maxlengthMessage: 'Maximum 4',
};
MinMaxLength.parameters = {
  docs: {
    source: {
      code: html`<uui-input
        minlength="3"
        maxlength="4"
        minlength-message="Minimum 3"
        maxlength-message="Maximum 4"></uui-input>`.strings,
    },
  },
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  placeholder: 'Input number',
  type: 'number',
  step: 5,
  value: '10',
  min: -50,
  max: 50,
};
NumberInput.parameters = {
  controls: {
    include: [
      'type',
      'value',
      'label',
      'min',
      'max',
      'step',
      'disabled',
      'readonly',
    ],
  },
  docs: {
    source: {
      code: html` <uui-input
        type="number"
        value="5"
        label="Label"
        min="-50"
        max="50"
        step="5">
      </uui-input>`.strings,
    },
  },
};

export const DateTimeLocal = Template.bind({});
DateTimeLocal.args = {
  type: 'datetime-local',
  value: '2023-04-20T10:00',
  min: '2023-04-13T10:00',
  max: '2023-04-28T16:00',
};
DateTimeLocal.parameters = {
  controls: {
    include: ['type', 'value', 'min', 'max', 'step', 'disabled', 'readonly'],
  },
  docs: {
    source: {
      code: html` <uui-input
        type="datetime-local"
        min="2023-04-13T10:00"
        value="2023-04-20T10:00"
        max="2023-04-28T16:00">
      </uui-input>`.strings,
    },
  },
};

export const Label = Template.bind({});
Label.args = { type: 'text' };
Label.parameters = {
  controls: { include: ['type', 'value', 'label'] },
  docs: {
    source: {
      code: html`<uui-input label="Label"></uui-input>`.strings,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
Disabled.parameters = {
  controls: { include: ['disabled', 'type', 'value'] },
  docs: {
    source: {
      code: html`<uui-input disabled></uui-input>`.strings,
    },
  },
};

export const Error = Template.bind({});
Error.args = { error: true, label: 'Error' };
Error.parameters = {
  controls: { include: ['error', 'type', 'value'] },
  docs: {
    source: {
      code: html`<uui-input error></uui-input>`.strings,
    },
  },
};

export const PrependAndAppend: Story = props => html`
  <uui-input
    .min=${props.min}
    .max=${props.max}
    .step=${props.step}
    .disabled=${props.disabled}
    .readonly=${props.readonly}
    .error=${props.error}
    .label=${props.label}
    .type=${props.type}
    .name=${props.name}
    .placeholder=${props.placeholder}
    .value=${props.value}>
    <div
      style="
        user-select:none;
        height: 100%;
        padding: 0 var(--uui-size-3);
        border-right: 1px solid
          var(--uui-input-border-color, var(--uui-color-border));
        background: #f3f3f3;
        color: grey;
        display: flex;
        justify-content: center;
        align-items: center;"
      slot="prepend">
      umbraco@
    </div>
    <div
      slot="append"
      style="
        user-select:none;
        height: 100%;
        padding: 0 var(--uui-size-space-3);
        border-left: 1px solid
          var(--uui-input-border-color, var(--uui-color-border));
        background: #f3f3f3;
        color: grey;
        display: flex;
        justify-content: center;
        align-items: center;">
      .com
    </div>
  </uui-input>
`;

export const PrependIcon: Story = props =>
  html` <uui-input
    .min=${props.min}
    .max=${props.max}
    .step=${props.step}
    .disabled=${props.disabled}
    .readonly=${props.readonly}
    .error=${props.error}
    .label=${props.label}
    .type=${props.type}
    .name=${props.name}
    .placeholder=${props.placeholder}
    .value=${props.value}>
    <div slot="prepend">
      <uui-icon-registry-essential>
        <uui-icon name="search"></uui-icon>
      </uui-icon-registry-essential>
    </div>
  </uui-input>`;

export const AppendIcon: Story = props =>
  html` <uui-input
    .min=${props.min}
    .max=${props.max}
    .step=${props.step}
    .disabled=${props.disabled}
    .readonly=${props.readonly}
    .error=${props.error}
    .label=${props.label}
    .type=${props.type}
    .name=${props.name}
    .placeholder=${props.placeholder}
    .value=${props.value}>
    <div
      slot="append"
      style="background:#f3f3f3; padding-left:var(--uui-size-2, 6px)">
      <uui-icon-registry-essential>
        <uui-icon name="delete"></uui-icon>
      </uui-icon-registry-essential>
    </div>
  </uui-input>`;

export const MultipleInputs: Story = props => html`
  <uui-input
    .min=${props.min}
    .max=${props.max}
    .step=${props.step}
    .disabled=${props.disabled}
    .readonly=${props.readonly}
    .error=${props.error}
    .label=${props.label}
    .type=${props.type}
    .name=${props.name}
    .placeholder=${props.placeholder}
    .value=${props.value}>
    <uui-input
      slot="prepend"
      placeholder="+45"
      style="text-align:right; width: 60px;">
    </uui-input>
    <uui-input slot="append" placeholder="(extra)" style="width: 100px;">
    </uui-input>
  </uui-input>
`;

export const AutoWidth: Story = props =>
  html`<uui-input
      .min=${props.min}
      .max=${props.max}
      .step=${props.step}
      .disabled=${props.disabled}
      .readonly=${props.readonly}
      .error=${props.error}
      .label=${props.label}
      .type=${props.type}
      .name=${props.name}
      .placeholder=${props.placeholder}
      .value=${props.value}
      auto-width>
    </uui-input>
    <br /><br />
    <uui-input
      .min=${props.min}
      .max=${props.max}
      .step=${props.step}
      .disabled=${props.disabled}
      .readonly=${props.readonly}
      .error=${props.error}
      .label=${props.label}
      .type=${props.type}
      .name=${props.name}
      .placeholder=${props.placeholder}
      .value=${props.value}
      auto-width>
      <uui-input
        slot="prepend"
        placeholder="Prepend auto-width"
        auto-width></uui-input>
      <uui-input
        slot="append"
        placeholder="Append auto-width false"></uui-input>
    </uui-input>`;

AutoWidth.args = { placeholder: 'Start typing...' };
