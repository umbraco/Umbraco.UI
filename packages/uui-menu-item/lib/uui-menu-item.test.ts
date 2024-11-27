import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import '@umbraco-ui/uui-symbol-expand/lib';
import '@umbraco-ui/uui-loader-bar/lib';
import { UUIMenuItemElement } from './uui-menu-item.element';
import { UUIMenuItemEvent } from './UUIMenuItemEvent';
import { UUISelectableEvent } from '@umbraco-ui/uui-base/lib/events';

describe('UUIMenuItemElement', () => {
  let element: UUIMenuItemElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-menu-item label="menuitem"></uui-menu-item>`,
    );
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIMenuItemElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('passes the a11y audit with nesting', async () => {
    element = await fixture(
      html`<uui-menu-item label="menuitem" has-children>
        <uui-menu-item label="sub-menuitem"></uui-menu-item>
        <uui-menu-item label="sub-menuitem"></uui-menu-item>
      </uui-menu-item>`,
    );
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

    it('has a rel property', () => {
      expect(element).to.have.property('rel');
    });

    it('has a select-mode property', () => {
      expect(element).to.have.property('selectMode');
    });

    it('select-mode property defaults to undefined', () => {
      expect(element.selectMode).to.undefined;
    });
  });

  describe('events', () => {
    it('emits a click-label event when button is clicked', async () => {
      const listener = oneEvent(element, UUIMenuItemEvent.CLICK_LABEL);

      const buttonElement = element.shadowRoot!.querySelector(
        'button#label-button',
      ) as HTMLButtonElement;
      expect(buttonElement).to.exist;
      buttonElement.click();

      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal(UUIMenuItemEvent.CLICK_LABEL);
      expect(event.bubbles).to.be.false;
      expect(event.composed).to.be.false;
      expect(event!.target).to.equal(element);
    });

    describe('select', async () => {
      it('emits a cancelable selected event when selectable', async () => {
        element.selectable = true;
        await elementUpdated(element);
        const labelElement = element.shadowRoot!.querySelector(
          '#label-button',
        ) as HTMLElement;
        element.addEventListener(UUISelectableEvent.SELECTED, e => {
          e.preventDefault();
        });
        const listener = oneEvent(element, UUISelectableEvent.SELECTED);
        labelElement.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUISelectableEvent.SELECTED);
        expect(element.selected).to.be.false;
      });
    });

    describe('deselect', async () => {
      it('emits a cancelable deselected event when preselected', async () => {
        element.selectable = true;
        element.selected = true;
        await elementUpdated(element);
        const labelElement = element.shadowRoot!.querySelector(
          '#label-button',
        ) as HTMLElement;
        element.addEventListener(UUISelectableEvent.DESELECTED, e => {
          e.preventDefault();
        });
        const listener = oneEvent(element, UUISelectableEvent.DESELECTED);
        labelElement.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUISelectableEvent.DESELECTED);
        expect(element.selected).to.be.true;
      });
    });

    describe('show-children', async () => {
      it('emits a show-children event when expanded', async () => {
        element.hasChildren = true;
        await elementUpdated(element);
        const labelElement = element.shadowRoot!.querySelector(
          '#caret-button',
        ) as HTMLElement;
        const listener = oneEvent(element, UUIMenuItemEvent.SHOW_CHILDREN);
        labelElement.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIMenuItemEvent.SHOW_CHILDREN);
        expect(element.showChildren).to.be.true;
      });
      it('emits a cancelable show-children event when expanded', async () => {
        element.hasChildren = true;
        await elementUpdated(element);
        const labelElement = element.shadowRoot!.querySelector(
          '#caret-button',
        ) as HTMLElement;
        element.addEventListener(UUIMenuItemEvent.SHOW_CHILDREN, e => {
          e.preventDefault();
        });
        const listener = oneEvent(element, UUIMenuItemEvent.SHOW_CHILDREN);
        labelElement.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIMenuItemEvent.SHOW_CHILDREN);
        expect(element.showChildren).to.be.false;
      });
    });

    describe('hide-children', async () => {
      it('emits a hide-children event when collapsed', async () => {
        element.hasChildren = true;
        element.showChildren = true;
        await elementUpdated(element);
        const labelElement = element.shadowRoot!.querySelector(
          '#caret-button',
        ) as HTMLElement;
        const listener = oneEvent(element, UUIMenuItemEvent.HIDE_CHILDREN);
        labelElement.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIMenuItemEvent.HIDE_CHILDREN);
        expect(element.showChildren).to.be.false;
      });
      it('emits a cancelable hide-children event when collapsed', async () => {
        element.hasChildren = true;
        element.showChildren = true;
        await elementUpdated(element);
        const labelElement = element.shadowRoot!.querySelector(
          '#caret-button',
        ) as HTMLElement;
        element.addEventListener(UUIMenuItemEvent.HIDE_CHILDREN, e => {
          e.preventDefault();
        });
        const listener = oneEvent(element, UUIMenuItemEvent.HIDE_CHILDREN);
        labelElement.click();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIMenuItemEvent.HIDE_CHILDREN);
        expect(element.showChildren).to.be.true;
      });
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

    it('renders a button', () => {
      const slot = element.shadowRoot!.querySelector('button')!;
      expect(slot).to.exist;
    });
    it('renders a anchor tag when href is defined', () => {
      element.setAttribute('href', 'https://www.umbraco.com');
      const slot = element.shadowRoot!.querySelector('button')!;
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

    it('label element is defined', () => {
      expect(labelElement).to.be.instanceOf(HTMLElement);
    });

    it('label is rendered as a button tag', async () => {
      await elementUpdated(element);
      expect(labelElement?.nodeName).to.be.equal('BUTTON');
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
          href="https://www.umbraco.com"></uui-menu-item>`,
      );
      labelElement = element.shadowRoot!.querySelector(
        '#label-button',
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

    it('when target is _blank and rel is not defined rel attribute is set.', async () => {
      element.target = '_blank';
      await elementUpdated(element);
      expect(labelElement.getAttribute('target')).to.be.equal('_blank');
      expect(labelElement.getAttribute('rel')).to.be.equal(
        'noopener noreferrer',
      );
    });

    it('when rel is applied to anchor tag.', async () => {
      element.rel = 'noreferrer';
      await elementUpdated(element);
      expect(labelElement.getAttribute('rel')).to.be.equal('noreferrer');
    });

    it('when target is _blank and rel is defined rel attribute is set.', async () => {
      element.target = '_blank';
      element.rel = 'noopener';
      await elementUpdated(element);
      expect(labelElement.getAttribute('target')).to.be.equal('_blank');
      expect(labelElement.getAttribute('rel')).to.be.equal('noopener');
    });
  });
});
