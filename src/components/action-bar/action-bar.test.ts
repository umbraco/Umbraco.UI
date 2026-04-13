import './action-bar.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';

import { UUIActionBarElement } from './action-bar.element';

describe('UUIActionBarElement', () => {
  let element: UUIActionBarElement;

  beforeEach(async () => {
    element = render(html` <uui-action-bar></uui-action-bar> `).container.querySelector('uui-action-bar')!;

    await element.updateComplete;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIActionBarElement);
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
