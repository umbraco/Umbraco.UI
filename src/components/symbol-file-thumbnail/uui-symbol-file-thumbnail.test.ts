import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolFileThumbnailElement } from './uui-symbol-file-thumbnail.element';

import '../icon/index.js';

describe('UUISymbolFileThumbnailElement', () => {
  let element: UUISymbolFileThumbnailElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-symbol-file-thumbnail></uui-symbol-file-thumbnail>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISymbolFileThumbnailElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
