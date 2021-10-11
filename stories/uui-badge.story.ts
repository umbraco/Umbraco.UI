import { html } from 'lit-element';
import '@umbraco-ui/uui-badge/lib/index';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';
import { Story } from '@storybook/web-components';

export default {
  title: 'Misc/Badge',
  component: 'uui-badge',
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

export const WithText = Template.bind({});
WithText.args = {
  look: 'positive',
  slot: 'Published',
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

export const Styles: Story = props => html`
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
Styles.args = {
  look: 'primary',
  slot: '!',
};
