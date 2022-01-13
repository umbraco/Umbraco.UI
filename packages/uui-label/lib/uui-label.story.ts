import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-label/lib/index';
import '@umbraco-ui/uui-input/lib/index';
import '@umbraco-ui/uui-checkbox/lib/index';

export default {
  id: 'uui-label',
  title: 'Inputs/Label',
  component: 'uui-label',
};

const Template: Story = props => html`
  <uui-label ?disabled=${props.disabled}>Label</uui-label>
`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  disabled: false,
};
AAAOverview.storyName = 'Overview';

export const ConnectWithFormControl: Story = () => html`
<uui-label for="MyInput">My Label</uui-label>
<uui-input id="MyInput" label="My A11Y Label"></uui-input>

<br />
<br />

<uui-label for="MyCheckbox">My Label</uui-label>
<uui-checkbox id="MyCheckbox" label="My A11Y Label"></uui-checkbox>

<br />
<br />

<uui-label for="MyNativeInput">My Label</uui-label>
<input type="text" id="MyNativeInput" label="My A11Y Label"></input>
`;
