import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-textarea/lib/index';

export default {
  id: 'uui-textarea',
  title: 'Inputs/Textarea',
  component: 'uui-textarea',
  args: {
    value: '',
  },
};

export const AAAOverview: Story = props =>
  html`<uui-textarea
    .label=${props.label}
    ?auto-height=${props.autoHeight}
    .minLength=${props.minLength}
    .maxLength=${props.maxLength}
    .minHeight=${props.minHeight}
    .maxHeight=${props.maxHeight}
    .placeholder=${props.placeholder}
    ?disabled=${props.disabled}
    .name=${props.name}
    .error=${props.error}
    .value=${props.value}
    ?hide-label=${props.hideLabel}></uui-textarea>`;

AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  label: 'Label',
  maxLength: 200,
  minHeight: '100px',
  maxHeight: '200px',
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-textarea label="Label"></uui-textarea>`,
    },
  },
};

export const MaxLength: Story = props =>
  html`<uui-textarea
    label="textarea"
    maxLength=${props.maxLength}></uui-textarea>`;

MaxLength.args = { maxLength: 20 };
MaxLength.parameters = {
  controls: { include: ['maxLength'] },
  docs: {
    source: {
      code: `<uui-textarea label="textarea" maxLength="20"></uui-textarea>`,
    },
  },
};

export const Disabled: Story = props =>
  html`<uui-textarea label="Label" ?disabled=${props.disabled}></uui-textarea>`;

Disabled.args = { disabled: true };
Disabled.parameters = {
  controls: { include: ['disabled'] },
  docs: {
    source: {
      code: `<uui-textarea label="Label" disabled></uui-textarea>`,
    },
  },
};

export const Placeholder: Story = props =>
  html`<uui-textarea
    label="Label"
    placeholder=${props.placeholder}></uui-textarea>`;

Placeholder.args = { placeholder: 'I am a placeholder...' };
Placeholder.parameters = {
  controls: { include: ['placeholder'] },
  docs: {
    source: {
      code: `<uui-textarea
      label="Label"
      placeholder="I am a placeholder..."></uui-textarea>`,
    },
  },
};

export const MaxAndMinHeight: Story = props =>
  html`<uui-textarea
    label="Label"
    minHeight=${props.minHeight}
    maxHeight=${props.maxHeight}></uui-textarea>`;

MaxAndMinHeight.args = { minHeight: '100px', maxHeight: '200px' };
MaxAndMinHeight.parameters = {
  controls: { include: ['minHeight', 'maxHeight'] },
  docs: {
    source: {
      code: `<uui-textarea
      label="Label"
      minHeight="100px"
      maxHeight="200px"></uui-textarea>`,
    },
  },
};

export const AutomaticHeightAdjustment: Story = props =>
  html` the height wil confine itself within the max and min height if defined.
    <uui-textarea
      label="Label"
      ?auto-height=${props.autoHeight}></uui-textarea>`;

AutomaticHeightAdjustment.args = { autoHeight: true };
AutomaticHeightAdjustment.parameters = {
  controls: { include: ['autoHeight'] },
  docs: {
    source: {
      code: `<uui-textarea label="Label" auto-height></uui-textarea>`,
    },
  },
};

export const AutomaticHeightAdjustmentWithHeightLimits: Story = props =>
  html` the height wil confine itself within the max and min height if defined.
    <uui-textarea
      label="Label"
      auto-height
      minHeight="100px"
      maxHeight="200px"></uui-textarea>`;

AutomaticHeightAdjustmentWithHeightLimits.args = {
  minHeight: '100px',
  maxHeight: '200px',
  autoHeight: true,
};
AutomaticHeightAdjustmentWithHeightLimits.parameters = {
  controls: { include: ['minHeight', 'maxHeight', 'autoHeight'] },
  docs: {
    source: {
      code: `<uui-textarea
      label="Label"
      auto-height
      minHeight="100px"
      maxHeight="200px"></uui-textarea>`,
    },
  },
};
