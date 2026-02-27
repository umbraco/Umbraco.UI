import './form.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

import '../form-layout-item/form-layout-item.js';
import '../label/label.js';
import '../checkbox/checkbox.js';
import '../slider/slider.js';
import '../radio/radio.js';
import '../toggle/toggle.js';
import '../button/button.js';
import '../input/input.js';
import '../input-password/input-password.js';
import '../combobox/combobox.js';
import '../combobox-list/combobox-list.js';
import '../textarea/textarea.js';
import '../select/select.js';
import type { UUISelectOption } from '../select/select.element.js';

// TODO: Figure out why we now need to import everything that every component uses

//For combobox:
import '../popover-container/popover-container.js';
import '../symbol-expand/symbol-expand.js';
import '../scroll-container/scroll-container.js';
//For UUI-FORM-LAYOUT-ITEM
import '../form-validation-message/form-validation-message.js';

import { UUIRadioGroupEvent } from '../radio/radio.js';

const meta: Meta = {
  id: 'uui-form',
  component: 'uui-form',
  title: 'Inputs/Form/Form',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

const _onRadioGroupChanged = (e: UUIRadioGroupEvent) => {
  e.target.error = e.target.value !== 'radio2';
};

const _onSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  console.log('SUBMIT', e);

  const form = e.target as HTMLFormElement;
  const isValid = form.checkValidity();

  if (!isValid) {
    return;
  }

  const formData = new FormData(form);

  for (const value of formData.values()) {
    console.log(value);
  }
};

const options: Array<UUISelectOption> = [
  { name: 'Carrot', value: 'orange', selected: true },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple' },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
];

export const Default: Story = {
  render: () => html`
    <uui-form>
      <form id="MyForm" name="myForm" @submit="${_onSubmit}">
        <uui-form-layout-item>
          <uui-label for="MyCheckbox" slot="label" required>Checkbox</uui-label>
          <uui-checkbox
            id="MyCheckbox"
            name="checkbox"
            value="Bike"
            label="This is my checked checkbox"
            required>
            This is my checked checkbox
          </uui-checkbox>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label for="MyToggle" slot="label" required>Toggle</uui-label>
          <uui-toggle
            id="MyToggle"
            name="toggle"
            label="This is my toggle"
            required>
            This is my toggle
          </uui-toggle>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label for="MyRadioGroup" slot="label" required
            >Radio Group</uui-label
          >
          <uui-radio-group
            id="MyRadioGroup"
            name="radio"
            label="This is my radio"
            required
            @change=${_onRadioGroupChanged}>
            <uui-radio value="radio1" label="radio1" name="radio1"
              >Label</uui-radio
            >
            <uui-radio value="radio2" label="radio2" name="radio2"
              >Label</uui-radio
            >
            <uui-radio value="radio3" label="radio3" name="radio3"
              >Label</uui-radio
            >
          </uui-radio-group>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label for="MyEmailInput" slot="label" required>Email</uui-label>
          <uui-input
            id="MyEmailInput"
            name="email"
            type="email"
            label="Email"
            required></uui-input>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label for="MyPasswordInput" slot="label" required>
            Password
          </uui-label>
          <uui-input-password
            id="MyPasswordInput"
            name="password"
            label="Password"
            required>
          </uui-input-password>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label for="MySlider" slot="label" required>Slider</uui-label>
          <uui-slider
            id="MySlider"
            label="Slider"
            name="slider"
            value="5.5"
            min="0"
            max="10"
            step="1"
            required>
          </uui-slider>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label for="MyTextArea" slot="label" required>Textarea</uui-label>
          <uui-textarea
            id="MyTextArea"
            label="Textarea"
            name="textarea"
            value="Some long text that needs more space"
            minlength="10"
            maxlength="30"
            required>
          </uui-textarea>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label for="MySelect" slot="label" required>Select</uui-label>
          <uui-select id="MySelect" name="select" required .options=${options}>
          </uui-select>
        </uui-form-layout-item>

        <uui-form-layout-item>
          <uui-label for="MyCombobox" slot="label" required>Combobox</uui-label>
          <uui-combobox id="MyCombobox" name="combobox" required>
            <uui-combobox-list>
              <uui-combobox-list-option value="1">
                Option 1
              </uui-combobox-list-option>
              <uui-combobox-list-option value="2">
                Option 2
              </uui-combobox-list-option>
              <uui-combobox-list-option value="3">
                Option 3
              </uui-combobox-list-option>
              <uui-combobox-list-option value="4">
                Option 4
              </uui-combobox-list-option>
            </uui-combobox-list>
          </uui-combobox>
        </uui-form-layout-item>

        <div>
          <uui-button type="reset" label="Reset" look="secondary"
            >Reset</uui-button
          >
          <uui-button type="submit" label="Submit" look="primary">
            Submit
          </uui-button>
        </div>
      </form>
    </uui-form>
  `,
  parameters: {
    docs: {
      source: {
        format: false,
        code: `
<uui-form>
  <form id="MyForm" name="myForm" @submit="${_onSubmit}">
    <uui-form-layout-item>
      <uui-label for="MyCheckbox" slot="label" required>Checkbox</uui-label>
      <uui-checkbox
        id="MyCheckbox"
        name="checkbox"
        value="Bike"
        label="This is my checked checkbox"
        required>
        This is my checked checkbox
      </uui-checkbox>
    </uui-form-layout-item>

    <uui-form-layout-item>
      <uui-label for="MyToggle" slot="label" required>Toggle</uui-label>
      <uui-toggle
        id="MyToggle"
        name="toggle"
        label="This is my toggle"
        required>
        This is my toggle
      </uui-toggle>
    </uui-form-layout-item>

    <uui-form-layout-item>
      <uui-label for="MyRadioGroup" slot="label" required
        >Radio Group</uui-label
      >
      <uui-radio-group
        id="MyRadioGroup"
        name="radio"
        label="This is my radio"
        required
        @change=${_onRadioGroupChanged}>
        <uui-radio value="radio1" label="radio1" name="radio1"
          >Label</uui-radio
        >
        <uui-radio value="radio2" label="radio2" name="radio2"
          >Label</uui-radio
        >
        <uui-radio value="radio3" label="radio3" name="radio3"
          >Label</uui-radio
        >
      </uui-radio-group>
    </uui-form-layout-item>

    <uui-form-layout-item>
      <uui-label for="MyEmailInput" slot="label" required>Email</uui-label>
      <uui-input
        id="MyEmailInput"
        name="email"
        type="email"
        label="Email"
        required></uui-input>
    </uui-form-layout-item>

    <uui-form-layout-item>
      <uui-label for="MyPasswordInput" slot="label" required>
        Password
      </uui-label>
      <uui-input-password
        id="MyPasswordInput"
        name="password"
        label="Password"
        required>
      </uui-input-password>
    </uui-form-layout-item>

    <uui-form-layout-item>
      <uui-label for="MySlider" slot="label" required>Slider</uui-label>
      <uui-slider
        id="MySlider"
        label="Slider"
        name="slider"
        value="5.5"
        min="0"
        max="10"
        step="1"
        required>
      </uui-slider>
    </uui-form-layout-item>

    <uui-form-layout-item>
      <uui-label for="MyTextArea" slot="label" required>Textarea</uui-label>
      <uui-textarea
        id="MyTextArea"
        label="Textarea"
        name="textarea"
        value="Some long text that needs more space"
        minlength="10"
        maxlength="30"
        required>
      </uui-textarea>
    </uui-form-layout-item>

    <uui-form-layout-item>
      <uui-label for="MySelect" slot="label" required>Select</uui-label>
      <uui-select id="MySelect" name="select" required .options=${options}>
      </uui-select>
    </uui-form-layout-item>

    <uui-form-layout-item>
      <uui-label for="MyCombobox" slot="label" required>Combobox</uui-label>
      <uui-combobox id="MyCombobox" name="combobox" required>
        <uui-combobox-list>
          <uui-combobox-list-option value="1">
            Option 1
          </uui-combobox-list-option>
          <uui-combobox-list-option value="2">
            Option 2
          </uui-combobox-list-option>
          <uui-combobox-list-option value="3">
            Option 3
          </uui-combobox-list-option>
          <uui-combobox-list-option value="4">
            Option 4
          </uui-combobox-list-option>
        </uui-combobox-list>
      </uui-combobox>
    </uui-form-layout-item>

    <div>
      <uui-button type="reset" label="Reset" look="secondary"
        >Reset</uui-button
      >
      <uui-button type="submit" label="Submit" look="primary">
        Submit
      </uui-button>
    </div>
  </form>
</uui-form>
        `,
      },
    },
  },
};
