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

export const AAAOverview: Story = () =>
  html`<uui-color-picker></uui-color-picker>`;

AAAOverview.storyName = 'Overview';

const Template: Story = props => html`
  <uui-color-picker inline=${props.inline} .value=${props.value}>
  </uui-color-picker>
`;

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
  //value: 'blue'
};
Inline.parameters = {
  docs: {
    source: {
      code: `<uui-color-picker inline="true"></uui-color-picker>`,
    },
  },
};

const formats = ['hex', 'rgb', 'hsl'];

export const Formats: Story = () => html`
  <h4>Formats</h4>
  ${formats.map(
    format =>
      html`
        <h5>${format}</h5>
        <uui-color-picker .format=${format as any} value="blue">
        </uui-color-picker>
      `
  )}
`;
Formats.args = { format: 'hex' };
Formats.parameters = {
  docs: {
    source: {
      code: `
        <uui-color-picker format="hex"></uui-color-picker>`,
    },
  },
};
