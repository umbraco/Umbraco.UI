import './combobox.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import { UUIComboboxElement } from './combobox.element';
import { UUIComboboxEvent } from './UUIComboboxEvent';
import { UUIComboboxListOptionElement } from '../combobox-list/combobox-list.js';

import '../icon/icon.js';
import '../button/button.js';
import '../scroll-container/scroll-container.js';
import '../input/input.js';
import '../popover-container/popover-container.js';
import '../symbol-expand/symbol-expand.js';

describe('UUIComboboxElement', () => {
  let element: UUIComboboxElement;

  beforeEach(async () => {
    element = render(html`
      <uui-combobox>
        <div slot="prepend"></div>
        <div slot="append"></div>
        <uui-combobox-list>
          <uui-combobox-list-option
            value="value1"
            displayValue="value1"></uui-combobox-list-option>
          <uui-combobox-list-option
            value="value2"
            displayValue="value2"></uui-combobox-list-option>
          <uui-combobox-list-option
            value="value3"
            displayValue="value3"></uui-combobox-list-option>
        </uui-combobox-list>
      </uui-combobox>
    `).container.querySelector('uui-combobox')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIComboboxElement);
  });

  it('defines uui-combobox-list-option as its own instance', () => {
    expect(element.querySelector('uui-combobox-list-option')).toBeInstanceOf(
      UUIComboboxListOptionElement,
    );
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has a search property', () => {
      expect(element).toHaveProperty('search');
    });
    it('has an open property', () => {
      expect(element).toHaveProperty('open');
    });
    it('has a value property', () => {
      expect(element).toHaveProperty('value');
    });
    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
    it('renders a prepend slot', () => {
      const slot = element.shadowRoot!.querySelector(
        'slot[name=input-prepend]',
      )!;
      expect(slot).not.toBe(null);
    });
    it('renders a append slot', () => {
      const slot = element.shadowRoot!.querySelector(
        'slot[name=input-append]',
      )!;
      expect(slot).not.toBe(null);
    });
  });

  describe('events', () => {
    describe('change', () => {
      it('emits an change event on selection change', async () => {
        const listener = oneEvent(element, UUIComboboxEvent.CHANGE);
        const list = element.querySelector('uui-combobox-list');

        const option = list!.children![0] as any;
        expect(option).not.toBe(null);
        option.click();

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIComboboxEvent.CHANGE);
      });
    });

    describe('input', () => {
      it('emits an input event on file change', async () => {
        const listener = oneEvent(element, UUIComboboxEvent.SEARCH);

        element.search = 'new';

        // Emit event, to mimic user interaction:
        element
          .shadowRoot!.querySelector('#combobox-input')!
          .dispatchEvent(new Event('input'));

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIComboboxEvent.SEARCH);
      });
    });
  });

  describe('keyboard navigation', () => {
    it('moves `active`-focus to second option on pressing the arrow down key', async () => {
      element.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown' }),
      );
      element.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown' }),
      );

      await element.updateComplete;

      const list = element.querySelector('uui-combobox-list');
      const secondOption = list!.children![1] as any;
      expect(secondOption).not.toBe(null);
      expect(secondOption.active).toBe(true);
    });

    it('selects active option when Enter key is pressed', async () => {
      const listener = oneEvent(element, UUIComboboxEvent.CHANGE);

      // Open the combobox
      element.open = true;
      await element.updateComplete;

      // Navigate down one position (starting from index 0, moves to index 1 which is value2)
      element.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          code: 'ArrowDown',
          bubbles: true,
        }),
      );

      await element.updateComplete;

      // Press Enter to select
      element.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          bubbles: true,
        }),
      );

      const event = await listener;
      expect(event).not.toBe(null);
      expect(element.value).toBe('value2');
    });
  });
});
