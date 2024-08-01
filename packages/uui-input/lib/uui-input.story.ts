import './uui-input.element';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-icon/lib';

import { Meta, StoryObj } from '@storybook/web-components';
import readme from '../README.md?raw';
import { UUIInputElement } from '@umbraco-ui/uui-input/lib';
import { html } from 'lit';

const meta: Meta<UUIInputElement> = {
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
        'search',
        'month',
        'week',
        'time',
        'date',
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

export default meta;

type Story = StoryObj<UUIInputElement>;

export const AAAOverview: Story = {
  name: 'Overview',
  args: {
    type: 'text',
  },
  parameters: {
    docs: {
      source: {
        code: '<uui-input></uui-input>',
      },
    },
  },
};

export const PatternAndInputmode: Story = {
  render: props => html`
    <uui-input
      .placeholder=${props.placeholder}
      .inputMode=${props.inputMode}
      .pattern=${props.pattern}
      .errorMessage=${props.errorMessage}>
    </uui-input>
  `,
  args: {
    placeholder: 'Enter email',
    inputMode: 'email',
    pattern: '[a-zA-Z0-9_.+\\-]+@[a-zA-Z0-9\\-]+\\.[a-zA-Z0-9\\-.]+',
    errorMessage: 'Not an email',
  },
};

export const MinMaxLength: Story = {
  render: props => html`
    <uui-input
      .minlength=${props.minlength}
      .maxlength=${props.maxlength}
      .minlengthMessage=${props.minlengthMessage}
      .maxlengthMessage=${props.maxlengthMessage}>
    </uui-input>
  `,
  args: {
    minlength: 3,
    maxlength: 4,
    minlengthMessage: 'Minimum 3',
    maxlengthMessage: 'Maximum 4',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-input
          minlength="3"
          maxlength="4"
          minlength-message="Minimum 3"
          maxlength-message="Maximum 4">
        </uui-input>`,
      },
    },
  },
};

export const NumberInput: Story = {
  render: props => html`
    <uui-input
      .type=${props.type}
      .placeholder=${props.placeholder}
      .step=${props.step}
      .min=${props.min}
      .max=${props.max}
      .value=${props.value}>
    </uui-input>
  `,
  args: {
    placeholder: 'Input number',
    type: 'number',
    step: 5,
    value: '10',
    min: -50,
    max: 50,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-input
          type="number"
          value="5"
          label="Label"
          min="-50"
          max="50"
          step="5">
        </uui-input>`,
      },
    },
  },
};

export const DateTimeLocal: Story = {
  render: props => html`
    <uui-input
      .type=${props.type}
      .min=${props.min}
      .max=${props.max}
      .value=${props.value}>
    </uui-input>
  `,
  args: {
    type: 'datetime-local',
    value: '2023-04-20T10:00',
    min: '2023-04-13T10:00',
    max: '2023-04-28T16:00',
  },
  parameters: {
    controls: {
      include: ['type', 'value', 'min', 'max', 'step', 'disabled', 'readonly'],
    },
    docs: {
      source: {
        code: `<uui-input
          type="datetime-local"
          min="2023-04-13T10:00"
          value="2023-04-20T10:00"
          max="2023-04-28T16:00">
        </uui-input>`,
      },
    },
  },
};

export const Disabled: Story = {
  render: props => html`
    <uui-input
      .type=${props.type}
      .value=${props.value}
      ?disabled=${props.disabled}>
    </uui-input>
  `,
  args: { disabled: true, value: 'Disabled' },
  parameters: {
    controls: { include: ['disabled', 'type', 'value'] },
    docs: {
      source: {
        code: `<uui-input disabled></uui-input>`,
      },
    },
  },
};

export const Readonly: Story = {
  render: props => html`
    <uui-input
      .type=${props.type}
      .value=${props.value}
      ?readonly=${props.readonly}>
    </uui-input>
  `,
  args: { readonly: true, value: 'Readonly' },
  parameters: {
    controls: { include: ['readonly', 'type', 'value'] },
    docs: {
      source: {
        code: `<uui-input readonly></uui-input>`,
      },
    },
  },
};

export const Error: Story = {
  render: props => html`
    <uui-input
      .type=${props.type}
      .label=${props.label}
      .value=${props.value}
      ?error=${props.error}>
    </uui-input>
  `,
  args: { error: true, label: 'Error' },
  parameters: {
    controls: { include: ['error', 'type', 'value'] },
    docs: {
      source: {
        code: `<uui-input error></uui-input>`,
      },
    },
  },
};

export const PrependAndAppend: Story = {
  render: props => html`
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
  `,
};

export const PrependIcon: Story = {
  render: props =>
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
    </uui-input>`,
};

export const AppendIcon: Story = {
  render: props =>
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
    </uui-input>`,
};

export const MultipleInputs: Story = {
  render: props => html`
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
  `,
};

export const AutoWidth: Story = {
  render: props =>
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
        ?auto-width=${props.autoWidth}>
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
        ?auto-width=${props.autoWidth}>
        <uui-input
          slot="prepend"
          placeholder="Prepend auto-width"
          ?auto-width=${props.autoWidth}>
        </uui-input>
        <uui-input slot="append" placeholder="Append auto-width false">
        </uui-input>
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
        style="--auto-width-text-margin-right: 50px"
        placeholder="--auto-width-text-margin-right: 50px"
        .value=${props.value}
        ?auto-width=${props.autoWidth}>
      </uui-input>`,
  args: {
    autoWidth: true,
    placeholder: 'Start typing...',
  },
};
