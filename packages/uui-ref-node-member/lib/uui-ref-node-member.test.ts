import { html, fixture, expect } from '@open-wc/testing';
import { UUIRefNodeMemberElement } from './uui-ref-node-member.element';
import '.';

describe('UUIRefNodeMemberElement', () => {
  let element: UUIRefNodeMemberElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-ref-node-member></uui-ref-node-member> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
