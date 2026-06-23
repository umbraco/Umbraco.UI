import './symbol-lock.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUISymbolLockElement } from './symbol-lock.element';

describe('UUISymbolLockElement', () => {
  let element: UUISymbolLockElement;

  beforeEach(async () => {
    element = render(html` <uui-symbol-lock></uui-symbol-lock> `).container.querySelector('uui-symbol-lock')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUISymbolLockElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
