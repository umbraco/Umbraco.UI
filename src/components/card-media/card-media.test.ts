import './card-media.js';
import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
} from '@open-wc/testing';
import '../symbol-folder/symbol-folder.js';
import '../symbol-file/symbol-file.js';
import { UUICardMediaElement } from './card-media.element';
import { UUICardEvent } from '../card/card.js';
import { UUISelectableEvent } from '../../internal/events';

describe('UUICardMediaElement', () => {
  let element: UUICardMediaElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-card-media name="Media item"></uui-card-media>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUICardMediaElement);
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

    it('has a fileExt property', () => {
      expect(element).to.have.property('fileExt');
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
      it('do react to a click event on performed in this way', async () => {
        element.selectable = true;
        await elementUpdated(element);
        element.click();
        await Promise.resolve();
        expect(element.selected).to.equal(true);
      });
      it('do not react to a click event on other parts', async () => {
        element.selectable = true;
        await elementUpdated(element);
        const listener = oneEvent(element, UUICardEvent.OPEN);
        element
          .shadowRoot!.querySelector<HTMLAnchorElement>('#open-part')!
          .click();
        const event = await listener;
        expect(event).to.not.equal(null);
        expect(event.type).to.equal(UUICardEvent.OPEN);
        expect(element.selected).to.equal(false);
      });
      it('do not react to a click event on other parts as href', async () => {
        element.selectable = true;
        element.href = '#hello';
        await elementUpdated(element);
        element
          .shadowRoot!.querySelector<HTMLAnchorElement>('#open-part')!
          .click();
        await Promise.resolve();
        expect(element.selected).to.equal(false);
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
