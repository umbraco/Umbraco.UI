import { html, fixture, expect } from '@open-wc/testing';
import { UUIToggleElement } from './uui-toggle.element';
import '.';

describe('UuiToggle', () => {
  let element: UUIToggleElement;
  let input: HTMLInputElement | null | undefined;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-toggle label="test label" name="test"></uui-toggle> `
    );
    input = element.shadowRoot?.querySelector('#input');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('native input has a correct role', async () => {
    expect(input).to.have.attr('role', 'switch');
  });
});
