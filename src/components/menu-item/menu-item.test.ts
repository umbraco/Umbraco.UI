import './menu-item.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import '../symbol-expand/symbol-expand.js';
import '../loader-bar/loader-bar.js';
import { UUIMenuItemElement } from './menu-item.element';
import { UUIMenuItemEvent } from './UUIMenuItemEvent';
import { UUISelectableEvent } from '../../internal/events';
import { UUITestMouse } from '../../internal/test/index';

describe('UUIMenuItemElement', () => {
  describe('element', () => {
    let element: UUIMenuItemElement;

    beforeEach(async () => {
      element = render(
        html`<uui-menu-item label="menuitem"></uui-menu-item>`,
      ).container.querySelector('uui-menu-item')!;

      await element.updateComplete;
    });

    it('is defined', () => {
      expect(element).toBeInstanceOf(UUIMenuItemElement);
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });

    it('passes the a11y audit with nesting', async () => {
      element = render(
        html`<uui-menu-item label="menuitem" has-children>
          <uui-menu-item label="sub-menuitem"></uui-menu-item>
          <uui-menu-item label="sub-menuitem"></uui-menu-item>
        </uui-menu-item>`,
      ).container.querySelector('uui-menu-item')!;

      await element.updateComplete;
      expect(await axeRun(element)).toHaveNoViolations();
    });

    describe('properties', () => {
      it('has a disabled property', () => {
        expect(element).toHaveProperty('disabled');
      });
      it('disable property defaults to false', () => {
        expect(element.disabled).toBe(false);
      });

      it('has a showChildren property', () => {
        expect(element).toHaveProperty('showChildren');
      });
      it('showChildren property defaults to false', () => {
        expect(element.showChildren).toBe(false);
      });

      it('has a hasChildren property', () => {
        expect(element).toHaveProperty('hasChildren');
      });
      it('hasChildren property defaults to false', () => {
        expect(element.hasChildren).toBe(false);
      });

      it('has a loading property', () => {
        expect(element).toHaveProperty('loading');
      });
      it('loading property defaults to false', () => {
        expect(element.loading).toBe(false);
      });

      it('has a href property', () => {
        expect(element).toHaveProperty('href');
      });

      it('has a target property', () => {
        expect(element).toHaveProperty('target');
      });

      it('has a rel property', () => {
        expect(element).toHaveProperty('rel');
      });

      it('has a select-mode property', () => {
        expect(element).toHaveProperty('selectMode');
      });

      it('select-mode property defaults to undefined', () => {
        expect(element.selectMode).toBeUndefined();
      });
    });

    describe('events', () => {
      it('emits a click-label event when button is clicked', async () => {
        const listener = oneEvent(element, UUIMenuItemEvent.CLICK_LABEL);

        const buttonElement = element.shadowRoot!.querySelector(
          'button#label-button',
        ) as HTMLButtonElement;
        expect(buttonElement).not.toBe(null);
        buttonElement.click();

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIMenuItemEvent.CLICK_LABEL);
        expect(event.bubbles).toBe(false);
        expect(event.composed).toBe(false);
        expect(event!.target).toBe(element);
      });

      describe('select', async () => {
        it('emits a cancelable selected event when selectable', async () => {
          element.selectable = true;
          await element.updateComplete;
          const labelElement = element.shadowRoot!.querySelector(
            '#label-button',
          ) as HTMLElement;
          element.addEventListener(UUISelectableEvent.SELECTED, e => {
            e.preventDefault();
          });
          const listener = oneEvent(element, UUISelectableEvent.SELECTED);
          labelElement.click();
          const event = await listener;
          expect(event).not.toBe(null);
          expect(event.type).toBe(UUISelectableEvent.SELECTED);
          expect(element.selected).toBe(false);
        });
      });

      describe('deselect', async () => {
        it('emits a cancelable deselected event when preselected', async () => {
          element.selectable = true;
          element.selected = true;
          await element.updateComplete;
          const labelElement = element.shadowRoot!.querySelector(
            '#label-button',
          ) as HTMLElement;
          element.addEventListener(UUISelectableEvent.DESELECTED, e => {
            e.preventDefault();
          });
          const listener = oneEvent(element, UUISelectableEvent.DESELECTED);
          labelElement.click();
          const event = await listener;
          expect(event).not.toBe(null);
          expect(event.type).toBe(UUISelectableEvent.DESELECTED);
          expect(element.selected).toBe(true);
        });
      });

      describe('show-children', async () => {
        it('emits a show-children event when expanded', async () => {
          element.hasChildren = true;
          await element.updateComplete;
          const labelElement = element.shadowRoot!.querySelector(
            '#caret-button',
          ) as HTMLElement;
          const listener = oneEvent(element, UUIMenuItemEvent.SHOW_CHILDREN);
          labelElement.click();
          const event = await listener;
          expect(event).not.toBe(null);
          expect(event.type).toBe(UUIMenuItemEvent.SHOW_CHILDREN);
          expect(element.showChildren).toBe(true);
        });
        it('emits a cancelable show-children event when expanded', async () => {
          element.hasChildren = true;
          await element.updateComplete;
          const labelElement = element.shadowRoot!.querySelector(
            '#caret-button',
          ) as HTMLElement;
          element.addEventListener(UUIMenuItemEvent.SHOW_CHILDREN, e => {
            e.preventDefault();
          });
          const listener = oneEvent(element, UUIMenuItemEvent.SHOW_CHILDREN);
          labelElement.click();
          const event = await listener;
          expect(event).not.toBe(null);
          expect(event.type).toBe(UUIMenuItemEvent.SHOW_CHILDREN);
          expect(element.showChildren).toBe(false);
        });
      });

      describe('hide-children', async () => {
        it('emits a hide-children event when collapsed', async () => {
          element.hasChildren = true;
          element.showChildren = true;
          await element.updateComplete;
          const labelElement = element.shadowRoot!.querySelector(
            '#caret-button',
          ) as HTMLElement;
          const listener = oneEvent(element, UUIMenuItemEvent.HIDE_CHILDREN);
          labelElement.click();
          const event = await listener;
          expect(event).not.toBe(null);
          expect(event.type).toBe(UUIMenuItemEvent.HIDE_CHILDREN);
          expect(element.showChildren).toBe(false);
        });
        it('emits a cancelable hide-children event when collapsed', async () => {
          element.hasChildren = true;
          element.showChildren = true;
          await element.updateComplete;
          const labelElement = element.shadowRoot!.querySelector(
            '#caret-button',
          ) as HTMLElement;
          element.addEventListener(UUIMenuItemEvent.HIDE_CHILDREN, e => {
            e.preventDefault();
          });
          const listener = oneEvent(element, UUIMenuItemEvent.HIDE_CHILDREN);
          labelElement.click();
          const event = await listener;
          expect(event).not.toBe(null);
          expect(event.type).toBe(UUIMenuItemEvent.HIDE_CHILDREN);
          expect(element.showChildren).toBe(true);
        });
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

      it('renders an actions slot', () => {
        const slot = element.shadowRoot!.querySelector('slot[name=actions]')!;
        expect(slot).not.toBe(null);
      });

      it('renders a button', () => {
        const slot = element.shadowRoot!.querySelector('button')!;
        expect(slot).not.toBe(null);
      });
      it('renders a anchor tag when href is defined', () => {
        element.setAttribute('href', 'https://www.umbraco.com');
        const slot = element.shadowRoot!.querySelector('button')!;
        expect(slot).not.toBe(null);
      });
    });

    describe('expand', () => {
      it('emits a show-children event when expand icon is clicked', async () => {
        element.setAttribute('has-children', 'true');
        await element.updateComplete;
        const listener = oneEvent(element, 'show-children');
        const caretIconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#caret-button');
        caretIconElement?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('show-children');
        expect(element.hasAttribute('show-children')).toBe(true);
      });

      it('emits a hide-children event when collapse icon is clicked', async () => {
        element.setAttribute('has-children', 'true');
        element.setAttribute('show-children', 'true');
        await element.updateComplete;
        const listener = oneEvent(element, 'hide-children');
        const caretIconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#caret-button');
        caretIconElement?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('hide-children');
        expect(element.hasAttribute('show-children')).toBe(false);
      });
    });

    describe('selectable', () => {
      let labelElement: HTMLElement | null;
      const mouse = new UUITestMouse();

      beforeEach(async () => {
        labelElement = element.shadowRoot!.querySelector('#label-button');
        element.selectable = true;
      });

      it('label element is defined', () => {
        expect(labelElement).toBeInstanceOf(HTMLElement);
      });

      it('label is rendered as a button tag', async () => {
        await element.updateComplete;
        expect(labelElement?.nodeName).toBe('BUTTON');
      });

      it('can be selected when selectable', async () => {
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(true);
      });

      it('can not be selected when not selectable', async () => {
        element.selectable = false;
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(false);
      });

      it('can not be selected when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(false);
      });

      it('can expand', async () => {
        element.setAttribute('has-children', 'true');
        await element.updateComplete;
        const listener = oneEvent(element, 'show-children');
        const caretIconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#caret-button');
        caretIconElement?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('show-children');
        expect(element.hasAttribute('show-children')).toBe(true);
      });
    });

    describe('selectable & selectOnly', () => {
      let labelElement: HTMLElement | null;
      const mouse = new UUITestMouse();

      beforeEach(async () => {
        labelElement = element.shadowRoot!.querySelector('#label-button');
        element.selectable = true;
        element.selectOnly = true;
      });

      it('label element is defined', () => {
        expect(labelElement).toBeInstanceOf(HTMLElement);
      });

      it('label is rendered as a button tag', async () => {
        await element.updateComplete;
        expect(labelElement?.nodeName).toBe('BUTTON');
      });

      it('can be selected when selectable', async () => {
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(true);
      });

      it('can not be selected when not selectable', async () => {
        element.selectable = false;
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(false);
      });

      it('can not be selected when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(false);
      });

      it('can expand', async () => {
        element.setAttribute('has-children', 'true');
        await element.updateComplete;
        const listener = oneEvent(element, 'show-children');
        const caretIconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#caret-button');
        caretIconElement?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('show-children');
        expect(element.hasAttribute('show-children')).toBe(true);
      });
    });
  });

  describe('HREF', () => {
    let labelElement: HTMLElement;
    let element: UUIMenuItemElement;

    beforeEach(async () => {
      element = render(
        html`<uui-menu-item
          label="menuitem"
          href="https://www.umbraco.com"></uui-menu-item>`,
      ).container.querySelector('uui-menu-item')!;

      await element.updateComplete;
      labelElement = element.shadowRoot!.querySelector(
        '#label-button',
      ) as HTMLElement;
    });

    it('label element is defined', () => {
      expect(labelElement).toBeInstanceOf(HTMLElement);
    });

    it('label is rendered as an anchor tag', async () => {
      await element.updateComplete;
      expect(labelElement.nodeName).toBe('A');
    });

    it('target is applied to anchor tag', async () => {
      element.target = '_self';
      await element.updateComplete;
      expect(labelElement.getAttribute('target')).toBe('_self');
    });

    it('when target is _blank and rel is not defined rel attribute is set.', async () => {
      element.target = '_blank';
      await element.updateComplete;
      expect(labelElement.getAttribute('target')).toBe('_blank');
      expect(labelElement.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('when rel is applied to anchor tag.', async () => {
      element.rel = 'noreferrer';
      await element.updateComplete;
      expect(labelElement.getAttribute('rel')).toBe('noreferrer');
    });

    it('when target is _blank and rel is defined rel attribute is set.', async () => {
      element.target = '_blank';
      element.rel = 'noopener';
      await element.updateComplete;
      expect(labelElement.getAttribute('target')).toBe('_blank');
      expect(labelElement.getAttribute('rel')).toBe('noopener');
    });

    describe('selectable', () => {
      const mouse = new UUITestMouse();

      beforeEach(async () => {
        element.selectable = true;
      });

      it('can be selected when selectable', async () => {
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(true);
      });

      it('can not be selected when not selectable', async () => {
        /* TODO: Figure out what should happen when selectable is false
        Right now it navigates to the href
        element.selectable = false;
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(false);
        */
      });

      it('can not be selected when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(false);
      });

      it('can expand', async () => {
        element.setAttribute('has-children', 'true');
        await element.updateComplete;
        const listener = oneEvent(element, 'show-children');
        const caretIconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#caret-button');
        caretIconElement?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('show-children');
        expect(element.hasAttribute('show-children')).toBe(true);
      });
    });

    describe('selectable & selectOnly', () => {
      const mouse = new UUITestMouse();

      beforeEach(async () => {
        element.selectable = true;
        element.selectOnly = true;
      });

      it('can be selected when selectable', async () => {
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(true);
      });

      it('can not be selected when not selectable', async () => {
        element.selectable = false;
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(false);
      });

      it('can not be selected when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;
        await mouse.leftClick(element);
        expect(element.selected).toBe(false);
      });

      it('can expand', async () => {
        element.setAttribute('has-children', 'true');
        await element.updateComplete;
        const listener = oneEvent(element, 'show-children');
        const caretIconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#caret-button');
        caretIconElement?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('show-children');
        expect(element.hasAttribute('show-children')).toBe(true);
      });
    });
  });
});
