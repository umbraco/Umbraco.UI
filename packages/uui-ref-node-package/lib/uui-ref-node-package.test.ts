import { html, fixture, expect } from '@open-wc/testing';
import { UUIRefNodePackageElement } from './uui-ref-node-package.element';
import '.';

describe('UUIRefNodePackageElement', () => {
  let element: UUIRefNodePackageElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-ref-node-package></uui-ref-node-package> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
