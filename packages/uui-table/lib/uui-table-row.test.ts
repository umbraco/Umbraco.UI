import {
  html,
  fixture,
  expect,
  elementUpdated,
  oneEvent,
} from '@open-wc/testing';
import { UUITableRowElement } from './uui-table-row.element';
import './index';

describe('UuiTableRow', () => {
  let element: UUITableRowElement;
  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-table-row>
          <uui-table-cell>Cell 1</uui-table-cell>
          <uui-table-cell>Cell 2</uui-table-cell>
          <uui-table-cell>Cell 3</uui-table-cell>
        </uui-table-row>
      `
    );
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
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
