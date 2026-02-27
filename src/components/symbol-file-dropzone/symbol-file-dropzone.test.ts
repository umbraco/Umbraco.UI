import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolFileDropzoneElement } from './symbol-file-dropzone.element';
import './symbol-file-dropzone.js';

describe('UUISymbolFileDropzoneElement', () => {
  let element: UUISymbolFileDropzoneElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-symbol-file-dropzone></uui-symbol-file-dropzone>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISymbolFileDropzoneElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
