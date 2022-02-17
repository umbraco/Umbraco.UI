import { html, fixture, expect } from '@open-wc/testing';
import { UUIPopoverElement } from './uui-popover.element';
import '.';

describe('UUIPopoverElement', () => {
  let element: UUIPopoverElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-popover></uui-popover> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIPopoverElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has an useClamp property', () => {
      expect(element).to.have.property('useClamp');
    });

    it('has a useAutoPlacement property', () => {
      expect(element).to.have.property('useAutoPlacement');
    });

    it('has a margin property', () => {
      expect(element).to.have.property('margin');
    });

    it('has a placement property', () => {
      expect(element).to.have.property('placement');
    });

    it('has a open property', () => {
      expect(element).to.have.property('open');
    });
  });
  /*
  describe('events', () => {
    describe('close', () => {
      it('emits a close event when user clicks outside', async () => {
        const listener = oneEvent(element, 'close');
        element.open = true;
        //element.parentElement?.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('close');
      });
    });
  });
*/
});
