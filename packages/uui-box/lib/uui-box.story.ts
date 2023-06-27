import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Layout/Box',
  component: 'uui-box',
  id: 'uui-box',
  args: {
    headline: "Headline",
    headerVariant: "h5"
  },
  argTypes: {
    headerVariant: {
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

const Template: Story = props => {
  return html`
    <uui-box headline=${props.headline} header-variant=${props.headerVariant}>
    Some content of this box, appended in the default slot.
  </uui-box>
  `;
}

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      type: 'dynamic',
    },
  },
};

export const Slots: Story = () => html`
<uui-box>
  <uui-button slot="headline" look="placeholder" style="font-weight:inherit;"
>Headline slot</uui-button
>
  <uui-button slot="header" look="placeholder">Header slot</uui-button>
  <uui-button look="placeholder">Default slot</uui-button>
</uui-box>
`;


export const WithHeaderVariant = Template.bind({});
WithHeaderVariant.args = { headline: "H1 Headline", headerVariant: 'h1' };
WithHeaderVariant.parameters = {
  docs: {
    source: {
      code: `<uui-box headline="H1 Headline" header-variant="h1">
  Some content of this box, appended in the default slot.
</uui-box>`,
    },
  },
};