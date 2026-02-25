import './combobox-list.js';
import { html, fixture, expect } from '@open-wc/testing';
import { UUIComboboxListElement } from './combobox-list.element';
import { UUIComboboxListOptionElement } from '../combobox-list/combobox-list.js';

describe('UUIComboboxListElement', () => {
  let element: UUIComboboxListElement;

  beforeEach(async () => {
    element = await fixture(html`
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
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIComboboxListElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a value property', () => {
      expect(element).to.have.property('value');
    });
    it('has a displayValue property', () => {
      expect(element).to.have.property('displayValue');
    });
    it('has a for property', () => {
      expect(element).to.have.property('for');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.not.equal(null);
    });
  });
  describe('events', () => {
    describe('change', () => {
      /*
      It should not emit an event unless the action is originating from user action.
      it('emits an change event on value change', async () => {
        const listener = oneEvent(element, UUIComboboxListEvent.CHANGE, false);
        element.value = 'new';
        const event = await listener;
        expect(event).to.not.equal(null);
        expect(event.type).to.equal(UUIComboboxListEvent.CHANGE);
      });
      */
    });
  });

  //* For some reason this has to be inside the first describe for webkit to run the tests.
  describe('UUIComboboxListOptionElement', () => {
    let element: UUIComboboxListOptionElement;

    beforeEach(async () => {
      element = await fixture(html`
        <uui-combobox-list-option
          value="value1"
          displayValue="value1"></uui-combobox-list-option>
      `);
    });

    it('is defined with its own instance', () => {
      expect(element).to.be.instanceOf(UUIComboboxListOptionElement);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    describe('properties', () => {
      it('has a value property', () => {
        expect(element).to.have.property('value');
      });
      it('has a displayValue property', () => {
        expect(element).to.have.property('displayValue');
      });
      it('has a displayValue property', () => {
        expect(element).to.have.property('disabled');
      });
    });

    describe('template', () => {
      it('renders a default slot', () => {
        const slot = element.shadowRoot!.querySelector('slot')!;
        expect(slot).to.not.equal(null);
      });
    });
  });
});
