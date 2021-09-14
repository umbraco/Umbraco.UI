import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { spreadProps } from './helper/SpreadPropsDirective';
import '@umbraco-ui/uui-textfield/src/index';

export default {
  title: 'Inputs/Textfield',
  component: 'uui-textfield',
  args: {
    value: 'Hello World',
    label: 'I am a label!',
    placeholder: 'Type something...',
  },
  argTypes: {
    type: {
      options: [
        'text',
        'tel',
        'url',
        'email',
        'password',
        'date',
        'month',
        'week',
        'time',
        'datetime-local',
        'number',
        'color',
      ],
    },
  },
};

const Template: Story = props =>
  html` <uui-textfield ${spreadProps(props)}></uui-textfield> `;

export const Overview = Template.bind({});

export const Text = Template.bind({});
Text.args = { type: 'text' };
Text.parameters = { controls: { include: ['type', 'value'] } };

export const Password = Template.bind({});
Password.args = { type: 'password', label: 'Password' };
Password.parameters = { controls: { include: ['value', 'type'] } };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
Disabled.parameters = { controls: { include: ['disabled', 'type', 'value'] } };

export const Error = Template.bind({});
Error.args = { error: true, label: 'Error' };
Error.parameters = { controls: { include: ['error', 'type', 'value'] } };

export const Placeholder = Template.bind({});
Placeholder.args = { value: '' };
Placeholder.parameters = { controls: { include: ['placeholder', 'type'] } };

export const Color = Template.bind({});
Color.args = { type: 'color', label: 'Color' };
Color.parameters = { controls: { include: ['type'] } };

export const Date = Template.bind({});
Date.args = { type: 'date', label: 'Date' };
Date.parameters = { controls: { include: ['type'] } };

export const DateTime = Template.bind({});
DateTime.args = { type: 'datetime-local', label: 'Date Time' };
DateTime.parameters = { controls: { include: ['type'] } };
