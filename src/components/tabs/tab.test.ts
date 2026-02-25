import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUITabElement } from './tab.element';
import './tabs.js';

describe('UuiTab', () => {
  let element: UUITabElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-tab label="My label">Hello uui-tab</uui-tab>
    `);
  });

  it('is defined as its own instance', () => {
    expect(element).to.be.instanceOf(UUITabElement);
  });

  describe('properties', () => {
    it('has a label property', () => {
      expect(element).to.have.property('label');
    });

    it('has a disable property', () => {
      expect(element).to.have.property('disabled');
    });
    it('disable property defaults to false', () => {
      expect(element.disabled).to.false;
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
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
    it('renders a icon slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=icon]')!;
      expect(slot).to.exist;
    });
    it('renders a extra slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=extra]')!;
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

  describe('click', () => {
    let wasClicked: boolean;

    beforeEach(async () => {
      wasClicked = false;
      element.addEventListener('click', () => {
        wasClicked = true;
      });
    });

    it('dispatches click event when type is button', async () => {
      element.click();
      expect(wasClicked).to.true;
    });

    it('does not click when disabled', async () => {
      element.disabled = true;
      element.click();
      expect(wasClicked).to.false;
    });
  });

  describe('HREF', () => {
    let anchorElement: HTMLElement;
    let element: UUITabElement;

    beforeEach(async () => {
      element = await fixture(
        html`<uui-tab
          label="menuitem"
          href="https://www.umbraco.com"></uui-tab>`,
      );
      anchorElement = element.shadowRoot!.querySelector(
        '#button',
      ) as HTMLElement;
    });

    it('anchor element is defined', () => {
      expect(anchorElement).to.be.instanceOf(HTMLElement);
    });

    it('label is rendered as an anchor tag', async () => {
      await elementUpdated(element);
      expect(anchorElement.nodeName).to.be.equal('A');
    });

    it('target is applied to anchor tag', async () => {
      element.target = '_self';
      await elementUpdated(element);
      expect(anchorElement.getAttribute('target')).to.be.equal('_self');
    });
    it('when target is _blank and rel is not defined rel attribute is set.', async () => {
      element.target = '_blank';
      await elementUpdated(element);
      expect(anchorElement.getAttribute('target')).to.be.equal('_blank');
      expect(anchorElement.getAttribute('rel')).to.be.equal(
        'noopener noreferrer',
      );
    });

    it('when rel is applied to anchor tag.', async () => {
      element.rel = 'noreferrer';
      await elementUpdated(element);
      expect(anchorElement.getAttribute('rel')).to.be.equal('noreferrer');
    });

    it('when target is _blank and rel is defined rel attribute is set.', async () => {
      element.target = '_blank';
      element.rel = 'noopener';
      await elementUpdated(element);
      expect(anchorElement.getAttribute('target')).to.be.equal('_blank');
      expect(anchorElement.getAttribute('rel')).to.be.equal('noopener');
    });
  });
});
