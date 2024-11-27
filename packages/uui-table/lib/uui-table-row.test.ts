import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';

import '.';
import { UUITableRowElement } from './uui-table-row.element';

describe('UuiTableRow', () => {
  let element: UUITableRowElement;
  let tableElement: HTMLElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-table-row>
        <uui-table-cell>Cell 1</uui-table-cell>
        <uui-table-cell>Cell 2</uui-table-cell>
        <uui-table-cell>Cell 3</uui-table-cell>
      </uui-table-row>
    `);

    tableElement = await fixture(html` <uui-table> ${element} </uui-table> `);
  });

  it('passes the a11y audit', async () => {
    await expect(tableElement).shadowDom.to.be.accessible();
  });

  it('is defined as its own instance', () => {
    expect(element).to.be.instanceOf(UUITableRowElement);
  });

  describe('properties', () => {
    it('has an selectable property', () => {
      expect(element).to.have.property('selectable');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('selectable', () => {
      it('emits a selected event when selectable', async () => {
        element.selectable = true;
        await elementUpdated(element);
        const listener = oneEvent(element, 'selected');
        element.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('selected');
        expect(element.selected).to.be.true;
      });
    });
  });
});
