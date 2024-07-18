import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Inputs/Radio',
  component: 'uui-radio',
  id: 'uui-radio',
  args: {
    label: 'label',
    checked: false,
    disabled: false,
    readonly: false,
  },
  argTypes: {
    slot: { control: { type: 'text' } },
  },
  parameters: {
    readme: { markdown: readme },
  },
};

export const AAAOverview: Story = props =>
  html`<uui-radio
    .value=${props.value}
    .label=${props.label}
    .name=${props.name}
    ?disabled=${props.disabled}
    ?readonly=${props.readonly}
    ?checked=${props.checked}
    >${props.slot}</uui-radio
  >`;
AAAOverview.storyName = 'Overview';

export const Disabled: Story = props =>
  html` <uui-radio value="1" ?disabled=${props.disabled}>Disabled</uui-radio>`;

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

export const Readonly: Story = props =>
  html` <uui-radio value="1" ?readonly=${props.readonly}>Readonly</uui-radio>`;

Readonly.args = {
  readonly: true,
};

Readonly.parameters = {
  controls: { include: ['readonly'] },
  docs: {
    source: {
      code: `
<uui-radio value="1" readonly>Readonly</uui-radio>
`,
    },
  },
};

export const Checked: Story = props =>
  html` <uui-radio value="1" ?checked=${props.checked}>Checked</uui-radio>`;

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

export const RadioGroup: Story = () => html`
  <h5>Group 1</h5>
  <uui-radio-group name="radioGroup">
    <uui-radio value="1">Option 1</uui-radio>
    <uui-radio value="2" disabled>Option 2</uui-radio>
    <uui-radio value="3">Option 3</uui-radio>
  </uui-radio-group>

  <h5>Group 2</h5>
  <uui-radio-group name="f331672b-e6f3-4b73-8b44-67a51a24f296">
    <uui-radio
      value="Prolific - I live and breathe Umbraco."
      label="Prolific - I live and breathe Umbraco.">
    </uui-radio>
    <uui-radio
      value="Regular - I see a thing and I fix it. I see a person in need and I chat to them. I learn something new and I blog about it. I have an idea! I'm building a package!"
      label="Regular - I see a thing and I fix it. I see a person in need and I chat to them. I learn something new and I blog about it. I have an idea! I'm building a package!">
    </uui-radio>
    <uui-radio
      value="Social - I'm here for the people, the vibes, the good times. I would probably hang out with you all if I didn't work with the product."
      label="Social - I'm here for the people, the vibes, the good times. I would probably hang out with you all if I didn't work with the product.">
    </uui-radio>
    <uui-radio
      value="Keen but irregular - I love contributing when I have time but time is short these days since the new ."
      label="Keen but irregular - I love contributing when I have time but time is short these days since the new .">
    </uui-radio>
    <uui-radio
      value="Shy - I would do more but I am not sure how welcome or valuable my experience is."
      label="Shy - I would do more but I am not sure how welcome or valuable my experience is.">
    </uui-radio>
    <uui-radio
      value="Reluctant - Nope, I work hard enough. Love what you do and all but I'm saving energy for the things I already have on my to do list."
      label="Reluctant - Nope, I work hard enough. Love what you do and all but I'm saving energy for the things I already have on my to do list.">
    </uui-radio>
    <uui-radio
      value="Lapsed - I miss XSLT. It was all so much better before"
      label="Lapsed - I miss XSLT. It was all so much better before">
    </uui-radio>
    <uui-radio value="Other (Please state)" label="Other (Please state)">
    </uui-radio>
  </uui-radio-group>
`;

RadioGroup.parameters = {
  controls: { include: [] },
  docs: {
    source: {
      code: `
<h5>Group 1</h5>
<uui-radio-group name="radioGroup">
  <uui-radio value="1">Option 1</uui-radio>
  <uui-radio value="2" disabled>Option 2</uui-radio>
  <uui-radio value="3">Option 3</uui-radio>
</uui-radio-group>

<h5>Group 2</h5>
<uui-radio-group name="f331672b-e6f3-4b73-8b44-67a51a24f296">
  <uui-radio
      value="Prolific - I live and breathe Umbraco."
      label="Prolific - I live and breathe Umbraco."
      >
  </uui-radio>
  <uui-radio
      value="Regular - I see a thing and I fix it. I see a person in need and I chat to them. I learn something new and I blog about it. I have an idea! I&#x2019;m building a package!"
      label="Regular - I see a thing and I fix it. I see a person in need and I chat to them. I learn something new and I blog about it. I have an idea! I&#x2019;m building a package!"
      >
  </uui-radio>
  <uui-radio
      value="Social - I'm here for the people, the vibes, the good times. I would probably hang out with you all if I didn't work with the product."
      label="Social - I'm here for the people, the vibes, the good times. I would probably hang out with you all if I didn't work with the product."
      >
  </uui-radio>
  <uui-radio
      value="Keen but irregular - I love contributing when I have time but time is short these days since the new ."
      label="Keen but irregular - I love contributing when I have time but time is short these days since the new ."
      >
  </uui-radio>
  <uui-radio
      value="Shy - I would do more but I am not sure how welcome or valuable my experience is."
      label="Shy - I would do more but I am not sure how welcome or valuable my experience is."
      >
  </uui-radio>
  <uui-radio
      value="Reluctant - Nope, I work hard enough. Love what you do and all but I'm saving energy for the things I already have on my to do list."
      label="Reluctant - Nope, I work hard enough. Love what you do and all but I'm saving energy for the things I already have on my to do list."
      >
  </uui-radio>
  <uui-radio
      value="Lapsed - I miss XSLT. It was all so much better before"
      label="Lapsed - I miss XSLT. It was all so much better before"
      >
  </uui-radio>
  <uui-radio
      value="Other (Please state)"
      label="Other (Please state)"
      >
  </uui-radio>
</uui-radio-group>
`,
    },
  },
};

export const DisabledGroup: Story = props => html`
  <uui-radio-group .disabled=${props.disabled}>
    <uui-radio value="1">one</uui-radio>
    <uui-radio value="2" .checked=${props.checked}>two</uui-radio>
    <uui-radio value="3">three</uui-radio>
    <uui-radio value="4">four</uui-radio>
  </uui-radio-group>
`;
DisabledGroup.args = {
  disabled: true,
};

export const GroupWithStartValue: Story = props => html`
  <uui-radio-group value=${props.value}>
    <uui-radio value="1">one</uui-radio>
    <uui-radio value="2">two</uui-radio>
    <uui-radio value="3">three</uui-radio>
    <uui-radio value="4">four</uui-radio>
  </uui-radio-group>
`;
GroupWithStartValue.args = {
  value: '3',
};
GroupWithStartValue.parameters = {
  controls: { exclude: ['label', 'checked', 'disabled', 'name'] },
};
