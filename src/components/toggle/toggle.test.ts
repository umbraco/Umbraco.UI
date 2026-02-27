import './toggle.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import { UUIBooleanInputElement } from '../boolean-input/boolean-input.js';

import { UUIToggleElement } from './toggle.element';

describe('UUIToggle', () => {
  let element: UUIToggleElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    element = render(html`
      <uui-toggle label="test label" name="test"></uui-toggle>
    `).container.querySelector('uui-toggle')!;

    await element.updateComplete;
    input = element.shadowRoot?.querySelector('#input') as HTMLInputElement;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIToggleElement);
    expect(element).toBeInstanceOf(UUIBooleanInputElement);
  });

  it('has input element', () => {
    expect(input).not.toBe(null);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('native input has a correct role', () => {
    expect(input.getAttribute('role')).toBe('switch');
  });

  describe('properties', () => {
    it('has a name property', () => {
      expect(element).toHaveProperty('name');
    });
    it('has a error property', () => {
      expect(element).toHaveProperty('error');
    });
    it('has a value property', () => {
      expect(element).toHaveProperty('value');
    });
    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });
    it('has a checked property', () => {
      expect(element).toHaveProperty('checked');
    });

    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(input.disabled).toBe(true);
    });
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).toHaveProperty('focus');
    });
    it('focus method sets focus', async () => {
      expect(document.activeElement).not.toBe(element);
      await element.focus();
      expect(document.activeElement).toBe(element);
    });

    it('has a click method', () => {
      expect(element).toHaveProperty('click');
    });
    it('click method changes value', async () => {
      expect(element.checked).not.toBe(true);
      await element.click();
      expect(element.checked).toBe(true);
    });
  });

  describe('events', () => {
    describe('click', () => {
      it('emits a click event when clicked', async () => {
        const listener = oneEvent(element, 'click');
        element.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('click');
      });
    });
    describe('change', () => {
      it('emits a change event when native input fires one', () => {
        let event: Event | null = null;
        element.addEventListener('change', e => (event = e));
        input.dispatchEvent(new Event('change'));
        expect(event!.target).toBe(element);
      });
    });
  });
});
