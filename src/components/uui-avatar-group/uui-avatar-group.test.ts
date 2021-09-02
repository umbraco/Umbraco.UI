import { html, fixture, expect } from '@open-wc/testing';
import '.';
import { UUIAvatarGroupElement } from './uui-avatar-group.element';

describe('UuiAvatarGroup', () => {
  let element: UUIAvatarGroupElement;
  beforeEach(async () => {
    element = await fixture(html`<uui-avatar-group></uui-avatar-group>`);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('renders correct numbers of avatars', async () => {
    const avatarGroup = await fixture(
      html`
        <uui-avatar-group
          ><uui-avatar title="First Last"></uui-avatar
          ><uui-avatar title="First Last"></uui-avatar
          ><uui-avatar title="First Last"></uui-avatar
        ></uui-avatar-group>
      `
    );

    const slot = avatarGroup.shadowRoot!.querySelector('slot');
    const avatars = slot!.assignedNodes({ flatten: false });

    expect(avatars).lengthOf(3);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UuiAvatarGroup Limit', async () => {
  let avatarGroup: UUIAvatarGroupElement;
  beforeEach(async () => {
    avatarGroup = await fixture(html` <uui-avatar-group .limit="${2}">
      <uui-avatar title="First Last"></uui-avatar>
      <uui-avatar title="First Last"></uui-avatar>
      <uui-avatar title="First Last"></uui-avatar>
      <uui-avatar title="First Last"></uui-avatar>
    </uui-avatar-group>`);
  });

  it('Hides avatars correctly', async () => {
    const slot = avatarGroup.shadowRoot!.querySelector('slot');
    const avatars = slot!.assignedElements({ flatten: true });
    const avatar = avatars[3];
    expect(avatar).not.to.be.displayed;
  });

  it('Shows the limit text when there are more avatars than the set limit', async () => {
    const small = avatarGroup.shadowRoot!.querySelector('small');
    expect(small).to.exist.and.have.text('+2');
  });

  it('Does not show limit text when not set', async () => {
    avatarGroup = await fixture(html` <uui-avatar-group>
      <uui-avatar title="First Last"></uui-avatar>
      <uui-avatar title="First Last"></uui-avatar>
    </uui-avatar-group>`);

    const small = avatarGroup.shadowRoot!.querySelector('small');
    expect(small).to.not.exist;
  });
});
