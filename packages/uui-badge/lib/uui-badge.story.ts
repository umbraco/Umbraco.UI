import '.';

import { Story } from '@storybook/web-components';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import { html } from 'lit';

export default {
  title: 'Displays/Badge',
  component: 'uui-badge',
  id: 'uui-badge',
  args: {
    look: 'primary',
    slot: '1',
    attention: false,
  },
  argTypes: {
    look: {
      options: [
        'primary',
        'secondary',
        'outline',
        'placeholder',
        'positive',
        'warning',
        'danger',
      ],
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
    <uui-badge .look=${props.look} ?attention=${props.attention}
      >${props.slot}</uui-badge
    >
  </div>
</uui-icon-registry-essential>`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  look: 'primary',
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
  look: 'danger',
  slot: '!',
  attention: true,
};
WithAttention.parameters = {
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 2px dashed black;">
  <uui-badge look="danger" attention>!</uui-badge>
</div>
    `,
    },
  },
};

export const WithText = Template.bind({});
WithText.args = {
  look: 'positive',
  slot: 'Published',
};
WithText.parameters = {
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 2px dashed black;">
  <uui-badge look="positive">Published</uui-badge>
</div>
    `,
    },
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  look: 'positive',
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
    <uui-badge look="positive">
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
  <uui-badge .look=${props.look}>${props.slot}</uui-badge>
</uui-button>`;
OnButton.args = {
  look: 'danger',
  slot: '!',
};
OnButton.parameters = {
  docs: {
    source: {
      code: `
<uui-button look="outline">
  <uui-badge look="danger">!</uui-badge>
  Button label
</uui-button>
    `,
    },
  },
};

export const Looks: Story = props => html`
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html`<div
        style="position:relative; display:inline-block; width:10px; height:10px; margin-right: 16px;">
        <uui-badge .look=${lookName} ?attention=${props.attention}
          >${props.slot}</uui-badge
        >
      </div>`
  )}
`;
Looks.args = {
  look: 'primary',
  slot: '!',
};

let lookNamesDocsCode = '';
InterfaceLookNames.forEach((lookName: InterfaceLookType) => {
  lookNamesDocsCode =
    lookNamesDocsCode +
    `
  <div style="position:relative; display:inline-block; width:10px; height:10px; margin-right:16px;">
    <uui-badge look="${lookName}">!</uui-badge>
  </div>
  `;
});

Looks.parameters = {
  docs: {
    source: {
      code: lookNamesDocsCode,
    },
  },
};
