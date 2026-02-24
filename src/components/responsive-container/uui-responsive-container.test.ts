import { html, fixture, expect } from '@open-wc/testing';
import { UUIResponsiveContainerElement } from './uui-responsive-container.element';

describe('UuiResponsiveContainer', () => {
  let element: UUIResponsiveContainerElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-responsive-container>
        <button>Button 1</button>
        <button>Button 2</button>
      </uui-responsive-container>
    `);
  });

  afterEach(() => {
    element?.remove();
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIResponsiveContainerElement);
  });

  it('renders a slot for content', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('has a more button', () => {
    const moreButton = element.shadowRoot!.querySelector('#more-button');
    expect(moreButton).to.exist;
  });

  it('has a popover container', () => {
    const popover = element.shadowRoot!.querySelector('#popover-container');
    expect(popover).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
  it('has an items container', () => {
    const itemsContainer =
      element.shadowRoot!.querySelector('#items-container');
    expect(itemsContainer).to.exist;
  });

  it('has a main container', () => {
    const main = element.shadowRoot!.querySelector('#main');
    expect(main).to.exist;
  });

  describe('collapse property', () => {
    it('has a collapse property', () => {
      expect(element).to.have.property('collapse');
    });

    it('has default collapse value of "end"', () => {
      expect(element.collapse).to.equal('end');
    });

    it('can set collapse to "start"', async () => {
      element.collapse = 'start';
      await element.updateComplete;
      expect(element.collapse).to.equal('start');
    });

    it('can set collapse to "end"', async () => {
      element.collapse = 'end';
      await element.updateComplete;
      expect(element.collapse).to.equal('end');
    });

    it('reflects collapse attribute', async () => {
      element.collapse = 'start';
      await element.updateComplete;
      expect(element.getAttribute('collapse')).to.equal('start');
    });
  });

  describe('collapse="start"', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <uui-responsive-container collapse="start">
          <button>Button 1</button>
          <button>Button 2</button>
        </uui-responsive-container>
      `);
    });

    it('sets collapse from attribute', () => {
      expect(element.collapse).to.equal('start');
    });

    it('positions more button before items container', () => {
      const main = element.shadowRoot!.querySelector('#main')!;
      const children = Array.from(main.children);
      const moreButtonIndex = children.findIndex(
        child => child.id === 'more-button',
      );
      const itemsContainerIndex = children.findIndex(
        child => child.id === 'items-container',
      );
      expect(moreButtonIndex).to.be.lessThan(itemsContainerIndex);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe('collapse="end"', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <uui-responsive-container collapse="end">
          <button>Button 1</button>
          <button>Button 2</button>
        </uui-responsive-container>
      `);
    });

    it('sets collapse from attribute', () => {
      expect(element.collapse).to.equal('end');
    });

    it('positions more button after items container', () => {
      const main = element.shadowRoot!.querySelector('#main')!;
      const children = Array.from(main.children);
      const moreButtonIndex = children.findIndex(
        child => child.id === 'more-button',
      );
      const itemsContainerIndex = children.findIndex(
        child => child.id === 'items-container',
      );
      expect(moreButtonIndex).to.be.greaterThan(itemsContainerIndex);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });
});
