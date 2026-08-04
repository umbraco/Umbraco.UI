import './table.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';

import { UUITableCellElement } from './table-cell.element';
import { UUITableRowElement } from './table-row.element';
import { UUITableElement } from './table.element';

describe('UuiTable', () => {
  let table: UUITableElement;
  beforeEach(async () => {
    table = render(html`
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
          <uui-table-cell>Hello long text 3</uui-table-cell>
        </uui-table-row>
      </uui-table>
    `).container.querySelector('uui-table')!;

    await table.updateComplete;
  });

  it('renders a slot', () => {
    const slot = table.shadowRoot!.querySelector('slot');
    expect(slot).not.toBe(null);
  });

  it('CELL: detects overflow', async () => {
    const slot = table.shadowRoot!.querySelector('slot');
    const row = slot?.assignedElements()[5] as UUITableRowElement;
    const cell = row
      .shadowRoot!.querySelector('slot')
      ?.assignedElements()[2] as UUITableCellElement;
    cell.setAttribute('clip-text', 'true');
    await cell.updateComplete;
    expect(cell.getAttribute('title')).toBe('Hello long text 3');
    expect(cell.title).toBe('Hello long text 3');
  });

  it('ROW: Adds selected attribute when clicked', async () => {
    const slot = table.shadowRoot!.querySelector('slot');
    const row = slot?.assignedElements()[4] as UUITableRowElement;
    row.click();
    await row.updateComplete;
    expect(row.selected).toBe(true);
  });

  it('ROW: Clicking on row without selectable should do nothing', async () => {
    const slot = table.shadowRoot!.querySelector('slot');
    const row = slot?.assignedElements()[5] as UUITableRowElement;
    row.click();
    await row.updateComplete;
    expect(row.selected).toBe(false);
  });

  it('does not render wider than its container (box-sizing)', async () => {
    // Regression: the host sets `width: 100%` and a 1px border, so without
    // `box-sizing: border-box` the border is added outside the width and the
    // element renders 2px wider than its container.
    const wrapper = render(html`
      <div style="width: 400px; padding: 0; border: 0">
        <uui-table>
          <uui-table-head>
            <uui-table-head-cell>A</uui-table-head-cell>
            <uui-table-head-cell>B</uui-table-head-cell>
          </uui-table-head>
          <uui-table-row>
            <uui-table-cell>1</uui-table-cell>
            <uui-table-cell>2</uui-table-cell>
          </uui-table-row>
        </uui-table>
      </div>
    `).container.firstElementChild as HTMLElement;
    const constrained = wrapper.querySelector('uui-table') as UUITableElement;
    await constrained.updateComplete;
    expect(constrained.offsetWidth).toBe(wrapper.clientWidth);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(table)).toHaveNoViolations();
  });
});
