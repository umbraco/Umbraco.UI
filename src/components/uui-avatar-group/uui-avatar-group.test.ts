import {
  html,
  fixture,
  expect,
  aTimeout,
  oneEvent,
  elementUpdated,
  waitUntil,
} from '@open-wc/testing';
import '.';
import { UUIAvatarGroupElement } from './uui-avatar-group.element';

// describe('UuiAvatarGroup', () => {
//   let element: UUIAvatarGroupElement;
//   beforeEach(async () => {
//     element = await fixture(html`<uui-avatar-group></uui-avatar-group>`);
//   });

//   it('renders a slot', () => {
//     const slot = element.shadowRoot!.querySelector('slot')!;
//     expect(slot).to.exist;
//   });

//   it('renders correct numbers of avatars', async () => {
//     const avatarGroup = await fixture(
//       html`
//         <uui-avatar-group
//           ><uui-avatar title="First Last"></uui-avatar
//           ><uui-avatar title="First Last"></uui-avatar
//           ><uui-avatar title="First Last"></uui-avatar
//         ></uui-avatar-group>
//       `
//     );

//     const slot = avatarGroup.shadowRoot!.querySelector('slot');
//     const avatars = slot!.assignedNodes({ flatten: false });

//     expect(avatars).lengthOf(3);
//   });

//   it('passes the a11y audit', async () => {
//     await expect(element).shadowDom.to.be.accessible();
//   });
// });

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

  it('Limit works', async () => {
    // await elementUpdated(avatarGroup);
    const slot = avatarGroup.shadowRoot!.querySelector('slot');
    const avatars = slot!.assignedElements({ flatten: true });
    const avatar = avatars[3];
    expect(avatar).not.to.be.displayed;
  });
});
