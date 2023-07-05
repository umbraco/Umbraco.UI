import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md';

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
  parameters: {
    readme: {
      markdown: readme,
    },
    chromatic: { disableSnapshot: true },
  },
};

const Template: Story = props =>
  html`
    <uui-loader-bar
      progress=${props.progress}
      animationDuration=${props.animationDuration}
      style=${props.color ? 'color: ' + props.color : ''}></uui-loader-bar>
  `;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.args = { color: '' };
AAAOverview.argTypes = {
  color: { table: { category: 'Styles' } },
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: '<uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>',
    },
  },
};

export const Color = Template.bind({});
Color.args = { color: 'blue' };
Color.argTypes = {
  color: { table: { category: 'Styles' } },
};
Color.parameters = {
  docs: {
    source: {
      code: '<uui-loader-bar style="color: blue"></uui-loader-bar>',
    },
  },
};

export const Progress = Template.bind({});
Progress.args = { progress: 75 };
Progress.parameters = {
  docs: {
    source: {
      code: '<uui-loader-bar progress="75"></uui-loader-bar>',
    },
  },
};
