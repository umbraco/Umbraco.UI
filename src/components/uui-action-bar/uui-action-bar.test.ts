import { html, fixture, expect } from '@open-wc/testing';
import '.';
import { UUIActionBarElement } from './uui-action-bar.element';

describe('UuiAvatar', () => {
  let element: UUIActionBarElement;
  beforeEach(async () => {
    element = await fixture(html`<uui-action-bar></uui-action-bar>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
