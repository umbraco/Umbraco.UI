import { html, fixture, expect } from '@open-wc/testing';
import { UUIInputPasswordElement } from './uui-input-password.element';
import '.';

describe('UUIInputPasswordElement', () => {
  let element: UUIInputPasswordElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-input-password label="label"></uui-input-password> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('correctly toggles password type', async () => {
    element.type = 'password';

    const toggle = element.shadowRoot?.querySelector(
      '#eye'
    ) as HTMLButtonElement;
    toggle.click();
    await expect(element.type).to.equal('text');
  });
});
