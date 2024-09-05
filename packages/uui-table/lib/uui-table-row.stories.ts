import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

const meta: Meta = {
  id: 'uui-table-row',
  component: 'uui-table-row',
  title: 'Layout/Table/Table Row',
  render: args => html`
    <uui-table>
      <uui-table-row
        ?selectable=${args.selectable}
        ?selectOnly=${args.selectOnly}>
        ${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
      <uui-table-row
        ?selectable=${args.selectable}
        ?selectOnly=${args.selectOnly}>
        <uui-table-cell>
          <uui-input placeholder="Type your own thing"></uui-input>
        </uui-table-cell>
        ${ArrayOfUmbracoWords(5).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
    </uui-table>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};
