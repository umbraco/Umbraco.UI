import './combobox.js';
import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
} from '@open-wc/testing';
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
    element = await fixture(html`
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
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIComboboxElement);
  });

  it('defines uui-combobox-list-option as its own instance', () => {
    expect(element.querySelector('uui-combobox-list-option')).to.be.instanceOf(
      UUIComboboxListOptionElement,
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a search property', () => {
      expect(element).to.have.property('search');
    });
    it('has an open property', () => {
      expect(element).to.have.property('open');
    });
    it('has a value property', () => {
      expect(element).to.have.property('value');
    });
    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.not.equal(null);
    });
    it('renders a prepend slot', () => {
      const slot = element.shadowRoot!.querySelector(
        'slot[name=input-prepend]',
      )!;
      expect(slot).to.not.equal(null);
    });
    it('renders a append slot', () => {
      const slot = element.shadowRoot!.querySelector(
        'slot[name=input-append]',
      )!;
      expect(slot).to.not.equal(null);
    });
  });

  describe('events', () => {
    describe('change', () => {
      it('emits an change event on selection change', async () => {
        const listener = oneEvent(element, UUIComboboxEvent.CHANGE, false);
        const list = element.querySelector('uui-combobox-list');

        const option = list!.children![0] as any;
        expect(option).to.not.equal(null);
        option.click();

        const event = await listener;
        expect(event).to.not.equal(null);
        expect(event.type).to.equal(UUIComboboxEvent.CHANGE);
      });
    });

    describe('input', () => {
      it('emits an input event on file change', async () => {
        const listener = oneEvent(element, UUIComboboxEvent.SEARCH, false);

        element.search = 'new';

        // Emit event, to mimic user interaction:
        element
          .shadowRoot!.querySelector('#combobox-input')!
          .dispatchEvent(new Event('input'));

        const event = await listener;
        expect(event).to.not.equal(null);
        expect(event.type).to.equal(UUIComboboxEvent.SEARCH);
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

      await elementUpdated(element);

      const list = element.querySelector('uui-combobox-list');
      const secondOption = list!.children![1] as any;
      expect(secondOption).to.not.equal(null);
      expect(secondOption.active).to.equal(true);
    });

    it('selects active option when Enter key is pressed', async () => {
      const listener = oneEvent(element, UUIComboboxEvent.CHANGE, false);

      // Open the combobox
      element.open = true;
      await elementUpdated(element);

      // Navigate down one position (starting from index 0, moves to index 1 which is value2)
      element.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          code: 'ArrowDown',
          bubbles: true,
        }),
      );

      await elementUpdated(element);

      // Press Enter to select
      element.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          bubbles: true,
        }),
      );

      const event = await listener;
      expect(event).to.not.equal(null);
      expect(element.value).to.equal('value2');
    });
  });
});
