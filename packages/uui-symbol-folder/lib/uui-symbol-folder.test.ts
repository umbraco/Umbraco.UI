import { html, fixture, expect } from '@open-wc/testing';
import { UUISymbolFolderElement } from './uui-symbol-folder.element';
import '.';

describe('UUISymbolFolderElement', () => {
  let element: UUISymbolFolderElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-symbol-folder></uui-symbol-folder> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
