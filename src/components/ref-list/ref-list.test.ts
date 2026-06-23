import { UUIRefListElement } from './ref-list.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './ref-list.js';

describe('UUIRefListElement', () => {
  let element: UUIRefListElement;

  beforeEach(async () => {
    element = render(html` <uui-ref-list></uui-ref-list> `).container.querySelector('uui-ref-list')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('renders a default slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).not.toBe(null);
  });
});
