import '../define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Loaders/Loader Bar',
  component: 'uui-loader-bar',
  id: 'uui-loader-bar',
  args: {
    animationDuration: 1.5,
    progress: 0,
  },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    animationDuration: {
      control: { type: 'number', min: 0, max: 100 },
    },
  },
};

const Template: Story = props =>
  html`
    <uui-loader-bar
      progress=${props.progress}
      animationDuration=${props.animationDuration}
      style="color: ${props.color}"></uui-loader-bar>
  `;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.args = { color: 'black' };
AAAOverview.argTypes = {
  color: { table: { category: 'inline styling' } },
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: '<uui-loader animationDuration="1.5" style="color: black"></uui-loader>',
    },
  },
};

export const Color = Template.bind({});
Color.args = { color: 'blue' };
Color.argTypes = {
  color: { table: { category: 'inline styling' } },
};
Color.parameters = {
  docs: {
    source: {
      code: '<uui-loader style="color: blue"></uui-loader>',
    },
  },
};

export const Progress = Template.bind({});
Progress.args = { progress: 75 };
Progress.parameters = {
  docs: {
    source: {
      code: '<uui-loader progress="75"></uui-loader>',
    },
  },
};
