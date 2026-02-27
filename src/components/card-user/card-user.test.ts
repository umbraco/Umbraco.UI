import './card-user.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';

import '../avatar/avatar.js';
import { UUISelectableEvent } from '../../internal/events';
import { UUICardEvent } from '../card/card.js';

import { UUICardUserElement } from './card-user.element';

describe('UUICardUserElement', () => {
  let element: UUICardUserElement;

  beforeEach(async () => {
    element = render(html`
      <uui-card-user name="John Rabbit"></uui-card-user>
    `).container.querySelector('uui-card-user')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has an error property', () => {
      expect(element).toHaveProperty('error');
    });

    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });

    it('has a selectable property', () => {
      expect(element).toHaveProperty('selectable');
    });

    it('has a selectOnly property', () => {
      expect(element).toHaveProperty('selectOnly');
    });

    it('has a selected property', () => {
      expect(element).toHaveProperty('selected');
    });

    it('has a name property', () => {
      expect(element).toHaveProperty('name');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });

    it('renders a tag slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=tag]')!;
      expect(slot).not.toBe(null);
    });

    it('renders an actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=actions]')!;
      expect(slot).not.toBe(null);
    });

    it('renders an avatar slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=avatar]')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('events', () => {
    describe('open', () => {
      it('emits a open event when open-part is clicked', async () => {
        const infoElement =
          element.shadowRoot!.querySelector<HTMLElement>('#open-part');
        expect(infoElement).not.toBe(null);
        const listener = oneEvent(element, UUICardEvent.OPEN);
        infoElement!.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUICardEvent.OPEN);
      });
    });

    describe('select', () => {
      it('emits a selected event when selectable', async () => {
        element.selectable = true;
        await element.updateComplete;
        const listener = oneEvent(element, UUISelectableEvent.SELECTED);
        element.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUISelectableEvent.SELECTED);
        expect(element.selected).toBe(true);
      });

      it('can be selected with keyboard', async () => {
        element.selectable = true;
        await element.updateComplete;

        const listener = oneEvent(element, UUISelectableEvent.SELECTED);
        element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUISelectableEvent.SELECTED);
        expect(element.selected).toBe(true);

        const unselectedListener = oneEvent(
          element,
          UUISelectableEvent.DESELECTED,
        );
        element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        const event2 = await unselectedListener;
        expect(event2).not.toBe(null);
        expect(event2.type).toBe(UUISelectableEvent.DESELECTED);
        expect(element.selected).toBe(false);
      });
    });

    describe('deselect', () => {
      it('emits a deselected event when preselected', async () => {
        element.selectable = true;
        element.selected = true;
        await element.updateComplete;
        const listener = oneEvent(element, UUISelectableEvent.DESELECTED);
        element.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUISelectableEvent.DESELECTED);
        expect(element.selected).toBe(false);
      });
    });
  });
});
