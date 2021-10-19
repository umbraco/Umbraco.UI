import { html } from 'lit-element';
import '@umbraco-ui/uui-badge/lib/index';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types/index';
import { Story } from '@storybook/web-components';

export default {
  title: 'Misc/Badge',
  component: 'uui-badge',
  id: 'uui-badge',
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
  },
};

const Template: Story = props => html` <div
  style="position:relative; width:80px; height:80px; border: 2px dashed black;">
  <uui-badge .look=${props.look}>${props.slot}</uui-badge>
</div>`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  look: 'danger',
  slot: '!',
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: ` 
<div style="position:relative;">
  <uui-badge>!</uui-badge>
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
<div style="position:relative;">
  <uui-badge look="positive">Published</uui-badge>
</div>
    `,
    },
  },
};

// TODO: Uncomment when we fix the icon package.
// export const WithIcon = () => html` <div
//   style="position:relative; width:20px; height:10px;">
//   <uui-badge look="secondary"><uui-icon name="info"></uui-icon></uui-badge>
// </div>`;

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
  <uui-badge look="positive">!</uui-badge>
  Button label
</uui-button>
    `,
    },
  },
};

export const Looks: Story = props => html`
  <div
    style="position:relative; width:80px; height:80px; border: 2px dashed black; margin-bottom: 16px">
    <uui-badge .look=${props.look}>${props.slot}</uui-badge>
  </div>
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html`<div
        style="position:relative; display:inline-block; width:10px; height:10px; margin-right: 16px;">
        <uui-badge .look=${lookName}> 1 </uui-badge>
      </div>`
  )}
`;
Looks.args = {
  look: 'primary',
  slot: '!',
};
