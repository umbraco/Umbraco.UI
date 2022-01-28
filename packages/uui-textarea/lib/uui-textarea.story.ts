import '../define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

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
    style="--uui-textarea-min-height: ${props[
      '--uui-textarea-min-height'
    ]}; --uui-textarea-max-height: ${props['--uui-textarea-max-height']}"
    .label=${props.label}
    ?auto-height=${props.autoHeight}
    .minLength=${props.minLength}
    .maxLength=${props.maxLength}
    .placeholder=${props.placeholder}
    ?disabled=${props.disabled}
    .name=${props.name}
    .error=${props.error}
    .value=${props.value}
    ?hide-label=${props.hideLabel}></uui-textarea>`;

AAAOverview.storyName = 'Overview';

AAAOverview.args = {
  label: 'Label',
  '--uui-textarea-min-height': '',
  '--uui-textarea-max-height': '',
};

AAAOverview.argTypes = {
  '--uui-textarea-min-height': { control: { type: 'text' } },
  '--uui-textarea-max-height': { control: { type: 'text' } },
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
    label="Label"
    maxLength=${props.maxLength}></uui-textarea>`;

MaxLength.args = { maxLength: 20 };
MaxLength.parameters = {
  controls: { include: ['maxLength'] },
  docs: {
    source: {
      code: `<uui-textarea label="Label" maxLength="20"></uui-textarea>`,
    },
  },
};

export const MinLength: Story = props =>
  html`<uui-textarea
    label="Label"
    minLength=${props.minLength}></uui-textarea>`;

MinLength.args = { minLength: 20 };
MinLength.parameters = {
  controls: { include: ['minLength'] },
  docs: {
    source: {
      code: `<uui-textarea label="Label" minLength="20"></uui-textarea>`,
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

Placeholder.args = { placeholder: 'Placeholder...' };
Placeholder.parameters = {
  controls: { include: ['placeholder'] },
  docs: {
    source: {
      code: `
<uui-textarea
  label="Label"
  placeholder="Placeholder...">
</uui-textarea>`,
    },
  },
};

export const AutoHeight: Story = props =>
  html` <uui-textarea
    label="Label"
    style="--uui-textarea-min-height: ${props[
      '--uui-textarea-min-height'
    ]}; --uui-textarea-max-height: ${props['--uui-textarea-max-height']}"
    ?auto-height=${props.autoHeight}></uui-textarea>`;

AutoHeight.args = {
  autoHeight: true,
  '--uui-textarea-min-height': '100px',
  '--uui-textarea-max-height': '300px',
};

AutoHeight.parameters = {
  controls: {
    include: [
      'autoHeight',
      '--uui-textarea-min-height',
      '--uui-textarea-max-height',
    ],
  },
  docs: {
    description: {
      story:
        'The height will confine itself within the max and min height if defined',
    },
    source: {
      code: `<uui-textarea label="Label" style="--uui-textarea-min-height: 100px; --uui-textarea-max-height: 300px;" auto-height></uui-textarea>`,
    },
  },
};

AutoHeight.argTypes = {
  '--uui-textarea-min-height': { control: { type: 'text' } },
  '--uui-textarea-max-height': { control: { type: 'text' } },
};

export const Error: Story = props =>
  html`<uui-textarea label="Label" ?error=${props.error}></uui-textarea>`;

Error.args = { error: true };
Error.parameters = {
  controls: { include: ['error'] },
  docs: {
    source: {
      code: `<uui-textarea label="Label" error></uui-textarea>`,
    },
  },
};
