import '.';

import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import '@umbraco-ui/uui-avatar/lib';
import { UUISelectableEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUICardEvent } from '@umbraco-ui/uui-card/lib';

import { UUICardUserElement } from './uui-card-user.element';

describe('UUICardUserElement', () => {
  let element: UUICardUserElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-card-user name="John Rabbit"></uui-card-user>
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

    it('has a selectable property', () => {
      expect(element).to.have.property('selectable');
    });

    it('has a selectOnly property', () => {
      expect(element).to.have.property('selectOnly');
    });

    it('has a selected property', () => {
      expect(element).to.have.property('selected');
    });

    it('has a name property', () => {
      expect(element).to.have.property('name');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
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

    it('renders an avatar slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=avatar]')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('open', () => {
      it('emits a open event when open-part is clicked', async () => {
        const listener = oneEvent(element, UUICardEvent.OPEN);
        const infoElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#open-part');
        infoElement?.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUICardEvent.OPEN);
      });
    });

    describe('select', () => {
      it('emits a selected event when selectable', async () => {
        element.selectable = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUISelectableEvent.SELECTED);
        element.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUISelectableEvent.SELECTED);
        expect(element.selected).to.be.true;
      });
    });

    describe('deselect', () => {
      it('emits a deselected event when preselected', async () => {
        element.selectable = true;
        element.selected = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUISelectableEvent.DESELECTED);
        element.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUISelectableEvent.DESELECTED);
        expect(element.selected).to.be.false;
      });
    });
  });
});
