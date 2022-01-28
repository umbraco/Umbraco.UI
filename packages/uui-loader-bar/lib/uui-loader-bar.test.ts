import '../define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUILoaderBarElement } from './uui-loader-bar.element';

describe('UuiTextfield with steps', () => {
  let element: UUILoaderBarElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-loader-bar></uui-loader-bar> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('clamps the negative values passed to progress to 0', async () => {
    element.progress = -44;
    await expect(element.progress).to.equal(0);
  });

  it('clamps the progress values greater then 100 to 100', async () => {
    element.progress = 200;
    await expect(element.progress).to.equal(100);
  });

  it('clamps the animationDuriation value to number greater then 0', async () => {
    element.animationDuration = -20;
    await expect(element.animationDuration).to.equal(1);
  });
});
