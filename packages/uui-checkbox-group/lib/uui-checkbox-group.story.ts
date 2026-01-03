import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-checkbox-group',
  component: 'Checkbox Group',
  title: 'Inputs/Checkbox Group',
  args: {
    label: 'Label',
  },
  render: args =>
    html`<uui-checkbox-group ${spread(args)}></uui-checkbox-group>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Group: Story = {
  render: () => html`
    <h5>Group 1</h5>
    <uui-checkbox-group name="checkboxGroup">
      <uui-checkbox value="1">Option 1</uui-checkbox>
      <uui-checkbox value="2" disabled>Option 2</uui-checkbox>
      <uui-checkbox value="3">Option 3</uui-checkbox>
    </uui-checkbox-group>

    <h5>Group 2</h5>
    <uui-checkbox-group name="f331672b-e6f3-4b73-8b44-67a51a24f296">
      <uui-checkbox
        value="Prolific - I live and breathe Umbraco."
        label="Prolific - I live and breathe Umbraco.">
      </uui-checkbox>
      <uui-checkbox
        value="Regular - I see a thing and I fix it. I see a person in need and I chat to them. I learn something new and I blog about it. I have an idea! I'm building a package!"
        label="Regular - I see a thing and I fix it. I see a person in need and I chat to them. I learn something new and I blog about it. I have an idea! I'm building a package!">
      </uui-checkbox>
      <uui-checkbox
        value="Social - I'm here for the people, the vibes, the good times. I would probably hang out with you all if I didn't work with the product."
        label="Social - I'm here for the people, the vibes, the good times. I would probably hang out with you all if I didn't work with the product.">
      </uui-checkbox>
      <uui-checkbox
        value="Keen but irregular - I love contributing when I have time but time is short these days since the new ."
        label="Keen but irregular - I love contributing when I have time but time is short these days since the new .">
      </uui-checkbox>
      <uui-checkbox
        value="Shy - I would do more but I am not sure how welcome or valuable my experience is."
        label="Shy - I would do more but I am not sure how welcome or valuable my experience is.">
      </uui-checkbox>
      <uui-checkbox
        value="Reluctant - Nope, I work hard enough. Love what you do and all but I'm saving energy for the things I already have on my to do list."
        label="Reluctant - Nope, I work hard enough. Love what you do and all but I'm saving energy for the things I already have on my to do list.">
      </uui-checkbox>
      <uui-checkbox
        value="Lapsed - I miss XSLT. It was all so much better before"
        label="Lapsed - I miss XSLT. It was all so much better before">
      </uui-checkbox>
      <uui-checkbox value="Other (Please state)" label="Other (Please state)">
      </uui-checkbox>
    </uui-checkbox-group>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <uui-checkbox-group disabled>
      <uui-checkbox value="1">one</uui-checkbox>
      <uui-checkbox value="2" checked>two</uui-checkbox>
      <uui-checkbox value="3">three</uui-checkbox>
      <uui-checkbox value="4">four</uui-checkbox>
    </uui-checkbox-group>
  `,
};

export const DefaultValue: Story = {
  render: () => html`
    <uui-checkbox-group value="3">
      <uui-checkbox value="1">one</uui-checkbox>
      <uui-checkbox value="2">two</uui-checkbox>
      <uui-checkbox value="3">three</uui-checkbox>
      <uui-checkbox value="4">four</uui-checkbox>
    </uui-checkbox-group>
  `,
};
