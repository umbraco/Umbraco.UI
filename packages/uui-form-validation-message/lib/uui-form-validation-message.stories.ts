import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  id: 'uui-form-validation-message',
  component: 'uui-form-validation-message',
  title: 'Inputs/Form/Form Validation Message',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`<uui-form-validation-message>
      <uui-input
        id="phoneInput"
        type="text"
        name="phone"
        placeholder="+00"
        required
        required-message="You must enter a area code"
        style="text-align:right; width: 75px;">
      </uui-input>
      <uui-input
        type="text"
        name="phone"
        placeholder=""
        required
        required-message="You must enter a phone number">
      </uui-input>
    </uui-form-validation-message>`,
};

export const ForAnotherElement: Story = {
  render: () =>
    html`<div id="myCustomScope">
        <uui-input
          id="phoneInput"
          type="text"
          name="phone"
          placeholder="+00"
          required
          required-message="You must enter a area code"
          style="text-align:right; width: 75px;">
        </uui-input>
        <uui-input
          type="text"
          name="phone"
          placeholder=""
          required
          required-message="You must enter a phone number">
        </uui-input>
        <uui-textarea
          label="Textarea"
          name="textarea"
          value="Some long text that needs more space"
          minlength="10"
          maxlength="30"
          required>
        </uui-textarea>
      </div>
      <uui-form-validation-message for="myCustomScope">
      </uui-form-validation-message>`,

  decorators: [
    story =>
      html`<div style="margin-bottom: 12px">
          The Form Validation Message element can also display validation
          messages from another scope than it self. This is done by setting the
          'for' attribute.
        </div>
        ${story()}`,
  ],
};
