import './form-layout-item.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import '../form-validation-message/form-validation-message.js';

import { UUIFormLayoutItemElement } from './form-layout-item.element';

describe('UUIFormLayoutItemElement', () => {
  let element: UUIFormLayoutItemElement;

  beforeEach(async () => {
    element = render(html`
      <uui-form-layout-item></uui-form-layout-item>
    `).container.querySelector('uui-form-layout-item')!;

    await element.updateComplete;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIFormLayoutItemElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('methods', () => {
    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot:not([name])')!;
      expect(slot).not.toBe(null);
    });

    it('renders an label slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=label]')!;
      expect(slot).not.toBe(null);
    });

    it('renders an message slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=message]')!;
      expect(slot).not.toBe(null);
    });
  });
});
