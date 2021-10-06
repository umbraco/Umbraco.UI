import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-avatar-group/lib/index';

export default {
  title: 'Displays/Avatar Group',
  component: 'uui-avatar-group',
  args: {
    limit: 0,
    borderColor: 'white',
  },
};

export const Overview: Story = props => html`
  <uui-avatar-group
    style="font-size: ${props.fontSize}em"
    .borderColor=${props.borderColor}
    .limit=${props.limit}>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;
Overview.args = { fontSize: 2 };
Overview.argTypes = {
  fontSize: { table: { category: 'inline styling' } },
};

export const Limit: Story = ({ limit }) => html`
  <uui-avatar-group style="font-size: 2rem" .limit=${limit}>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;
Limit.args = { limit: 2 };
Limit.parameters = { controls: { include: ['limit'] } };
