import { html, fixture, expect } from '@open-wc/testing';
import './index';
import { UUIAvatarElement } from './uui-avatar.element';

const avatarSrc =
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9&h=100&w=100';

describe('UuiAvatar', () => {
  let element: UUIAvatarElement;

  beforeEach(async () => {
    element = await fixture(html`<uui-avatar title="My Avatar"></uui-avatar>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has an overflow property', () => {
      expect(element).to.have.property('overflow');
    });

    it('has a imgSrc property', () => {
      expect(element).to.have.property('imgSrc');
    });

    it('has a imgSrcset property', () => {
      expect(element).to.have.property('imgSrcset');
    });

    it('has a title property', () => {
      expect(element).to.have.property('title');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  it('renders an image when imgSrc is set', async () => {
    const avatar = await fixture(
      html`<uui-avatar img-src="${avatarSrc}" title="My Avatar"></uui-avatar>`
    );
    expect(avatar).shadowDom.to.equal(
      `<img alt="MA" src="${avatarSrc}" srcset="" title="My Avatar" /><slot></<slot>`
    );
  });

  it('renders an image with alt text when imgSrc and text is set', async () => {
    const avatar = await fixture(
      html`<uui-avatar img-src="${avatarSrc}" title="alt text"></uui-avatar>`
    );
    expect(avatar).shadowDom.to.equal(
      `<img alt="AT" src="${avatarSrc}" srcset="" title="alt text" /><slot></<slot>`
    );
  });

  it('shows the first initial when text is used and there is no image', async () => {
    const avatar = await fixture(html`<uui-avatar title="First"></uui-avatar>`);
    expect(avatar).shadowDom.to.equal('F<slot></<slot>');
  });

  it('shows the first and last initial when text is used and there is no image', async () => {
    const avatar = await fixture(
      html`<uui-avatar title="First Second Last"></uui-avatar>`
    );
    expect(avatar).shadowDom.to.equal('FL<slot></<slot>');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
