import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-textarea/lib/index';

export default {
  id: 'uui-textarea',
  title: 'Inputs/Textarea',
  component: 'uui-textarea',
  parameters: {
    docs: {
      source: {
        code: `<uui-textarea></uui-textarea>`,
      },
    },
  },
  args: {
    value: '',
  },
};

export const AAAOverview: Story = props =>
  html`<uui-textarea
    .label=${props.label}
    ?auto-height=${props.autoHeight}
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
  autoHeight: true,
  maxLength: 200,
  minHeight: '100px',
  maxHeight: '200px',
};

export const MaxLength: Story = props =>
  html`<uui-textarea label="textarea" maxLength="20"></uui-textarea>`;

export const Disabled: Story = props =>
  html`<uui-textarea label="textarea" disabled></uui-textarea>`;

export const Placeholder: Story = props =>
  html`<uui-textarea
    label="textarea"
    placeholder="I am a placeholder..."></uui-textarea>`;

export const MaxAndMinHeight: Story = props =>
  html`<uui-textarea
    label="textarea"
    minHeight="100px"
    maxHeight="200px"></uui-textarea>`;

export const AutomaticHeightAdjustment: Story = props =>
  html` the height wil confine itself within the max and min height if defined.
    <uui-textarea label="textarea" auto-height></uui-textarea>`;

export const AutomaticHeightAdjustmentWithHeightLimits: Story = props =>
  html` the height wil confine itself within the max and min height if defined.
    <uui-textarea
      label="textarea"
      auto-height
      minHeight="100px"
      maxHeight="200px"></uui-textarea>`;
