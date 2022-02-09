import { expect, fixture, html } from '@open-wc/testing';

import { UUIBoxElement } from './uui-box.element';

describe('UUIBox', () => {
  let element: UUIBoxElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-box>
      <div slot="header">Header</div>
      <div slot="main">Main</div>
    </uui-box>`);
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIBoxElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
