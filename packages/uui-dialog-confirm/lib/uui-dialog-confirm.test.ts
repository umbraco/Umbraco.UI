import { html, fixture, expect } from '@open-wc/testing';
import { UUIDialogConfirmElement } from './uui-dialog-confirm.element';
import '.';

describe('UUIDialogConfirmElement', () => {
  let element: UUIDialogConfirmElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-dialog-confirm></uui-dialog-confirm> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});