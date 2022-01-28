import '../define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Displays/Cards/User',
  component: 'uui-card-user',
  id: 'uui-card-user',
  args: {
    name: 'John Rabbit',
  },
};

const Template: Story = props => html`
  <div style="width: 200px">
    <uui-card-user
      name=${props.name}
      ?selectable=${props.selectable}
      ?select-only=${props.selectOnly}
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

AAAOverview.args = {
  selectable: false,
  selected: false,
  selectOnly: false,
  error: false,
  disabled: false,
};

export const Selectable: Story = Template.bind({});
Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  controls: { include: ['selectable'] },
  docs: {
    source: {
      code: `
<uui-card-user name="John Rabbit" selectable></uui-card-user>`,
    },
  },
};

export const SelectOnly: Story = Template.bind({});
SelectOnly.args = {
  selectable: true,
  selectOnly: true,
};

SelectOnly.parameters = {
  controls: { include: ['selectable'] },
  docs: {
    source: {
      code: `
<uui-card-user name="John Rabbit" selectable></uui-card-user>`,
    },
  },
};

export const Disabled: Story = Template.bind({});
Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  controls: { include: ['disabled'] },
  docs: {
    source: {
      code: `
<uui-card-user name="John Rabbit" disabled></uui-card-user>`,
    },
  },
};

export const Error: Story = Template.bind({});
Error.args = {
  error: true,
};

Error.parameters = {
  controls: { include: ['error'] },
  docs: {
    source: {
      code: `
<uui-card-user name="John Rabbit" error></uui-card-user>`,
    },
  },
};

export const Actions: Story = () => html`
  <div style="width: 200px">
    <uui-card-user name="John Rabbit">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-card-user>
  </div>
`;

Actions.parameters = {
  docs: {
    source: {
      code: `
    <uui-card-user
      name="John Rabbit">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-card-user>`,
    },
  },
};

export const Tags: Story = () => html`
  <div style="width: 200px">
    <uui-card-user name="John Rabbit">
      <uui-tag slot="tag" size="s" look="danger">Disabled</uui-tag>
    </uui-card-user>
  </div>
`;

Tags.parameters = {
  docs: {
    source: {
      code: `
    <uui-card-user name="John Rabbit">
      <uui-tag slot="tag" size="s" look="danger">Disabled</uui-tag>
    </uui-card-user>`,
    },
  },
};
