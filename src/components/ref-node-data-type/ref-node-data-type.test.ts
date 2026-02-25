import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
} from '@open-wc/testing';
import '../icon/icon.js';
import { UUIRefNodeDataTypeElement } from './ref-node-data-type.element';
import './ref-node-data-type.js';

describe('UUIRefNodeDataTypeElement', () => {
  let element: UUIRefNodeDataTypeElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-ref-node-data-type name="Data Type"></uui-ref-node-data-type>`,
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has an error property', () => {
      expect(element).to.have.property('error');
    });

    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });

    it('has a name property', () => {
      expect(element).to.have.property('name');
    });

    it('has a detail property', () => {
      expect(element).to.have.property('detail');
    });

    it('has an alias property', () => {
      expect(element).to.have.property('alias');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });

    it('renders an icon slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=icon]')!;
      expect(slot).to.exist;
    });

    it('renders a tag slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=tag]')!;
      expect(slot).to.exist;
    });

    it('renders an actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=actions]')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('open', () => {
      it('emits a open event when info is clicked', async () => {
        const listener = oneEvent(element, 'open', false);
        const infoElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#info');
        infoElement?.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('open');
      });

      it('emits a open event when icon is clicked', async () => {
        const listener = oneEvent(element, 'open', false);
        const iconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#icon');
        iconElement?.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('open');
      });
    });

    describe('selectable', () => {
      it('emits a selected event when selectable', async () => {
        element.selectable = true;
        await elementUpdated(element);
        const listener = oneEvent(element, 'selected', false);
        element.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('selected');
        expect(element.selected).to.be.true;
      });
    });
  });
});
