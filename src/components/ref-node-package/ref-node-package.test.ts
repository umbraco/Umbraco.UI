import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
} from '@open-wc/testing';
import '../icon/icon.js';
import { UUIRefNodePackageElement } from './ref-node-package.element';
import './ref-node-package.js';

describe('UUIRefNodePackageElement', () => {
  let element: UUIRefNodePackageElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-ref-node-package name="Package"></uui-ref-node-package>
    `);
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

    it('has a version property', () => {
      expect(element).to.have.property('version');
    });

    it('has an author property', () => {
      expect(element).to.have.property('author');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.not.equal(null);
    });

    it('renders an icon slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=icon]')!;
      expect(slot).to.not.equal(null);
    });

    it('renders a tag slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=tag]')!;
      expect(slot).to.not.equal(null);
    });

    it('renders an actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=actions]')!;
      expect(slot).to.not.equal(null);
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
        expect(event).to.not.equal(null);
        expect(event.type).to.equal('open');
      });

      it('emits a open event when icon is clicked', async () => {
        const listener = oneEvent(element, 'open', false);
        const iconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#icon');
        iconElement?.click();
        const event = await listener;
        expect(event).to.not.equal(null);
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
        expect(event).to.not.equal(null);
        expect(event.type).to.equal('selected');
        expect(element.selected).to.equal(true);
      });
    });
  });
});
