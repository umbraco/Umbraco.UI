import '.';

import { StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Displays/Avatar/Avatar Group',
  id: 'uui-avatar-group',
  component: 'uui-avatar-group',
  args: {
    limit: 0,
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export const AAAOverview: StoryFn = props => html`
  <uui-avatar-group
    style="font-size: ${props.fontSize}em; --uui-avatar-border-color: ${props[
      '--uui-avatar-border-color'
    ]};"
    .limit=${props.limit}>
    <uui-avatar name="Mads Rasmussen"></uui-avatar>
    <uui-avatar name="Niels Lyngsø"></uui-avatar>
    <uui-avatar name="Jacob Overgaard"></uui-avatar>
    <uui-avatar name="Jesper Møller Jensen"></uui-avatar>
  </uui-avatar-group>
`;
AAAOverview.args = { fontSize: 2, '--uui-avatar-border-color': 'white' };
AAAOverview.argTypes = {
  fontSize: { table: { category: 'Styles' } },
  '--uui-avatar-border-color': { control: { type: 'color' } },
};
AAAOverview.parameters = {};

AAAOverview.storyName = 'Overview';

export const Limit: StoryFn = ({ limit }) => html`
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
Limit.argTypes = {};
Limit.parameters = {
  controls: { include: ['limit'] },
};
