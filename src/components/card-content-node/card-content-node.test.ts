import '../icon/icon.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import { UUISelectableEvent } from '../../internal/events';
import { UUICardEvent } from '../card/card.js';
import { UUICardContentNodeElement } from './card-content-node.element';
import './card-content-node.js';

describe('UUICardContentNodeElement', () => {
  let element: UUICardContentNodeElement;

  beforeEach(async () => {
    element = render(html`
      <uui-card-content-node name="Content Node Name"></uui-card-content-node>
    `).container.querySelector('uui-card-content-node')!;

    await element.updateComplete;
  });

  // TODO: a11y audit times out in Webkit CI due to nested uui-icon SVG rendering
  it.skip('passes the a11y audit', async () => {
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

    it('renders an icon slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=icon]')!;
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
  });

  describe('events', () => {
    describe('open', () => {
      it('emits a open event when info is clicked', async () => {
        const infoElement =
          element.shadowRoot!.querySelector<HTMLElement>('#open-part');
        expect(infoElement).not.toBe(null);
        const listener = oneEvent(element, UUICardEvent.OPEN);
        infoElement!.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUICardEvent.OPEN);
      });

      it('emits a open event when icon is clicked', async () => {
        const iconElement =
          element.shadowRoot!.querySelector<HTMLElement>('#icon');
        expect(iconElement).not.toBe(null);
        const listener = oneEvent(element, UUICardEvent.OPEN);
        iconElement!.click();
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
