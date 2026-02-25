import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUIProgressBarElement } from './progress-bar.element';
import './progress-bar.js';

describe('UUIProgressBarElement', () => {
  let element: UUIProgressBarElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-progress-bar></uui-progress-bar> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('clamps the negative values passed to progress to 0', async () => {
    element.progress = -44;
    expect(element.progress).to.equal(0);
  });

  it('clamps the progress values greater then 100 to 100', async () => {
    element.progress = 200;
    expect(element.progress).to.equal(100);
  });

  it('sets the bar width corresponding to the progress', async () => {
    element.progress = 23;
    await elementUpdated(element);
    const bar = element.shadowRoot?.getElementById('bar');
    expect(bar?.style.width).to.equal('23%');
  });
});
