import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUIScrollContainerElement } from './scroll-container.element';
import './scroll-container.js';

describe('UUIScrollContainerElement', () => {
  let element: UUIScrollContainerElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-scroll-container style="width:200px; height:200px;">
        1 line<br />
        2 line<br />
        3 line<br />
        4 line<br />
        5 line<br />
        6 line<br />
        7 line<br />
        8 line<br />
        9 line<br />
        10 line<br />
        11 line<br />
        12 line<br />
        13 line<br />
        14 line<br />
        15 line<br />
        16 line<br />
        17 line<br />
        18 line<br />
        19 line<br />
        20 line
      </uui-scroll-container>`,
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('can scroll', async () => {
    element.scrollTop = 42;
    await expect(element.scrollTop).to.be.equal(42);
  });
});

describe('UUIScrollContainerElement with a lot of content', () => {
  let element: UUIScrollContainerElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-scroll-container style="width:200px; height:200px;">
        initial line is way toooo long
        WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY<br />
        1 line<br />
        2 line<br />
        3 line<br />
        4 line<br />
        5 line<br />
        6 line<br />
        7 line<br />
        8 line<br />
        9 line<br />
        10 line<br />
        11 line<br />
        12 line<br />
        13 line<br />
        14 line<br />
        15 line<br />
        16 line<br />
        17 line<br />
        18 line<br />
        19 line<br />
        20 line
      </uui-scroll-container>`,
    );
  });

  it('can scroll', async () => {
    element.scrollTop = 42;
    await expect(element.scrollTop).to.be.equal(42);
  });

  it('cant scroll to far', async () => {
    element.scrollTop = 9999;
    await expect(element.scrollTop).not.to.be.equal(9999);
  });

  it('cant scroll to less than zero', async () => {
    element.scrollTop = -100;
    await expect(element.scrollTop).to.be.equal(0);
  });

  it('can scroll sideways if content enforces it', async () => {
    element.scrollLeft = 42;
    await expect(element.scrollLeft).to.be.equal(42);
  });
});

describe('UUIScrollContainerElement with very little content', () => {
  let element: UUIScrollContainerElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-scroll-container style="width:200px; height:200px;">
        very little content.
      </uui-scroll-container>`,
    );
  });
  it('cannot scroll', async () => {
    element.scrollTop = 10;
    await expect(element.scrollTop).to.be.equal(0);
  });

  it('cannot scroll sideways', async () => {
    element.scrollLeft = 42;
    await expect(element.scrollLeft).to.be.equal(0);
  });
});

describe('properties', () => {
  let element: UUIScrollContainerElement;
  beforeEach(async () => {
    element = await fixture(
      html`<uui-scroll-container style="width:200px; height:200px;">
        Hello tests
      </uui-scroll-container>`,
    );
  });

  it('has a enforce-scroll property', () => {
    expect(element).to.have.property('enforceScroll');
  });
  it('enforceScroll property set', async () => {
    element.enforceScroll = true;
    await elementUpdated(element);
    expect(element.enforceScroll).to.equal(true);
  });
});
