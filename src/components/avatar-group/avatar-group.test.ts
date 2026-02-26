import './avatar-group.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIAvatarGroupElement } from './avatar-group.element';

describe('UuiAvatarGroup', () => {
  let element: UUIAvatarGroupElement;
  beforeEach(async () => {
    element = render(html`<uui-avatar-group></uui-avatar-group>`).container.querySelector('uui-avatar-group')!;

    await element.updateComplete;
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).not.toBe(null);
  });

  it('renders correct numbers of avatars', async () => {
    const avatarGroup = render(html`
      <uui-avatar-group
        ><uui-avatar name="First Last"></uui-avatar
        ><uui-avatar name="First Last"></uui-avatar
        ><uui-avatar name="First Last"></uui-avatar
      ></uui-avatar-group>
    `).container.querySelector('uui-avatar-group')!;

    await avatarGroup.updateComplete;

    const slot = avatarGroup.shadowRoot!.querySelector('slot');
    const avatars = slot!.assignedNodes({ flatten: false });

    expect(avatars).lengthOf(3);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('properties', () => {
    it('has an limit property', () => {
      expect(element).toHaveProperty('limit');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });
  });
});

describe('UuiAvatarGroup Limit', async () => {
  let avatarGroup: UUIAvatarGroupElement;
  beforeEach(async () => {
    avatarGroup = render(html` <uui-avatar-group .limit="${2}">
        <uui-avatar name="First Last"></uui-avatar>
        <uui-avatar name="First Last"></uui-avatar>
        <uui-avatar name="First Last"></uui-avatar>
        <uui-avatar name="First Last"></uui-avatar>
      </uui-avatar-group>`).container.querySelector('uui-avatar-group')!;

    await avatarGroup.updateComplete;
  });

  it('Hides avatars correctly', () => {
    const slot = avatarGroup.shadowRoot!.querySelector('slot');
    const avatars = slot!.assignedElements({ flatten: true });
    const avatar = avatars[3];
    expect(avatar).not.toBeVisible();
  });

  it('Shows the limit text when there are more avatars than the set limit', () => {
    const small = avatarGroup.shadowRoot!.querySelector('small');
    expect(small).not.toBe(null);
    expect(small.textContent).toBe('+2');
  });

  it('Does not show limit text when not set', async () => {
    avatarGroup = render(html` <uui-avatar-group>
        <uui-avatar name="First Last"></uui-avatar>
        <uui-avatar name="First Last"></uui-avatar>
      </uui-avatar-group>`).container.querySelector('uui-avatar-group')!;

    await avatarGroup.updateComplete;

    const small = avatarGroup.shadowRoot!.querySelector('small');
    expect(small).toBe(null);
  });
});
