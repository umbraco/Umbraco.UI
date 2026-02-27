import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
} from '@open-wc/testing';
import '../symbol-folder/symbol-folder.js';
import '../symbol-file/symbol-file.js';
import { UUICardBlockTypeElement } from './card-block-type.element';
import './card-block-type.js';
import { UUICardEvent } from '../card/card.js';
import { UUISelectableEvent } from '../../internal/events';

describe('UUICardBlockTypeElement', () => {
  let element: UUICardBlockTypeElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-card-block-type name="Block type"></uui-card-block-type>
    `);
  });

  // TODO: a11y audit times out in Webkit CI due to nested symbol SVG rendering
  it.skip('passes the a11y audit', async () => {
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

    it('has a description property', () => {
      expect(element).to.have.property('description');
    });

    it('has a background property', () => {
      expect(element).to.have.property('background');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
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
      it('emits a open event when open-part is clicked', async () => {
        const infoElement =
          element.shadowRoot!.querySelector<HTMLElement>('#open-part');
        expect(infoElement).to.not.equal(null);
        const listener = oneEvent(element, UUICardEvent.OPEN);
        infoElement!.click();
        const event = await listener;
        expect(event).to.not.equal(null);
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
        expect(event).to.not.equal(null);
        expect(event.type).to.equal(UUISelectableEvent.SELECTED);
        expect(element.selected).to.equal(true);
      });

      it('can be selected with keyboard', async () => {
        element.selectable = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUISelectableEvent.SELECTED);
        element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        const event = await listener;
        expect(event).to.not.equal(null);
        expect(event.type).to.equal(UUISelectableEvent.SELECTED);
        expect(element.selected).to.equal(true);

        const unselectedListener = oneEvent(
          element,
          UUISelectableEvent.DESELECTED,
        );
        element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        const event2 = await unselectedListener;
        expect(event2).to.not.equal(null);
        expect(event2.type).to.equal(UUISelectableEvent.DESELECTED);
        expect(element.selected).to.equal(false);
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
        expect(event).to.not.equal(null);
        expect(event.type).to.equal(UUISelectableEvent.DESELECTED);
        expect(element.selected).to.equal(false);
      });
    });
  });
});
