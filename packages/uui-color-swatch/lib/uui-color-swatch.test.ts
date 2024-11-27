import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUIColorSwatchElement } from './uui-color-swatch.element';
import { sendMouse, sendKeys } from '@web/test-runner-commands';

describe('UUIColorSwatchElement', () => {
  let element: UUIColorSwatchElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-color-swatch label="Color swatch"></uui-color-swatch>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIColorSwatchElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('selectable', () => {
    beforeEach(async () => {
      element.selectable = true;
    });

    it('can be selected when selectable', async () => {
      await elementUpdated(element);
      await sendMouse({
        type: 'click',
        position: [15, 15],
        button: 'left',
      });
      expect(element.selected).to.be.true;
    });

    it('can not be selected when not selectable', async () => {
      element.selectable = false;
      await elementUpdated(element);
      await sendMouse({
        type: 'click',
        position: [15, 15],
        button: 'left',
      });
      expect(element.selected).to.be.false;
    });

    it('cant be selected when disabled', async () => {
      element.disabled = true;
      await elementUpdated(element);
      await sendMouse({
        type: 'click',
        position: [15, 15],
        button: 'left',
      });
      expect(element.selected).to.be.false;
    });

    it('can be selected with Space key', async () => {
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Space',
      });
      expect(element.selected).to.be.true;

      await sendKeys({
        press: 'Space',
      });
      expect(element.selected).to.be.false;
    });

    it('can be selected with Enter key', async () => {
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Enter',
      });
      expect(element.selected).to.be.true;

      await sendKeys({
        press: 'Enter',
      });
      expect(element.selected).to.be.false;
    });
  });
});
