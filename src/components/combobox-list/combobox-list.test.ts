import './combobox-list.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIComboboxListElement } from './combobox-list.element';
import { UUIComboboxListOptionElement } from '../combobox-list/combobox-list.js';

describe('UUIComboboxListElement', () => {
  let element: UUIComboboxListElement;

  beforeEach(async () => {
    element = render(html`
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
    `).container.querySelector('uui-combobox-list')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIComboboxListElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has a value property', () => {
      expect(element).toHaveProperty('value');
    });
    it('has a displayValue property', () => {
      expect(element).toHaveProperty('displayValue');
    });
    it('has a for property', () => {
      expect(element).toHaveProperty('for');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });
  /*
  describe('events', () => {
    describe('change', () => {
      It should not emit an event unless the action is originating from user action.
      it('emits an change event on value change', async () => {
        const listener = oneEvent(element, UUIComboboxListEvent.CHANGE, false);
        element.value = 'new';
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe(UUIComboboxListEvent.CHANGE);
      });
    });
  });
  */

  //* For some reason this has to be inside the first describe for webkit to run the tests.
  describe('UUIComboboxListOptionElement', () => {
    let element: UUIComboboxListOptionElement;

    beforeEach(async () => {
      element = render(html`
        <uui-combobox-list-option
          value="value1"
          displayValue="value1"></uui-combobox-list-option>
      `).container.querySelector('uui-combobox-list-option')!;

      await element.updateComplete;
    });

    it('is defined with its own instance', () => {
      expect(element).toBeInstanceOf(UUIComboboxListOptionElement);
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });

    describe('properties', () => {
      it('has a value property', () => {
        expect(element).toHaveProperty('value');
      });
      it('has a displayValue property', () => {
        expect(element).toHaveProperty('displayValue');
      });
      it('has a displayValue property', () => {
        expect(element).toHaveProperty('disabled');
      });
    });

    describe('template', () => {
      it('renders a default slot', () => {
        const slot = element.shadowRoot!.querySelector('slot')!;
        expect(slot).not.toBe(null);
      });
    });
  });
});
