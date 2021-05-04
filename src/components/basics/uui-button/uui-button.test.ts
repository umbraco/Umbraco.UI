import { html, fixture, expect } from '@open-wc/testing';
import { UUIButtonElement } from './uui-button.element';
import '.';

describe('UuiButton', () => {
  let element: UUIButtonElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-button label="My label">Hello uui-button</uui-button> `
    );
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('test click works', async () => {
    let wasClicked = false;
    element.addEventListener('click', () => {
      wasClicked = true;
    });
    element.click();
    expect(wasClicked).to.true;
  });
  it('test click does not work when disabled', async () => {
    element.disabled = true;
    let wasClicked = false;
    element.addEventListener('click', () => {
      wasClicked = true;
    });
    element.click();
    expect(wasClicked).to.false;
  });
});
