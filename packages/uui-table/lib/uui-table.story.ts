import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

import '@umbraco-ui/uui-box/lib';
import '@umbraco-ui/uui-symbol-sort/lib';
import './uui-table-advanced-example.ts';

const meta: Meta = {
  id: 'uui-table',
  component: 'uui-table',
  title: 'Layout/Table/Table',
  subcomponents: {
    UUITableColumn: 'uui-table-column',
    UUITableHead: 'uui-table-head',
    UUITableHeadCell: 'uui-table-head-cell',
    UUITableRow: 'uui-table-row',
    UUITableCell: 'uui-table-cell',
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    headBackgroundColor: '',
    headColor: '',
    backgroundColor1: '',
    backgroundColor2: '',
    backgroundColor3: '',
  },
  argTypes: {
    headBackgroundColor: {
      name: 'Table Head Background Color',
      table: { category: 'Styling' },
      control: 'color',
    },
    headColor: {
      name: 'Table Head Color',
      table: { category: 'Styling' },
      control: 'color',
    },
    backgroundColor1: {
      name: 'Column 1 Background Color',
      table: { category: 'Styling' },
      control: 'color',
    },
    backgroundColor2: {
      name: 'Column 2 Background Color',
      table: { category: 'Styling' },
      control: 'color',
    },
    backgroundColor3: {
      name: 'Column 3 Background Color',
      table: { category: 'Styling' },
      control: 'color',
    },
  },
  render: args => html`
    <uui-table
      aria-label="Random Umbraco Words"
      aria-describedby="table-description">
      <uui-table-column style="background-color: ${args.backgroundColor1}">
      </uui-table-column>
      <uui-table-column
        style="width: 40%; background-color: ${args.backgroundColor2}">
      </uui-table-column>
      <uui-table-column
        style="width: 40%; background-color: ${args.backgroundColor3}">
      </uui-table-column>
      <uui-table-head
        style="background-color: ${args.headBackgroundColor}; color: ${args.headColor}">
        ${ArrayOfUmbracoWords(3).map(
          el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`,
        )}
      </uui-table-head>
      <uui-table-row>
        ${ArrayOfUmbracoWords(3).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
      <uui-table-row>
        ${ArrayOfUmbracoWords(3).map(
          el => html`<uui-table-cell>${el}</uui-table-cell>`,
        )}
      </uui-table-row>
    </uui-table>
  `,
};

export const OverflowDetection: Story = {
  render: () => html`
    <h5>
      Overflowing text is indicated by three dots. <br />
      Hover over wrapped cells to see a title with full text
    </h5>
    <div style="width: 30%;">
      <uui-table>
        <uui-table-column
          style="width: 5%; min-width: 32px; max-width: 48px;"></uui-table-column>
        <uui-table-head>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`,
          )}
        </uui-table-head>
        <uui-table-row>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-cell clip-text>${el}</uui-table-cell>`,
          )}
        </uui-table-row>
        <uui-table-row>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-cell clip-text>${el}</uui-table-cell>`,
          )}
        </uui-table-row>
      </uui-table>
    </div>
  `,
};

export const InABox: Story = {
  render: () => html`
    <uui-box style="--uui-box-default-padding: 0;">
      <uui-table>
        <uui-table-head>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-head-cell>${el}</uui-table-head-cell>`,
          )}
        </uui-table-head>
        <uui-table-row>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`,
          )}
        </uui-table-row>
        <uui-table-row>
          ${ArrayOfUmbracoWords(7).map(
            el => html`<uui-table-cell>${el}</uui-table-cell>`,
          )}
        </uui-table-row>
      </uui-table>
    </uui-box>
  `,
};

export const Advanced: Story = {
  args: {
    selectAllLabel: 'Select all rows',
    selectRowLabel: 'Select',
  },
  argTypes: {
    selectAllLabel: {
      name: 'Select All Label',
      description: 'Label for the select all checkbox',
      control: 'text',
    },
    selectRowLabel: {
      name: 'Select Row Label',
      description: 'Label for individual row checkboxes (item name will be appended)',
      control: 'text',
    },
  },
  render: args =>
    html`<uui-table-with-selection-example
      select-all-label="${args.selectAllLabel || 'Select all rows'}"
      select-row-label="${args.selectRowLabel || 'Select'}"></uui-table-with-selection-example>`,
};
