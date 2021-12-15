import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Cards/User Card',
  component: 'uui-card-user',
  id: 'uui-card-user',
  args: {
    name: 'John Rabbit',
    selectable: false,
    selected: false,
    error: false,
    disabled: false,
  },
};

const Template: Story = props => html`
  <div style="width: 200px">
    <uui-card-user
      name=${props.name}
      ?selectable=${props.selectable}
      ?selected=${props.selected}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <div style="margin-bottom: 12px">Editors</div>
      <div>Has not logged in yet</div>
    </uui-card-user>
  </div>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-card-user name="John Rabbit"></uui-card-user>`,
    },
  },
};

export const Selectable: Story = Template.bind({});
Selectable.args = {
  selectable: true,
};

export const Disabled: Story = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Error: Story = Template.bind({});
Error.args = {
  error: true,
};

export const Actions: Story = props => html`
  <div style="width: 200px">
    <uui-card-user
      name=${props.name}
      ?selectable=${props.selectable}
      ?selected=${props.selected}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <div style="margin-bottom: 12px">Editors</div>
      <div>Has not logged in yet</div>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-card-user>
  </div>
`;

export const Tags: Story = props => html`
  <div style="width: 200px">
    <uui-card-user
      name=${props.name}
      ?selectable=${props.selectable}
      ?selected=${props.selected}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <div style="margin-bottom: 12px">Editors</div>
      <div>Has not logged in yet</div>
      <uui-tag slot="tag" size="s" look="positive">Published</uui-tag>
    </uui-card-user>
  </div>
`;
