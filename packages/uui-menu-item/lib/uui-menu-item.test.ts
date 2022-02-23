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
      html`<uui-menu-item label="menuitem"></uui-menu-item>`
    );
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIMenuItemElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
    it('disable property defaults to false', () => {
      expect(element.disabled).to.false;
    });

    it('has a showChildren property', () => {
      expect(element).to.have.property('showChildren');
    });
    it('showChildren property defaults to false', () => {
      expect(element.showChildren).to.false;
    });

    it('has a hasChildren property', () => {
      expect(element).to.have.property('hasChildren');
    });
    it('hasChildren property defaults to false', () => {
      expect(element.hasChildren).to.false;
    });

    it('has a loading property', () => {
      expect(element).to.have.property('loading');
    });
    it('loading property defaults to false', () => {
      expect(element.loading).to.false;
    });

    it('has a href property', () => {
      expect(element).to.have.property('href');
    });

    it('has a target property', () => {
      expect(element).to.have.property('target');
    });
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

  describe('HREF', () => {
    let labelElement: HTMLElement;
    let element: UUIMenuItemElement;

    beforeEach(async () => {
      element = await fixture(
        html`<uui-menu-item
          label="menuitem"
          href="https://www.umbraco.com"></uui-menu-item>`
      );
      labelElement = element.shadowRoot!.querySelector(
        '#label-button'
      ) as HTMLElement;
    });

    it('label element is defined', () => {
      expect(labelElement).to.be.instanceOf(HTMLElement);
    });

    it('label is rendered as an anchor tag', async () => {
      await elementUpdated(element);
      expect(labelElement.nodeName).to.be.equal('A');
    });

    it('target is applied to anchor tag', async () => {
      element.target = '_self';
      await elementUpdated(element);
      expect(labelElement.getAttribute('target')).to.be.equal('_self');
    });

    it('when target is _blank rel=noopener is set.', async () => {
      element.target = '_blank';
      await elementUpdated(element);
      expect(labelElement.getAttribute('target')).to.be.equal('_blank');
      expect(labelElement.getAttribute('rel')).to.be.equal('noopener');
    });
  });
});
