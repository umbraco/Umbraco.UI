import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
  aTimeout,
} from '@open-wc/testing';
import { UUIComboboxElement } from './uui-combobox.element';
import { UUIComboboxEvent } from './UUIComboboxEvent';
import { UUIComboboxListOptionElement } from '@umbraco-ui/uui-combobox-list/lib';

describe('UUIComboboxElement', () => {
  let element: UUIComboboxElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-combobox>
        <uui-combobox-list-option
          value="value1"
          displayValue="value1"></uui-combobox-list-option>
        <uui-combobox-list-option
          value="value2"
          displayValue="value2"></uui-combobox-list-option>
        <uui-combobox-list-option
          value="value3"
          displayValue="value3"></uui-combobox-list-option>
        <div slot="prepend"></div>
        <div slot="append"></div>
      </uui-combobox>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIComboboxElement);
  });

  it('defines uui-combobox-list-option as its own instance', () => {
    expect(element.querySelector('uui-combobox-list-option')).to.be.instanceOf(
      UUIComboboxListOptionElement
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
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
    it('renders a prepend slot', () => {
      const slot = element.shadowRoot!.querySelector(
        'slot[name=input-prepend]'
      )!;
      expect(slot).to.exist;
    });
    it('renders a append slot', () => {
      const slot = element.shadowRoot!.querySelector(
        'slot[name=input-append]'
      )!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('input', () => {
      it('emits an input event on file change', async () => {
        const listener = oneEvent(element, UUIComboboxEvent.CHANGE);
        const list = element.shadowRoot.querySelector('uui-combobox-list');

        const options = (
          list.children[0] as HTMLSlotElement
        ).assignedElements() as HTMLElement[];

        expect(options[2]).to.exist;
        options[2].click();

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIComboboxEvent.CHANGE);
      });
    });
  });
});
