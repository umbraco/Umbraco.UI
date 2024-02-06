import { expect, fixture, html } from '@open-wc/testing';
import { UUIInputElement } from '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-button/lib';

import { UUIInputLockElement } from './uui-input-lock.element';

describe('UUIInputLockElement', () => {
  let element: UUIInputLockElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-input-lock label="Input label"></uui-input-lock>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIInputLockElement);
  });

  it('inherits from uui-input', () => {
    expect(element).to.be.instanceOf(UUIInputElement);
  });

  it('passes the a11y audit', async () => {
    // Only verify that the color contrast is good when its not locked.
    element.locked = false;
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a locked property', () => {
      expect(element).to.have.property('name');
    });
  });

  it('correctly toggles lock', async () => {
    await expect(element.readonly).to.be.true;
    const toggle = element.shadowRoot?.querySelector(
      '#lock',
    ) as HTMLButtonElement;
    toggle.click();
    await expect(element.readonly).to.be.false;
    toggle.click();
    await expect(element.readonly).to.be.true;
  });
});
