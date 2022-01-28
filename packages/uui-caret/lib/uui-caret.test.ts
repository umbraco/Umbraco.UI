import './define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUICaretElement } from './uui-caret.element';

describe('UUICaretElement', () => {
  let element: UUICaretElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-caret></uui-caret> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
