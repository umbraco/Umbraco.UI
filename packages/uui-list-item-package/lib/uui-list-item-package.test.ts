import { html, fixture, expect } from '@open-wc/testing';
import { UUIListItemPackageElement } from './uui-list-item-package.element';
import '.';

describe('UUIListItemPackageElement', () => {
  let element: UUIListItemPackageElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-list-item-package></uui-list-item-package> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
