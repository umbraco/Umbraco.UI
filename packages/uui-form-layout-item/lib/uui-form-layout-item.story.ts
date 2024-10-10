import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-form/lib';
import '@umbraco-ui/uui-label/lib';
import '@umbraco-ui/uui-input/lib';

// TODO: Figure out why we now need to import everything that every component uses
import '@umbraco-ui/uui-form-validation-message/lib';

const meta: Meta = {
  id: 'uui-form-layout-item',
  component: 'uui-form-layout-item',
  title: 'Inputs/Form/Form Layout Item',
  render: args =>
    html`<uui-form-layout-item ${spread(args)}
      >${renderSlots(args)}</uui-form-layout-item
    >`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    slot: 'Form layout item is a layout component, use the properties and slots to append content/components of interest. See the following stories for examples.',
  },
};

export const Example: Story = {
  args: {
    'label slot': html`<uui-label slot="label" for="phoneInput" required>
      Phone number
    </uui-label>`,
    'description slot': html`<span slot="description">
      Form item accepts a description, keep it short.
    </span>`,
    slot: html`
      <div>
        <uui-input
          id="phoneInput"
          type="text"
          name="phone"
          placeholder="+00"
          label="phone area code"
          required
          required-message="You must enter a area code"
          style="text-align:right; width: 75px;">
        </uui-input>
        <uui-input
          type="text"
          name="phone"
          placeholder=""
          label="phone number"
          required
          required-message="You must enter a phone number">
        </uui-input>
      </div>
    `,
  },
};
