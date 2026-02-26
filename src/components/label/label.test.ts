import { UUILabelElement } from './label.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './label.js';

/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}

describe('UUILabelElement', () => {
  let element: UUILabelElement;

  beforeEach(async () => {
    element = render(html` <uui-label>Visual label</uui-label> `).container.querySelector('uui-label')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has an for property', () => {
      expect(element).toHaveProperty('for');
    });
    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('features of "for" property with ID', () => {
    let scene: HTMLElement;
    let inputEl: HTMLInputElement;

    beforeEach(async () => {
      scene = render(html`<div>
          <uui-label for="MyInput">Visual label</uui-label
          ><input id="MyInput" />
        </div>`).container.querySelector('div')!;
      await scene.updateComplete;
      inputEl = scene.querySelector('input') as HTMLInputElement;
    });

    describe('when label clicked', () => {
      it('sets focus on for-element', async () => {
        const listener = oneEvent(inputEl, 'focus');

        (scene.querySelector('uui-label') as any)?.click();

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('focus');
        expect(document.activeElement).toBe(inputEl);
      });

      it('clicks the for-element', async () => {
        const inputEl = scene.querySelector('input')!;
        const listener = oneEvent(inputEl, 'click');

        (scene.querySelector('uui-label') as any)?.click();

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('click');
      });
    });

    describe('clicks ignored when disabled', () => {
      it('does not set focus on for-element', async () => {
        const inputEl = scene.querySelector('input')!;

        (scene.querySelector('uui-label') as any)!.disabled = true;
        (scene.querySelector('uui-label') as any)?.click();

        await Promise.resolve();
        expect(document.activeElement).not.toBe(inputEl);
      });
    });
  });

  describe('features of "for" property with Element', () => {
    let scene: HTMLElement;
    let forElement: HTMLElement;

    beforeEach(async () => {
      forElement = document.createElement('input')!;
      scene = render(html`<div>
          <uui-label .for=${forElement}>Visual label</uui-label>${forElement}
        </div>`).container.querySelector('div')!;
      await scene.updateComplete;
    });

    describe('when label clicked', () => {
      it('sets focus on for-element', async () => {
        const inputEl = scene.querySelector('input')!;
        const listener = oneEvent(inputEl, 'focus');

        (scene.querySelector('uui-label') as any)?.click();

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('focus');
        expect(document.activeElement).toBe(inputEl);
      });

      it('clicks the for-element', async () => {
        const inputEl = scene.querySelector('input')!;
        const listener = oneEvent(inputEl, 'click');

        (scene.querySelector('uui-label') as any)?.click();

        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('click');
      });
    });

    describe('clicks ignored when disabled', () => {
      it('does not set focus on for-element', async () => {
        const inputEl = scene.querySelector('input')!;

        (scene.querySelector('uui-label') as any)!.disabled = true;
        (scene.querySelector('uui-label') as any)?.click();

        await Promise.resolve();
        expect(document.activeElement).not.toBe(inputEl);
      });
    });
  });
});
