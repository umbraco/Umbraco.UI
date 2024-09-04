import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-radio',
  component: 'uui-radio',
  title: 'Inputs/Radio',
  args: {
    label: 'Label',
  },
  render: args => html`<uui-radio ${spread(args)}></uui-radio>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const RadioGroup: Story = {
  render: () => html`
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
  `,
};

export const DisabledGroup: Story = {
  render: () => html`
    <uui-radio-group disabled>
      <uui-radio value="1">one</uui-radio>
      <uui-radio value="2" checked>two</uui-radio>
      <uui-radio value="3">three</uui-radio>
      <uui-radio value="4">four</uui-radio>
    </uui-radio-group>
  `,
};

export const GroupWithStartValue: Story = {
  render: () => html`
    <uui-radio-group value="3">
      <uui-radio value="1">one</uui-radio>
      <uui-radio value="2">two</uui-radio>
      <uui-radio value="3">three</uui-radio>
      <uui-radio value="4">four</uui-radio>
    </uui-radio-group>
  `,
};
