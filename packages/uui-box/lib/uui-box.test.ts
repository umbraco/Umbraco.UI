import { html, fixture, expect } from '@open-wc/testing';
import './index';
import { UUIBoxElement } from './uui-box.element';

describe('UUIBox', () => {
  let element: UUIBoxElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-box>
      <div slot="header">Header</div>
      <div slot="main">Main</div>
    </uui-box>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
