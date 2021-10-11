import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-loader-bar/lib/index';

export default {
  title: 'Symbols/Loader Bar',
  component: 'uui-loader-bar',
  args: {
    animationDuration: 1.5,
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

export const Color = Template.bind({});
Color.args = { color: 'blue' };
Color.argTypes = {
  color: { table: { category: 'inline styling' } },
};
Color.parameters = { controls: { include: ['color', 'animationDuration'] } };

export const Progress = Template.bind({});
Progress.args = { progress: 75 };
Progress.parameters = {
  controls: { include: ['progress', 'animationDuration'] },
};
