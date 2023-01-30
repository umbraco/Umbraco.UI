import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-input/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

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
};

const Template: Story = props =>
  html`
    <uui-input
      .disabled=${props.disabled}
      .readonly=${props.readonly}
      .error=${props.error}
      .label=${props.label}
      .type=${props.type}
      .name=${props.name}
      .placeholder=${props.placeholder}
      .value=${props.value}></uui-input>
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

export const PrependAndAppend: Story = props =>
  html`
    <uui-input
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

export const MultipleInputs: Story = props =>
  html`
    <uui-input
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
