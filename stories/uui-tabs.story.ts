import { html } from 'lit-html';
import '@umbraco-ui/uui-tabs/lib/index';
import { Story } from '@storybook/web-components';

export default {
  title: 'Buttons/Tabs',
  component: 'uui-tab',
};

export const Basic: Story = () => html` <uui-tab label="Tab A"></uui-tab>`;

export const TabGroup: Story = () => html` <uui-tab-group>
  <uui-tab> Tab A </uui-tab>
  <uui-tab> Tab B </uui-tab>
  <uui-tab> Tab C </uui-tab>
</uui-tab-group>`;

// export const IconWithText = () =>
//   html` <uui-tab><uui-icon name="bug"></uui-icon>Tab A</uui-tab>`;

// export const JustIcon = () =>
//   html` <uui-tab><uui-icon name="bug"></uui-icon></uui-tab>`;
