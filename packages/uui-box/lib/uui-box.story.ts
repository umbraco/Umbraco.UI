import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Layout/Box',
  component: 'uui-box',
  id: 'uui-box',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

const Template: Story = () => html`
  <uui-box headline="Headline">
    Some content of this box, appended in the default slot.
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
