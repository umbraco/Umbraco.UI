import { html, fixture, expect } from '@open-wc/testing';

import '.';
import { UUIInlineCreateButtonElement } from './uui-inline-create-button.element';

describe('UuiInlineCreateButton', () => {
  let element: UUIInlineCreateButtonElement;
  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-inline-create-button>Hello uui-button</uui-inline-create-button>
      `
    );
  });

  // TODO: Implement click-event test?..

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
