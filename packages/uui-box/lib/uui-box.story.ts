import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-box/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import '@umbraco-ui/uui-input/lib/index';

export default {
  title: 'Displays/Box',
  component: 'uui-box',
  id: 'uui-box',
};

const Template: Story = () => html`
  <uui-box>
    <div slot="header">Header</div>
    <div slot="main">Main</div>
  </uui-box>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-box>
  <div slot="header">Header</div>
  <div slot="main">Main</div>
</uui-box>
      `,
    },
  },
};
