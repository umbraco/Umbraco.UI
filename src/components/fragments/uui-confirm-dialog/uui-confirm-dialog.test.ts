import { html, fixture, expect } from '@open-wc/testing';

import '.';
import { UUIConfirmDialogElement } from './uui-confirm-dialog.element';

describe('UuiConfirmDialog', () => {
  let element: UUIConfirmDialogElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-dialog>Hello uui-dialog</uui-dialog> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
