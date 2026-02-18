import { expect, fixture, html } from '@open-wc/testing';
import '../icon/uui-icon.element';
import '../button/uui-button.element';
import '../input/uui-input.element';
import { UUIInputElement } from '../input/uui-input.element';

import { UUIInputPasswordElement } from './uui-input-password.element';

describe('UUIInputPasswordElement', () => {
  let element: UUIInputPasswordElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-input-password label="label"></uui-input-password>
    `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIInputPasswordElement);
  });

  it('inherits from uui-input', () => {
    expect(element).to.be.instanceOf(UUIInputElement);
  });

  it('correctly toggles password type', async () => {
    element.type = 'password';

    const toggle = element.shadowRoot?.querySelector(
      '#eye',
    ) as HTMLButtonElement;
    await toggle.click();
    await expect(element.type).to.equal('text');
  });
});
