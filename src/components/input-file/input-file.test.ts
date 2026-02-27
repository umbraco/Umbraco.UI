import './input-file.js';
import { html, fixture, expect } from '@open-wc/testing';
import { UUIInputFileElement } from './input-file.element';

import '../icon/icon.js';
import '../file-dropzone/file-dropzone.js';
import '../button/button.js';
import '../action-bar/action-bar.js';
import '../file-preview/file-preview.js';

describe('UUIInputFileElement', () => {
  let element: UUIInputFileElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-input-file></uui-input-file> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIInputFileElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
