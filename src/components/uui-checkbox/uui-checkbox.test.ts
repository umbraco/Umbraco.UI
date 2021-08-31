import { html, fixture, expect } from '@open-wc/testing';
import { UUICheckboxElement } from './uui-checkbox.element';
import '.';

describe('UuiToggle', () => {
  let element: UUICheckboxElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-checkbox label="test label" name="test"></uui-checkbox> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
