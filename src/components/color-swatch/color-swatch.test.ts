import './color-swatch.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIColorSwatchElement } from './color-swatch.element';
import { UUITestMouse } from '../../internal/test/index';

describe('UUIColorSwatchElement', () => {
  let element: UUIColorSwatchElement;

  beforeEach(async () => {
    element = render(html`
      <uui-color-swatch label="Color swatch"></uui-color-swatch>
    `).container.querySelector('uui-color-swatch')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIColorSwatchElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('selectable', () => {
    const mouse = new UUITestMouse();

    beforeEach(async () => {
      element.selectable = true;
    });

    it('can be selected when selectable', async () => {
      await element.updateComplete;
      await mouse.leftClick(element);
      expect(element.selected).toBe(true);
    });

    it('can not be selected when not selectable', async () => {
      element.selectable = false;
      await element.updateComplete;
      await mouse.leftClick(element);
      expect(element.selected).toBe(false);
    });

    it('cant be selected when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      await mouse.leftClick(element);
      expect(element.selected).toBe(false);
    });

    /* TODO: temp commented out as they are flaky in webkit
    it('can be selected with Space key', async () => {
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Space',
      });
      expect(element.selected).toBe(true);

      await sendKeys({
        press: 'Space',
      });
      expect(element.selected).toBe(false);
    });

    it('can be selected with Enter key', async () => {
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Enter',
      });
      expect(element.selected).toBe(true);

      await sendKeys({
        press: 'Enter',
      });
      expect(element.selected).toBe(false);
    });
    */
  });
});
