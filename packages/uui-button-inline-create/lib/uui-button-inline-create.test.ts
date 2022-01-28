import '../define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUIButtonInlineCreateElement } from './uui-button-inline-create.element';

describe('UUIButtonInlineCreateElement', () => {
  let element: UUIButtonInlineCreateElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-button-inline-create
          label="Create something here"></uui-button-inline-create>
      `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
