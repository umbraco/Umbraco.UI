import '.';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-input/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Layout/Box',
  component: 'uui-box',
  id: 'uui-box',
};

const Template: Story = () => html`
  <uui-box headline="Headline">
    Some content of this box, appended in the default slot. Notice the padding
    of the default slot can be removed by setting
    style="--uui-box-default-padding: 0;"
  </uui-box>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Slots: Story = () => html`
  <uui-box>
    <uui-button slot="headline" look="placeholder" style="font-weight:inherit;"
      >Headline slot</uui-button
    >
    <uui-button slot="header" look="placeholder">Header slot</uui-button>
    <uui-button look="placeholder">Default slot</uui-button>
  </uui-box>
`;
