import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Displays/Avatar/Avatar Group',
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
    <uui-avatar name="Mads Rasmussen"></uui-avatar>
    <uui-avatar name="Niels Lyngsøe"></uui-avatar>
    <uui-avatar name="Jacob Overgaard"></uui-avatar>
    <uui-avatar name="Jesper Møller Jensen"></uui-avatar>
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
        <uui-avatar name="Firstname Lastname"></uui-avatar>
        <uui-avatar name="Firstname Lastname"></uui-avatar>
        <uui-avatar name="Firstname Lastname"></uui-avatar>
        <uui-avatar name="Firstname Lastname"></uui-avatar>
      </uui-avatar-group>`.strings,
    },
  },
};

AAAOverview.storyName = 'Overview';

export const Limit: Story = ({ limit }) => html`
  <uui-avatar-group
    style="font-size: 2rem; --uui-avatar-border-color: white;"
    .limit=${limit}>
    <uui-avatar name="MR"></uui-avatar>
    <uui-avatar name="NL"></uui-avatar>
    <uui-avatar name="JJ"></uui-avatar>
    <uui-avatar name="JO"></uui-avatar>
  </uui-avatar-group>
`;
Limit.args = { limit: 2 };
Limit.parameters = {
  controls: { include: ['limit'] },
  docs: {
    source: {
      code: html`<uui-avatar-group limit="2">
        <uui-avatar name="Firstname Lastname"></uui-avatar>
        <uui-avatar name="Firstname Lastname"></uui-avatar>
        <uui-avatar name="Firstname Lastname"></uui-avatar>
        <uui-avatar name="Firstname Lastname"></uui-avatar>
      </uui-avatar-group>`.strings,
    },
  },
};
