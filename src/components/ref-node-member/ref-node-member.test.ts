import '../icon/icon.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIRefNodeMemberElement } from './ref-node-member.element';
import './ref-node-member.js';

/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}

describe('UUIRefNodeMemberElement', () => {
  let element: UUIRefNodeMemberElement;

  beforeEach(async () => {
    element = render(html`
      <uui-ref-node-member name="Member"></uui-ref-node-member>
    `).container.querySelector('uui-ref-node-member')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has an error property', () => {
      expect(element).toHaveProperty('error');
    });

    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });

    it('has a name property', () => {
      expect(element).toHaveProperty('name');
    });

    it('has a detail property', () => {
      expect(element).toHaveProperty('detail');
    });

    it('has an groupName property', () => {
      expect(element).toHaveProperty('groupName');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });

    it('renders an icon slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=icon]')!;
      expect(slot).not.toBe(null);
    });

    it('renders a tag slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=tag]')!;
      expect(slot).not.toBe(null);
    });

    it('renders an actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=actions]')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('events', () => {
    describe('open', () => {
      it('emits a open event when info is clicked', async () => {
        const listener = oneEvent(element, 'open');
        const infoElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#info');
        infoElement?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('open');
      });

      it('emits a open event when icon is clicked', async () => {
        const listener = oneEvent(element, 'open');
        const iconElement: HTMLElement | null =
          element.shadowRoot!.querySelector('#icon');
        iconElement?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('open');
      });
    });

    describe('selectable', () => {
      it('emits a selected event when selectable', async () => {
        element.selectable = true;
        await element.updateComplete;
        const listener = oneEvent(element, 'selected');
        element.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('selected');
        expect(element.selected).toBe(true);
      });
    });
  });
});
