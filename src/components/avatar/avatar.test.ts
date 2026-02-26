import './avatar.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIAvatarElement } from './avatar.element';

const avatarSrc =
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9&h=100&w=100';

/** Get the visible text content of the shadow root (excluding slot elements). */
function getShadowText(el: Element): string {
  const root = el.shadowRoot!;
  let text = '';
  for (const node of root.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  }
  return text.trim();
}

describe('UuiAvatar', () => {
  let element: UUIAvatarElement;

  beforeEach(async () => {
    element = render(html`<uui-avatar name="My Avatar"></uui-avatar>`).container.querySelector('uui-avatar')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has an overflow property', () => {
      expect(element).toHaveProperty('overflow');
    });

    it('has a imgSrc property', () => {
      expect(element).toHaveProperty('imgSrc');
    });

    it('has a imgSrcset property', () => {
      expect(element).toHaveProperty('imgSrcset');
    });

    it('has a name property', () => {
      expect(element).toHaveProperty('name');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });

  describe('initials', () => {
    it('renders an image when imgSrc is set', async () => {
      const avatar = render(html`<uui-avatar img-src="${avatarSrc}" name="My Avatar"></uui-avatar>`).container.querySelector('uui-avatar')!;
      await avatar.updateComplete;

      const img = avatar.shadowRoot!.querySelector('img');
      expect(img).not.toBe(null);
      expect(img!.getAttribute('src')).toBe(avatarSrc);
      expect(img!.getAttribute('alt')).toBe('MA');
    });

    it('renders an image with alt text when imgSrc and text is set', async () => {
      const avatar = render(html`<uui-avatar img-src="${avatarSrc}" name="alt text"></uui-avatar>`).container.querySelector('uui-avatar')!;
      await avatar.updateComplete;

      const img = avatar.shadowRoot!.querySelector('img');
      expect(img).not.toBe(null);
      expect(img!.getAttribute('alt')).toBe('AT');
    });

    it('shows the first initial when text is used and there is no image', async () => {
      const avatar = render(html`<uui-avatar name="First"></uui-avatar>`).container.querySelector('uui-avatar')!;
      await avatar.updateComplete;

      expect(getShadowText(avatar)).toBe('F');
    });

    it('shows the first and last initial when text is used and there is no image', async () => {
      element.name = 'First Second Last';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('FL');
    });

    it('renders only first emoji when name contains only emojis', async () => {
      element.name = '👩‍💻';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('👩‍💻');

      element.name = '👩‍💻 👨‍💻';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('👩‍💻');

      element.name = '🍿 Henrik Christensen (HC)';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('HC');
    });

    it('supports non-latin characters', async () => {
      element.name = 'Привет Ša';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('ПŠ');

      element.name = 'Привет';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('П');

      element.name = 'UlŠa Mya';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('UM');

      element.name = 'åse hylle';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('ÅH');
    });

    it('supports overriding initials', async () => {
      element.initials = 'AB';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('AB');
    });

    it('shows a maximum of 3 characters', async () => {
      element.initials = '1234';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('123');
    });

    it('ignores parenthetical suffixes when generating initials', async () => {
      element.name = 'Henrik Christensen (HC)';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('HC');

      element.name = 'Hans Christian Andersen (HCA)';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('HA');

      element.name = 'H. C. Andersen';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('HA');
    });

    it('ignores role descriptions in parentheses', async () => {
      element.name = 'John Doe (Admin)';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('JD');

      element.name = 'Jane Smith (CEO)';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('JS');
    });

    it('handles names with only parentheses content', async () => {
      element.name = '(Test)';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('');
    });

    it('handles names with brackets and other special characters', async () => {
      element.name = 'John [Admin] Doe';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('JD');

      element.name = 'Alice @Company';
      await element.updateComplete;
      expect(getShadowText(element)).toBe('A');
    });
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
