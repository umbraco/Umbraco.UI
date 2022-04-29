import { html, fixture, expect } from '@open-wc/testing';
import { UUIFileDropzoneElement } from './uui-file-dropzone.element';
import '.';

describe('UUIFileDropzoneElement', () => {
  let element: UUIFileDropzoneElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-file-dropzone></uui-file-dropzone> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIFileDropzoneElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
