import {
  html,
  fixture,
  expect,
  oneEvent,
  elementUpdated,
} from '@open-wc/testing';
import { UUIMenuItemElement } from './uui-menu-item.element';
import '.';

describe('UUIMenuItemElement', () => {
  let element: UUIMenuItemElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-menu-item role="menu" label="menuitem"></uui-menu-item>`
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });

    it('renders an icon slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=icon]')!;
      expect(slot).to.exist;
    });

    it('renders an actions slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=actions]')!;
      expect(slot).to.exist;
    });
  });

  describe('expand', () => {
    it('emits a show-children event when expand icon is clicked', async () => {
      element.setAttribute('has-children', 'true');
      await elementUpdated(element);
      const listener = oneEvent(element, 'show-children');
      const caretIconElement: HTMLElement | null =
        element.shadowRoot!.querySelector('#caret-button');
      caretIconElement?.click();
      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal('show-children');
      expect(element.hasAttribute('show-children')).to.equal(true);
    });

    it('emits a hide-children event when collapse icon is clicked', async () => {
      element.setAttribute('has-children', 'true');
      element.setAttribute('show-children', 'true');
      await elementUpdated(element);
      const listener = oneEvent(element, 'hide-children');
      const caretIconElement: HTMLElement | null =
        element.shadowRoot!.querySelector('#caret-button');
      caretIconElement?.click();
      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal('hide-children');
      expect(element.hasAttribute('show-children')).to.equal(false);
    });
  });

  describe('selectable', () => {
    let labelElement: HTMLElement | null;

    beforeEach(async () => {
      labelElement = element.shadowRoot!.querySelector('#label-button');
      element.selectable = true;
    });

    it('can be selected when selectable', async () => {
      await elementUpdated(element);
      labelElement?.click();
      expect(element.selected).to.be.true;
    });

    it('can not be selected when not selectable', async () => {
      element.selectable = false;
      await elementUpdated(element);
      labelElement?.click();
      expect(element.selected).to.be.false;
    });

    it('can be selected when selectable', async () => {
      element.disabled = true;
      await elementUpdated(element);
      labelElement?.click();
      expect(element.selected).to.be.false;
    });
  });
});
