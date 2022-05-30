import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  title: 'Displays/Badge',
  component: 'uui-badge',
  id: 'uui-badge',
  args: {
    color: 'default',
    slot: '1',
    attention: false,
  },
  argTypes: {
    color: {
      options: ['default', 'secondary', 'positive', 'warning', 'danger'],
      control: { type: 'select' },
    },
    slot: {
      control: { type: 'text' },
    },
  },
};

const Template: Story = props => html` <uui-icon-registry-essential>
  <div
    style="position:relative; width:80px; height:80px; border: 2px dashed black;">
    <uui-badge .color=${props.color} ?attention=${props.attention}
      >${props.slot}</uui-badge
    >
  </div>
</uui-icon-registry-essential>`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  color: 'default',
  slot: '1',
  attention: false,
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 2px dashed black;">
  <uui-badge>1</uui-badge>
</div>
    `,
    },
  },
};

export const WithAttention = Template.bind({});
WithAttention.args = {
  color: 'warning',
  slot: '!',
  attention: true,
};
WithAttention.parameters = {
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 2px dashed black;">
  <uui-badge color="danger" attention>!</uui-badge>
</div>
    `,
    },
  },
};

export const WithText = Template.bind({});
WithText.args = {
  color: 'positive',
  slot: 'Published',
};
WithText.parameters = {
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 2px dashed black;">
  <uui-badge color="positive">Published</uui-badge>
</div>
    `,
    },
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  color: 'positive',
  slot: html`<uui-icon name="favorite"></uui-icon>`,
};
WithIcon.parameters = {
  controls: {
    exclude: ['slot'],
  },
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 2px dashed black;">
  <uui-icon-registry-essential>
    <uui-badge ="positive">
      <uui-icon name="favorite"></uui-icon>
    </uui-badge>
  </uui-icon-registry-essential>
</div>
    `,
    },
  },
};

export const OnButton: Story = props => html` <uui-button look="outline">
  Button label
  <uui-badge .color=${props.color}>${props.slot}</uui-badge>
</uui-button>`;
OnButton.args = {
  color: 'danger',
  slot: '!',
};
OnButton.parameters = {
  docs: {
    source: {
      code: `
<uui-button look="outline">
  <uui-badge ="danger">!</uui-badge>
  Button label
</uui-button>
    `,
    },
  },
};

export const Colors: Story = () => html`
  <div
    style="position:relative; width:80px; height:80px; border: 2px dashed black">
    <uui-badge>Default</uui-badge>
  </div>
  <div
    style="position:relative; width:80px; height:80px; border: 2px dashed black; margin-top: 16px">
    <uui-badge color="secondary">secondary</uui-badge>
  </div>
  </div>
  <div
    style="position:relative; width:80px; height:80px; border: 2px dashed black; margin-top: 16px">
    <uui-badge color="positive">positive</uui-badge>
  </div>
  <div
    style="position:relative; width:80px; height:80px; border: 2px dashed black; margin-top: 16px">
    <uui-badge color="warning">warning</uui-badge>
  </div>
  <div
    style="position:relative; width:80px; height:80px; border: 2px dashed black; margin-top: 16px">
    <uui-badge color="danger">danger</uui-badge>
  </div>
`;
