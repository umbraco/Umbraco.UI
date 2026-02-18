import { html, fixture, expect } from '@open-wc/testing';
import { UUIInputOtpElement } from './uui-input-otp.element';

describe('UUIInputOtpElement', () => {
  let element: UUIInputOtpElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-input-otp label="otp input"></uui-input-otp>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIInputOtpElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a default length of 6', () => {
      expect(element.length).to.equal(6);
      expect(element.shadowRoot?.querySelectorAll('input').length).to.equal(6);
    });

    it('can set the length', async () => {
      element.length = 4;
      await element.updateComplete;
      expect(element.shadowRoot?.querySelectorAll('input').length).to.equal(4);
    });

    it('can set integerOnly', async () => {
      element.integerOnly = true;
      await element.updateComplete;
      expect(element.inputMode).to.equal('numeric');

      element.integerOnly = false;
      await element.updateComplete;
      expect(element.inputMode).to.equal('text');
    });

    it('can set masked', async () => {
      element.masked = true;
      await element.updateComplete;
      expect(element._input).to.equal('password');

      element.masked = false;
      await element.updateComplete;
      expect(element._input).to.equal('text');
    });

    it('can set readonly', async () => {
      element.readonly = true;
      await element.updateComplete;
      expect(element.hasAttribute('readonly')).to.be.true;

      element.readonly = false;
      await element.updateComplete;
      expect(element.hasAttribute('readonly')).to.be.false;
    });

    it('can set disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(element.hasAttribute('disabled')).to.be.true;

      element.disabled = false;
      await element.updateComplete;
      expect(element.hasAttribute('disabled')).to.be.false;
    });

    it('can set autofocus', async () => {
      element.autofocus = true;
      await element.updateComplete;
      expect(element.hasAttribute('autofocus')).to.be.true;

      element.autofocus = false;
      await element.updateComplete;
      expect(element.hasAttribute('autofocus')).to.be.false;
    });

    it('can set required', async () => {
      element.required = true;
      await element.updateComplete;
      expect(element.hasAttribute('required')).to.be.true;

      element.required = false;
      await element.updateComplete;
      expect(element.hasAttribute('required')).to.be.false;
    });

    it('can set error', async () => {
      element.error = true;
      await element.updateComplete;
      expect(element.hasAttribute('error')).to.be.true;

      element.error = false;
      await element.updateComplete;
      expect(element.hasAttribute('error')).to.be.false;
    });

    it('can set autocomplete', async () => {
      element.autocomplete = 'one-time-code';
      await element.updateComplete;
      expect(element.getAttribute('autocomplete')).to.equal('one-time-code');
    });
  });

  describe('logic', () => {
    it('can distribute a value', async () => {
      element.value = '123456';
      await element.updateComplete;
      const inputs = element.shadowRoot?.querySelectorAll('input');
      if (!inputs) {
        throw new Error('inputs not found');
      }

      expect(inputs[0].value).to.equal('1');
      expect(inputs[1].value).to.equal('2');
      expect(inputs[2].value).to.equal('3');
      expect(inputs[3].value).to.equal('4');
      expect(inputs[4].value).to.equal('5');
      expect(inputs[5].value).to.equal('6');
    });

    it('can distribute a value with a different length', async () => {
      element.length = 4;
      element.value = '123456';
      await element.updateComplete;

      const inputs = element.shadowRoot?.querySelectorAll('input');
      if (!inputs) {
        throw new Error('inputs not found');
      }

      expect(inputs[0].value).to.equal('1');
      expect(inputs[1].value).to.equal('2');
      expect(inputs[2].value).to.equal('3');
      expect(inputs[3].value).to.equal('4');
    });
  });
});
