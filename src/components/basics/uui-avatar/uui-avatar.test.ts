import { html, fixture, expect } from '@open-wc/testing';

import '.';
import { UUIAvatarElement } from './uui-avatar.element';

describe('UuiAvatar', () => {
  let element: UUIAvatarElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-avatar></uui-avatar> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
