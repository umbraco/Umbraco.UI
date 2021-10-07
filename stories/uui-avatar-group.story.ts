import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-avatar-group/lib/index';

export default {
  title: 'Displays/Avatar Group',
  component: 'uui-avatar-group',
  args: {
    limit: 0,
  },
};

export const Overview: Story = props => html`
  <uui-avatar-group
    style="font-size: ${props.fontSize}em; --uui-avatar-border-color: ${props[
      '--uui-avatar-border-color'
    ]};"
    .limit=${props.limit}>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;
Overview.args = { fontSize: 2, '--uui-avatar-border-color': 'white' };
Overview.argTypes = {
  fontSize: { table: { category: 'inline styling' } },
  '--uui-avatar-border-color': { control: { type: 'color' } },
};

export const Limit: Story = ({ limit }) => html`
  <uui-avatar-group
    style="font-size: 2rem; --uui-avatar-border-color: white;"
    .limit=${limit}>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;
Limit.args = { limit: 2 };
Limit.parameters = { controls: { include: ['limit'] } };
