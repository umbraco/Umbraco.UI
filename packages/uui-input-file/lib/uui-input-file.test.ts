import { html, fixture, expect } from '@open-wc/testing';
import { UUIInputFileElement } from './uui-input-file.element';
import '.';

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
