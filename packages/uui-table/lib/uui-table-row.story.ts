import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

import '@umbraco-ui/uui-table';
import '@umbraco-ui/uui-input';
import '@umbraco-ui/uui-button';

const meta: Meta = {
  id: 'uui-table-row',
  component: 'uui-table-row',
  title: 'Layout/Table/Table Row',
  render: args => html`
    <uui-table>
      <uui-table-row
        ?selectable=${args.selectable}
        ?select-only=${args.selectOnly}>
        ${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
      <uui-table-row
        ?selectable=${args.selectable}
        ?select-only=${args.selectOnly}>
        <uui-table-cell>
          <uui-input placeholder="Type your own thing"></uui-input>
        </uui-table-cell>
        <uui-table-cell>
          <uui-button label="some button"></uui-button>
        </uui-table-cell>
        <uui-table-cell>
          <a href="http://www.umbraco.com" target="_blank">Link</a>
        </uui-table-cell>
        ${ArrayOfUmbracoWords(3).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
    </uui-table>
  `,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};
