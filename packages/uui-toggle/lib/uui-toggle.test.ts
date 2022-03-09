import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { UUIBooleanInputElement } from '@umbraco-ui/uui-boolean-input/lib';

import { UUIToggleElement } from './uui-toggle.element';

describe('UuiToggle', () => {
  let element: UUIToggleElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-toggle label="test label" name="test"></uui-toggle> `
    );
    input = element.shadowRoot?.querySelector('#input') as HTMLInputElement;
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIToggleElement);
    expect(element).to.be.instanceOf(UUIBooleanInputElement);
  });

  it('has input element', () => {
    expect(input).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('native input has a correct role', () => {
    expect(input).to.have.attr('role', 'switch');
  });

  describe('properties', () => {
    it('has a name property', () => {
      expect(element).to.have.property('name');
    });
    it('has a error property', () => {
      expect(element).to.have.property('error');
    });
    it('has a value property', () => {
      expect(element).to.have.property('value');
    });
    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
    it('has a checked property', () => {
      expect(element).to.have.property('checked');
    });

    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await elementUpdated(element);
      expect(input.disabled).to.be.true;
    });
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).to.have.property('focus').that.is.a('function');
    });
    it('focus method sets focus', () => {
      expect(document.activeElement).not.to.equal(element);
      element.focus();
      expect(document.activeElement).to.equal(element);
    });

    it('has a click method', () => {
      expect(element).to.have.property('click').that.is.a('function');
    });
    it('click method changes value', () => {
      expect(element.checked).not.to.be.true;
      element.click();
      expect(element.checked).to.be.true;
    });
  });

  describe('events', () => {
    describe('click', () => {
      it('emits a click event when clicked', async () => {
        const listener = oneEvent(element, 'click');
        element.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('click');
      });
    });
    describe('change', () => {
      it('emits a change event when native input fires one', () => {
        let event: Event | null = null;
        element.addEventListener('change', e => (event = e));
        input.dispatchEvent(new Event('change'));
        expect(event!.target).to.equal(element);
      });
    });
  });
});
