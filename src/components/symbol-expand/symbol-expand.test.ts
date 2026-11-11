import { UUISymbolExpandElement } from './symbol-expand.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './symbol-expand.js';

describe('UUISymbolExpandElement', () => {
  let element: UUISymbolExpandElement;

  beforeEach(async () => {
    element = render(html`
      <uui-symbol-expand></uui-symbol-expand>
    `).container.querySelector('uui-symbol-expand')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('text direction', () => {
    for (const dir of ['ltr', 'rtl']) {
      it(`points towards the inline end when closed in ${dir}`, async () => {
        const symbol = render(html`
          <div dir=${dir}><uui-symbol-expand></uui-symbol-expand></div>
        `).container.querySelector('uui-symbol-expand')!;
        await symbol.updateComplete;

        const svg = symbol.shadowRoot!.querySelector('svg')!;
        // The chevron points down before it is rotated.
        const tip = new DOMMatrix(
          getComputedStyle(svg).transform,
        ).transformPoint(new DOMPoint(0, 1));
        expect(Math.sign(tip.x)).toBe(dir === 'rtl' ? -1 : 1);
      });
    }
  });
});
