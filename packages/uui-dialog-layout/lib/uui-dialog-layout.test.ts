import { html, fixture, expect } from '@open-wc/testing';
import { UUIDialogLayoutElement } from './uui-dialog-layout.element';
import '.';

describe('UUIDialogLayoutElement', () => {
  let element: UUIDialogLayoutElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-dialog-layout></uui-dialog-layout> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
