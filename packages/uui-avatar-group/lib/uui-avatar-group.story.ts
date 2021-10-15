import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-avatar-group/lib/index';

export default {
  title: 'Displays/Avatar Group',
  id: 'uui-avatar-group',
  component: 'uui-avatar-group',
  args: {
    limit: 0,
  },
};

export const AAAOverview: Story = props => html`
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
AAAOverview.args = { fontSize: 2, '--uui-avatar-border-color': 'white' };
AAAOverview.argTypes = {
  fontSize: { table: { category: 'inline styling' } },
  '--uui-avatar-border-color': { control: { type: 'color' } },
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: html`<uui-avatar-group>
        <uui-avatar title="First Last"></uui-avatar>
        <uui-avatar title="First Last"></uui-avatar>
        <uui-avatar title="First Last"></uui-avatar>
        <uui-avatar title="First Last"></uui-avatar>
      </uui-avatar-group>`.strings,
    },
  },
};

AAAOverview.storyName = 'Overview';

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
Limit.parameters = {
  controls: { include: ['limit'] },
  docs: {
    source: {
      code: html`<uui-avatar-group limit="2">
        <uui-avatar title="First Last"></uui-avatar>
        <uui-avatar title="First Last"></uui-avatar>
        <uui-avatar title="First Last"></uui-avatar>
        <uui-avatar title="First Last"></uui-avatar>
      </uui-avatar-group>`.strings,
    },
  },
};
