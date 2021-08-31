import { html, fixture, expect } from '@open-wc/testing';
import { UUIToggleElement } from './uui-toggle.element';
import '.';
import { property } from 'lit/decorators';

describe('UuiToggle', () => {
  let element: UUIToggleElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-toggle label="test label"></uui-toggle> `
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
