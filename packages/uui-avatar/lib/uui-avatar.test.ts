import { html, fixture, expect } from '@open-wc/testing';
import './index';
import { UUIAvatarElement } from './uui-avatar.element';

const avatarSrc =
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9&h=100&w=100';

describe('UuiAvatar', () => {
  let element: UUIAvatarElement;

  beforeEach(async () => {
    element = await fixture(html`<uui-avatar name="My Avatar"></uui-avatar>`);
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

    it('has a name property', () => {
      expect(element).to.have.property('name');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
  });

  describe('initials', () => {
    it('renders an image when imgSrc is set', async () => {
      const avatar = await fixture(
        html`<uui-avatar img-src="${avatarSrc}" name="My Avatar"></uui-avatar>`,
      );
      expect(avatar).shadowDom.to.equal(
        `<img alt="MA" src="${avatarSrc}" srcset="" title="My Avatar" /><slot></<slot>`,
      );
    });

    it('renders an image with alt text when imgSrc and text is set', async () => {
      const avatar = await fixture(
        html`<uui-avatar img-src="${avatarSrc}" name="alt text"></uui-avatar>`,
      );
      expect(avatar).shadowDom.to.equal(
        `<img alt="AT" src="${avatarSrc}" srcset="" title="alt text" /><slot></<slot>`,
      );
    });

    it('shows the first initial when text is used and there is no image', async () => {
      const avatar = await fixture(
        html`<uui-avatar name="First"></uui-avatar>`,
      );
      expect(avatar).shadowDom.to.equal('F<slot></<slot>');
    });

    it('shows the first and last initial when text is used and there is no image', async () => {
      element.name = 'First Second Last';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('FL<slot></<slot>');
    });

    it('supports unicode characters', async () => {
      element.name = '👩‍💻';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('\ud83d<slot></<slot>');

      element.name = '👩‍💻 👨‍💻';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('\ud83d\ud83d<slot></<slot>');
    });

    it('supports non-latin characters', async () => {
      element.name = 'Привет Ša';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('ПŠ<slot></<slot>');

      element.name = 'Привет';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('П<slot></<slot>');

      element.name = 'UlŠa Mya';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('UM<slot></<slot>');

      element.name = 'åse hylle';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('ÅH<slot></<slot>');
    });

    it('supports overriding initials', async () => {
      element.initials = 'AB';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('AB<slot></<slot>');
    });

    it('shows a maximum of 3 characters', async () => {
      element.initials = '1234';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('123<slot></<slot>');
    });

    it('handles names with parentheses correctly', async () => {
      element.name = 'Henrik Christensen (HC)';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('HC<slot></<slot>');

      element.name = 'Hans Christian Andersen (HCA)';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('HA<slot></<slot>');

      element.name = 'H. C. Andersen';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('HA<slot></<slot>');
    });

    it('handles names with special characters in parentheses', async () => {
      element.name = 'John Doe (Admin)';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('JD<slot></<slot>');

      element.name = 'Jane Smith (CEO)';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('JS<slot></<slot>');
    });

    it('handles names with only parentheses content', async () => {
      element.name = '(Test)';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('<slot></<slot>');
    });

    it('handles names with brackets and other special characters', async () => {
      element.name = 'John [Admin] Doe';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('JD<slot></<slot>');

      element.name = 'Alice @Company';
      await element.updateComplete;
      expect(element).shadowDom.to.equal('A<slot></<slot>');
    });
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
