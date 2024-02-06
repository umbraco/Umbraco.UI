import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
} from '@open-wc/testing';
import { UUILabelElement } from './uui-label.element';
import '.';

describe('UUILabelElement', () => {
  let element: UUILabelElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-label>Visual label</uui-label> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has an for property', () => {
      expect(element).to.have.property('for');
    });
    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  describe('features of "for" property with ID', () => {
    let scene: HTMLElement;
    let inputEl: HTMLInputElement;

    beforeEach(async () => {
      scene = await fixture(
        html`<div>
          <uui-label for="MyInput">Visual label</uui-label
          ><input id="MyInput" />
        </div>`,
      );
      await elementUpdated(scene);
      inputEl = scene.querySelector('input') as HTMLInputElement;
    });

    describe('when label clicked', () => {
      it('sets focus on for-element', async () => {
        const listener = oneEvent(inputEl, 'focus');

        (scene.querySelector('uui-label') as any)?.click();

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('focus');
        expect(document.activeElement).to.equal(inputEl);
      });

      it('clicks the for-element', async () => {
        const inputEl = scene.querySelector('input')!;
        const listener = oneEvent(inputEl, 'click');

        (scene.querySelector('uui-label') as any)?.click();

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('click');
      });
    });

    describe('clicks ignored when disabled', () => {
      it('does not set focus on for-element', async () => {
        const inputEl = scene.querySelector('input')!;

        (scene.querySelector('uui-label') as any)!.disabled = true;
        (scene.querySelector('uui-label') as any)?.click();

        await Promise.resolve();
        expect(document.activeElement).not.to.equal(inputEl);
      });
    });
  });

  describe('features of "for" property with Element', () => {
    let scene: HTMLElement;
    let forElement: HTMLElement;

    beforeEach(async () => {
      forElement = document.createElement('input')!;
      scene = await fixture(
        html`<div>
          <uui-label .for=${forElement}>Visual label</uui-label>${forElement}
        </div>`,
      );
      await elementUpdated(scene);
    });

    describe('when label clicked', () => {
      it('sets focus on for-element', async () => {
        const inputEl = scene.querySelector('input')!;
        const listener = oneEvent(inputEl, 'focus');

        (scene.querySelector('uui-label') as any)?.click();

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('focus');
        expect(document.activeElement).to.equal(inputEl);
      });

      it('clicks the for-element', async () => {
        const inputEl = scene.querySelector('input')!;
        const listener = oneEvent(inputEl, 'click');

        (scene.querySelector('uui-label') as any)?.click();

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('click');
      });
    });

    describe('clicks ignored when disabled', () => {
      it('does not set focus on for-element', async () => {
        const inputEl = scene.querySelector('input')!;

        (scene.querySelector('uui-label') as any)!.disabled = true;
        (scene.querySelector('uui-label') as any)?.click();

        await Promise.resolve();
        expect(document.activeElement).not.to.equal(inputEl);
      });
    });
  });
});
