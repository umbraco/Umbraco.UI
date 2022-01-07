import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { UUIIconElement } from './uui-icon.element';
import '.';
import { UUIIconRequestEvent } from './UUIIconRequestEvent';
import '@umbraco-ui/uui-icon-registry/lib/index';
import { UUIIconRegistryElement } from '@umbraco-ui/uui-icon-registry/lib/uui-icon-registry.element';
//import '@umbraco-ui/uui-icon-registry-essential/lib/index';
//import { UUIIconRegistryEssentialElement } from '@umbraco-ui/uui-icon-registry-essential/lib/uui-icon-registry-essential.element';
//import { LitElement } from 'lit';
//import { property, query } from 'lit/decorators.js';

const TEST_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"></svg>';

const TEST_FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="red"></rect></svg>';

describe('UUIIconElement', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-icon></uui-icon>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
    //fallback slot first appears if name didn't pick up an icon from a icon registry.
    // therefor this is tested further down.
  });

  describe('properties', () => {
    it('has a svg property', () => {
      expect(element).to.have.property('svg');
    });

    it('has a fallback property', () => {
      expect(element).to.have.property('fallback');
    });

    it('has a name property', () => {
      expect(element).to.have.property('name');
    });
  });

  describe('events', () => {
    describe('ICON_REQUEST', () => {
      it('emits a icon request event when name is set', async () => {
        const listener = oneEvent(element, UUIIconRequestEvent.ICON_REQUEST);
        element.name = 'test';
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIIconRequestEvent.ICON_REQUEST);
        expect(event.detail.iconName).to.equal('test');
      });
    });
  });
});

describe('UUIIconElement with svg', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-icon .svg=${TEST_SVG}></uui-icon> `);
  });

  it('contains svg of icon', async () => {
    await expect(element).shadowDom.to.equal(TEST_SVG);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIIconElement with fallback', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-icon name="not_existing" .fallback=${TEST_FALLBACK_SVG}></uui-icon>
      `
    );
  });

  it('contains svg of icon', async () => {
    await expect(element).shadowDom.to.equal(TEST_FALLBACK_SVG);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIIconElement without fallback slot pr default', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-icon
          ><svg
            name="fallback"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <rect width="512" height="512" fill="red"></rect></svg
        ></uui-icon>
      `
    );
  });

  it('renders a fallback slot', () => {
    const slot = element.shadowRoot!.querySelector('slot[name="fallback"]')!;
    expect(slot).not.to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
describe('UUIIconElement with fallback slot when name failed', () => {
  let element: UUIIconElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-icon name="not_existing"
          ><svg
            name="fallback"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <rect width="512" height="512" fill="red"></rect></svg
        ></uui-icon>
      `
    );
  });

  it('renders a fallback slot', () => {
    const slot = element.shadowRoot!.querySelector('slot[name="fallback"]')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIIconElement using UUIIconRegistry', () => {
  let registryElement: UUIIconRegistryElement;

  beforeEach(async () => {
    registryElement = await fixture(
      html`
        <uui-icon-registry>
          <uui-icon name="testIcon"></uui-icon>
        </uui-icon-registry>
      `
    );
  });

  it('Child uui-icon retrieves the right SVG data', async () => {
    registryElement.registry.defineIcon('testIcon', TEST_SVG);

    await expect(
      registryElement.querySelector('uui-icon[name="testIcon"]')
    ).shadowDom.to.equal(TEST_SVG);
  });
});

/*

TODO: Make this test work, its work in story but i have not been able to make it work here in test.
class TestIconElement extends LitElement {

  @query('#myIcon')
  public iconElement!: UUIIconElement;

  render() {
    return html`<uui-icon id='myIcon' name='picture'></uui-icon>`;
  }
}
customElements.define("uui-test-icon", TestIconElement)





describe('UUIIconElement using UUIIconRegistry across shadow DOMs', () => {

  let registryElement: UUIIconRegistryEssentialElement;
  let testElement: TestIconElement;

  beforeEach(async () => {
    registryElement = await fixture(
      html`
        <uui-icon-registry-essential>
        </uui-icon-registry-essential>
      `
    );

    testElement = await fixture(
      html`<uui-test-icon></uui-test-icon>`
    );

    registryElement.appendChild(testElement);
  });

  it('Child uui-icon retrieves the right SVG data through shadow-dom', async () => {

    console.log((registryElement.querySelector('uui-test-icon') as TestIconElement));

    const timeout = ((ms: number) => {return new Promise(resolve => setTimeout(resolve, ms))});
    await timeout(1500);

    await expect(testElement.querySelector('uui-icon[name="picture"]')).shadowDom.to.equal(TEST_SVG);
  });


});

*/
