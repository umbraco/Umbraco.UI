import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Loaders/Loader Circle',
  component: 'uui-loader-circle',
  id: 'uui-loader-circle',
  args: {
    progress: 0,
    fontSize: '4em',
  },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

const Template: Story = props =>
  html`
    <uui-loader-circle
      style="${props.color
        ? 'color: ' + props.color
        : ''}; font-size: ${props.fontSize}"
      progress=${props.progress}
      ?show-progress=${props.showProgress}></uui-loader-circle>
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
      code: `<uui-loader-circle></uui-loader-circle>`,
    },
  },
};

export const Color = Template.bind({});
Color.args = { color: 'blue' };
Color.argTypes = {
  color: { table: { category: 'Styles' } },
};
Color.parameters = {
  controls: { include: ['color', 'progress'] },
  docs: {
    source: {
      code: `<uui-loader-circle style="color: blue"></uui-loader-circle>`,
    },
  },
};

export const Progress = Template.bind({});
Progress.args = { progress: 75, showProgress: true };
Progress.parameters = {
  docs: {
    source: {
      code: `<uui-loader-circle progress="75" show-progress></uui-loader-circle>`,
    },
  },
};
