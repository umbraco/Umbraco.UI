import { html, fixture, expect } from '@open-wc/testing';
import { UUIButtonInlineCreateElement } from './uui-button-inline-create.element';
import '.';

describe('UUIButtonInlineCreateElement', () => {
  let element: UUIButtonInlineCreateElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-button-inline-create
          label="Provide a A11Y label"></uui-button-inline-create>
      `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
