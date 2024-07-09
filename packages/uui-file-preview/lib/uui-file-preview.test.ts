import { html, fixture, expect } from '@open-wc/testing';
import { UUIFilePreviewElement } from './uui-file-preview.element';

import '@umbraco-ui/uui-symbol-file/lib';
import '@umbraco-ui/uui-symbol-folder/lib';
import '@umbraco-ui/uui-symbol-file-thumbnail/lib';

describe('UUIFilePreviewElement', () => {
  let element: UUIFilePreviewElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-file-preview></uui-file-preview> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIFilePreviewElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
