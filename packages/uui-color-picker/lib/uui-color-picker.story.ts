import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-color-picker',
  title: 'Color Picker',
  component: 'uui-color-picker',
  parameters: {
    docs: {
      source: {
        code: `<uui-color-picker></uui-color-picker>`,
      },
    },
  },
};

export const AAAOverview: Story = props =>
  html`<uui-color-picker></uui-color-picker>`;

AAAOverview.storyName = 'Overview';

const Template: Story = props => html`
  <uui-color-picker
    inline=${props.inline}
    .value=${props.value}>
  </uui-color-picker>
`;

export const Inline = Template.bind({});
Inline.args = {
  inline: true
};
Inline.parameters = {
  docs: {
    source: {
      code: `<uui-color-picker inline="true"></uui-color-picker>`,
    },
  },
};

