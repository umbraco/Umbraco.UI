import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { spreadProps } from './helper/SpreadPropsDirective';
import '@umbraco-ui/uui-avatar-group/src/index';

export default {
  title: 'Displays/Avatar Group',
  component: 'uui-avatar-group',
  args: {
    limit: 0,
    borderColor: 'white',
  },
};

export const Overview: Story = props => html`
  <uui-avatar-group style="font-size: 2rem" ${spreadProps(props)}>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;

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

export const Sizes: Story = () => html`
  <uui-avatar-group style="font-size: 1rem">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
  <br />
  <uui-avatar-group style="font-size: 2rem">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
  <br />
  <uui-avatar-group style="font-size: 3rem">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;
