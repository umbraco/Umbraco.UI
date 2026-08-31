import './input-otp.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import { UUIInputEvent } from '../input/UUIInputEvent.js';
import { UUIInputOtpElement } from './input-otp.element.js';

describe('UUIInputOtpElement', () => {
  let element: UUIInputOtpElement;

  const inputs = () =>
    Array.from(element.shadowRoot!.querySelectorAll('input'));

  beforeEach(async () => {
    element = render(html`
      <uui-input-otp label="One-time code"></uui-input-otp>
    `).container.querySelector('uui-input-otp')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIInputOtpElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('renders one input per character with a default length of 6', () => {
      expect(element.length).toBe(6);
      expect(inputs().length).toBe(6);
    });

    it('renders as many inputs as the length property', async () => {
      element.length = 4;
      await element.updateComplete;
      expect(inputs().length).toBe(4);
    });

    it('gives every input an accessible label', () => {
      expect(inputs().map(input => input.getAttribute('aria-label'))).toEqual([
        'Character number 1',
        'Character number 2',
        'Character number 3',
        'Character number 4',
        'Character number 5',
        'Character number 6',
      ]);
    });

    it('switches the input mode when integerOnly is set', async () => {
      element.integerOnly = true;
      await element.updateComplete;
      expect(element.inputMode).toBe('numeric');

      element.integerOnly = false;
      await element.updateComplete;
      expect(element.inputMode).toBe('text');
    });

    it('renders password inputs when masked is set', async () => {
      element.masked = true;
      await element.updateComplete;
      expect(inputs().every(input => input.type === 'password')).toBe(true);

      element.masked = false;
      await element.updateComplete;
      expect(inputs().every(input => input.type === 'text')).toBe(true);
    });

    it('distributes the placeholder across the inputs', async () => {
      element.placeholder = '123456';
      await element.updateComplete;
      expect(inputs().map(input => input.placeholder)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ]);
    });

    it('reflects readonly and disabled onto the inputs', async () => {
      element.readonly = true;
      element.disabled = true;
      await element.updateComplete;
      expect(inputs().every(input => input.readOnly)).toBe(true);
      expect(inputs().every(input => input.disabled)).toBe(true);
    });

    it('reflects the autocomplete attribute', async () => {
      element.autocomplete = 'one-time-code';
      await element.updateComplete;
      expect(element.getAttribute('autocomplete')).toBe('one-time-code');
    });
  });

  describe('value', () => {
    it('distributes the value one character per input', async () => {
      element.value = '123456';
      await element.updateComplete;
      expect(inputs().map(input => input.value)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ]);
    });

    it('only renders as many characters as there are inputs', async () => {
      element.length = 4;
      element.value = '123456';
      await element.updateComplete;
      expect(inputs().map(input => input.value)).toEqual(['1', '2', '3', '4']);
    });

    it('emits a change event when the value is set', async () => {
      const listener = oneEvent(element, UUIInputEvent.CHANGE);
      element.value = '123456';
      const event = await listener;
      expect(event).not.toBeNull();
      expect(event.type).toBe(UUIInputEvent.CHANGE);
    });
  });

  describe('typing', () => {
    it('puts one character in each input and joins them into the value', async () => {
      inputs()[0].focus();
      await userEvent.keyboard('123456');
      await element.updateComplete;

      expect(inputs().map(input => input.value)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ]);
      expect(element.value).toBe('123456');
    });

    it('moves focus to the next input as characters are entered', async () => {
      inputs()[0].focus();
      await userEvent.keyboard('12');
      await element.updateComplete;

      expect(element.shadowRoot!.activeElement).toBe(inputs()[2]);
    });

    it('moves focus backwards on arrow left', async () => {
      inputs()[2].focus();
      await userEvent.keyboard('{ArrowLeft}');

      expect(element.shadowRoot!.activeElement).toBe(inputs()[1]);
    });
  });

  describe('paste', () => {
    const paste = (text: string) => {
      const clipboardData = new DataTransfer();
      clipboardData.setData('text', text);
      inputs()[0].dispatchEvent(
        new ClipboardEvent('paste', {
          clipboardData,
          bubbles: true,
          composed: true,
        }),
      );
    };

    it('splits a pasted code across the inputs', async () => {
      paste('123456');
      await element.updateComplete;

      expect(element.value).toBe('123456');
      expect(inputs().map(input => input.value)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
      ]);
    });

    it('truncates a pasted code that is longer than the length', async () => {
      paste('1234567890');
      await element.updateComplete;

      expect(element.value).toBe('123456');
    });

    it('ignores a non-numeric pasted code when integerOnly is set', async () => {
      element.integerOnly = true;
      await element.updateComplete;

      paste('abcdef');
      await element.updateComplete;

      expect(element.value).toBe('');
    });
  });

  describe('validation', () => {
    it('is invalid while fewer characters than the length are entered', async () => {
      element.value = '123';
      await element.updateComplete;

      expect(element.checkValidity()).toBe(false);
      expect(element.validity.tooShort).toBe(true);
      expect(element.validationMessage).toBe(element.minlengthMessage);
    });

    it('is valid when all characters are entered', async () => {
      element.value = '123456';
      await element.updateComplete;

      expect(element.checkValidity()).toBe(true);
    });
  });
});
