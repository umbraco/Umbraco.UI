import './table.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';

import './table.element';
import './table-row.element';
import './table-cell.element';
import { UUITableRowElement } from './table-row.element';

describe('UuiTableRow', () => {
  let element: UUITableRowElement;
  let tableElement: HTMLElement;

  beforeEach(async () => {
    tableElement = render(html`
      <uui-table>
        <uui-table-row>
          <uui-table-cell>Cell 1</uui-table-cell>
          <uui-table-cell>Cell 2</uui-table-cell>
          <uui-table-cell>Cell 3</uui-table-cell>
        </uui-table-row>
      </uui-table>
    `).container.querySelector('uui-table')!;

    await tableElement.updateComplete;
    element = tableElement.querySelector('uui-table-row')!;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(tableElement)).toHaveNoViolations();
  });

  it('is defined as its own instance', () => {
    expect(element).toBeInstanceOf(UUITableRowElement);
  });

  describe('properties', () => {
    it('has an selectable property', () => {
      expect(element).toHaveProperty('selectable');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('events', () => {
    describe('selectable', () => {
      it('emits a selected event when selectable', async () => {
        element.selectable = true;
        await element.updateComplete;
        const listener = oneEvent(element, 'selected');
        element.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('selected');
        expect(element.selected).toBe(true);
      });
    });
  });

  describe('selectable', () => {
    beforeEach(async () => {
      element.selectable = true;
    });

    it('can be selected when selectable', async () => {
      await element.updateComplete;
      element.click();
      expect(element.selected).toBe(true);
    });

    it('can not be selected when not selectable', async () => {
      element.selectable = false;
      await element.updateComplete;
      element.click();
      expect(element.selected).toBe(false);
    });

    it('does not select when clicking a child button in a cell', async () => {
      await element.updateComplete;
      const cell = element.querySelector('uui-table-cell')!;
      const button = document.createElement('button');
      button.textContent = 'Click me';
      cell.appendChild(button);
      button.click();
      expect(element.selected).toBe(false);
    });
  });

  describe('selectable & selectOnly', () => {
    beforeEach(async () => {
      element.selectable = true;
      element.selectOnly = true;
    });

    it('can be selected when selectable', async () => {
      await element.updateComplete;
      element.click();
      expect(element.selected).toBe(true);
    });

    it('can not be selected when not selectable', async () => {
      element.selectable = false;
      await element.updateComplete;
      element.click();
      expect(element.selected).toBe(false);
    });

    it('selects the row when cell contains interactive elements', async () => {
      await element.updateComplete;
      const cell = element.querySelector('uui-table-cell')!;
      expect(cell.hasAttribute('disable-child-interaction')).toBe(true);
      const button = document.createElement('button');
      button.textContent = 'Click me';
      cell.appendChild(button);
      element.click();
      expect(element.selected).toBe(true);
    });
  });
});
