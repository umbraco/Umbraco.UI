import { UUIDialogElement } from './dialog.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './dialog.js';

describe('UUIDialogElement', () => {
  let element: UUIDialogElement;

  beforeEach(async () => {
    element = render(html` <uui-dialog></uui-dialog> `).container.querySelector('uui-dialog')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });
});
