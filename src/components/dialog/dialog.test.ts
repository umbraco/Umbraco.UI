import { html, fixture, expect } from '@open-wc/testing';
import { UUIDialogElement } from './dialog.element';
import './dialog.js';

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
  });
});
