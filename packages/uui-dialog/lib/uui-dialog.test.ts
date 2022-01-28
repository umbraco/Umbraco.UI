import './define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUIDialogElement } from './uui-dialog.element';

describe('UUIDialogElement', () => {
  let element: UUIDialogElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-dialog></uui-dialog> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });

    it('renders an action slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=actions]')!;
      expect(slot).to.exist;
    });
  });
});
