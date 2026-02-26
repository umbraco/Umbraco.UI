import './table.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';

import './table.element';
import './table-row.element';
import './table-cell.element';
import { UUITableRowElement } from './table-row.element';

/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}

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

  // TODO: add tests with different kinds of elements in the cells
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
  });

  // TODO: add tests with different kinds of elements in the cells
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
  });
});
