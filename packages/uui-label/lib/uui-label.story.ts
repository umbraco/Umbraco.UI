import '.';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-input/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-label',
  title: 'Inputs/Label',
  component: 'uui-label',
};

const Template: Story = props => html`
  <uui-label ?disabled=${props.disabled} ?required=${props.required}
    >Label</uui-label
  >
`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  disabled: false,
  required: false,
};
AAAOverview.storyName = 'Overview';

export const ConnectWithFormControl: Story = () => html`
<uui-label for="MyInput">My Label</uui-label>
<uui-input id="MyInput" label="My A11Y Label"></uui-input>

<br />
<br />

<uui-label for="MyCheckbox">My Label</uui-label>
<uui-checkbox id="MyCheckbox" label="My A11Y Label">Option 1</uui-checkbox>

<br />
<br />

<uui-label for="MyNativeInput">My Label</uui-label>
<input type="text" id="MyNativeInput" label="My A11Y Label"></input>

<br />
<br />

<uui-label for="MyToggle">My Label</uui-label>
<uui-toggle id="MyToggle" label="My A11Y Label">Toggle this</uui-toggle>

<br />
<br />

<uui-label for="MyTextArea">My Label</uui-label>
<uui-textarea id="MyTextArea" label="My A11Y Label"></uui-textarea>

<br />
<br />

<uui-label for="MySlider">My Label</uui-label>
<uui-slider id="MySlider" label="My A11Y Label">My Slider label</uui-slider>

<br />
<br />

<uui-label for="MySelect">My Label</uui-label>
<uui-select id="MySelect" label="My A11Y Label" .options=${[
  { name: 'Carrot', value: 'orange' },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple', selected: true },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
]}></uui-select>
`;
