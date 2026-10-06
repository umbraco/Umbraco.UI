import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import { UUISelectableEvent } from '../../internal/events';
import { UUICardElement } from './card.element';
import './card.js';

describe('UUICardElement', () => {
  let element: UUICardElement;

  beforeEach(async () => {
    element = render(html`
      <uui-card><span id="content">Card content</span></uui-card>
    `).container.querySelector('uui-card')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUICardElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has a disabled property defaulting to false', () => {
      expect(element).toHaveProperty('disabled');
      expect(element.disabled).toBe(false);
    });

    it('has an error property defaulting to false', () => {
      expect(element).toHaveProperty('error');
      expect(element.error).toBe(false);
    });

    it('has a hasChildren property defaulting to false', () => {
      expect(element).toHaveProperty('hasChildren');
      expect(element.hasChildren).toBe(false);
    });

    it('has an href property defaulting to undefined', () => {
      expect(element.href).toBe(undefined);
    });

    it('has a target property defaulting to undefined', () => {
      expect(element.target).toBe(undefined);
    });

    it('has a rel property defaulting to undefined', () => {
      expect(element.rel).toBe(undefined);
    });

    it('has a selectable property defaulting to false', () => {
      expect(element).toHaveProperty('selectable');
      expect(element.selectable).toBe(false);
    });

    it('has a selected property defaulting to false', () => {
      expect(element).toHaveProperty('selected');
      expect(element.selected).toBe(false);
    });

    it('has a selectOnly property defaulting to false', () => {
      expect(element).toHaveProperty('selectOnly');
      expect(element.selectOnly).toBe(false);
    });
  });

  describe('attribute reflection', () => {
    it('reflects disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('reflects error', async () => {
      element.error = true;
      await element.updateComplete;
      expect(element.hasAttribute('error')).toBe(true);
    });

    it('reflects hasChildren as has-children', async () => {
      element.hasChildren = true;
      await element.updateComplete;
      expect(element.hasAttribute('has-children')).toBe(true);
    });

    it('reflects selectable', async () => {
      element.selectable = true;
      await element.updateComplete;
      expect(element.hasAttribute('selectable')).toBe(true);
    });

    it('reflects selectOnly as select-only', async () => {
      element.selectOnly = true;
      await element.updateComplete;
      expect(element.hasAttribute('select-only')).toBe(true);
    });
  });

  describe('template', () => {
    it('renders a default slot as the open part', () => {
      const slot =
        element.shadowRoot!.querySelector<HTMLSlotElement>('slot#open-part')!;
      expect(slot).not.toBe(null);
      expect(slot.name).toBe('');
    });

    it('assigns light DOM children to the default slot', () => {
      const slot =
        element.shadowRoot!.querySelector<HTMLSlotElement>('slot#open-part')!;
      expect(slot.assignedElements()).toEqual([
        element.querySelector('#content'),
      ]);
    });

    it('renders the select border', () => {
      const selectBorder = element.shadowRoot!.querySelector('#select-border');
      expect(selectBorder).not.toBe(null);
    });
  });

  describe('focus', () => {
    it('is not focusable by default', () => {
      expect(element.getAttribute('tabindex')).toBe(null);
    });

    it('becomes focusable when selectable', async () => {
      element.selectable = true;
      await element.updateComplete;
      expect(element.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('events', () => {
    describe('select', () => {
      it('does not select when not selectable', async () => {
        element.click();
        await element.updateComplete;
        expect(element.selected).toBe(false);
      });

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
