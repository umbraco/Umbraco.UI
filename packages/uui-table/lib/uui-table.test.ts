import '../define';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import { UUITableCellElement } from './uui-table-cell.element';
import { UUITableRowElement } from './uui-table-row.element';
import { UUITableElement } from './uui-table.element';

describe('UuiTable', () => {
  let table: UUITableElement;
  beforeEach(async () => {
    table = await fixture(
      html`
        <uui-table
          aria-label="Random Umbraco Words"
          aria-describedby="table-decription">
          <uui-table-column style="width: 95%"> </uui-table-column>
          <uui-table-column style="width: 95%"> </uui-table-column>
          <uui-table-column style="width: 1%"> </uui-table-column>
          <uui-table-head>
            <uui-table-head-cell>Hello 1</uui-table-head-cell>
            <uui-table-head-cell>Hello 1</uui-table-head-cell>
            <uui-table-head-cell>Hello 1</uui-table-head-cell>
          </uui-table-head>
          <uui-table-row selectable>
            <uui-table-cell>Hello 2</uui-table-cell>
            <uui-table-cell>Hello 2</uui-table-cell>
            <uui-table-cell>Hello 2</uui-table-cell>
          </uui-table-row>
          <uui-table-row>
            <uui-table-cell>Hello 3</uui-table-cell>
            <uui-table-cell>Hello 3</uui-table-cell>
            <uui-table-cell>Hello 3</uui-table-cell>
          </uui-table-row>
        </uui-table>
      `
    );
  });

  it('renders a slot', () => {
    const slot = table.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('CELL: detects overflow', async () => {
    const slot = table.shadowRoot!.querySelector('slot');
    const row = slot?.assignedElements()[5] as UUITableRowElement;
    const cell = row
      .shadowRoot!.querySelector('slot')
      ?.assignedElements()[2] as UUITableCellElement;
    cell.setAttribute('clip-text', 'true');
    await elementUpdated(cell);
    expect(cell.title).to.equal('Hello 3');
  });

  it('ROW: Adds selected attribute when clicked', async () => {
    const slot = table.shadowRoot!.querySelector('slot');
    const row = slot?.assignedElements()[4] as UUITableRowElement;
    row.click();
    await elementUpdated(row);
    expect(row.selected).to.be.true;
  });

  it('ROW: Clicking on row without selectable should do nothing', async () => {
    const slot = table.shadowRoot!.querySelector('slot');
    const row = slot?.assignedElements()[5] as UUITableRowElement;
    row.click();
    await elementUpdated(row);
    expect(row.selected).to.be.false;
  });

  it('passes the a11y audit', done => {
    expect(table).shadowDom.to.be.accessible({ done });
  });
});
