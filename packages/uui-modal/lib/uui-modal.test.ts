import { html, fixture, expect } from '@open-wc/testing';
import {
  UUIModalDialogElement,
  UUIModalSidebarElement,
  UUIModalContainerElement,
} from '.';

describe('UUIModalContainerElement', () => {
  let element: UUIModalContainerElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-modal-container></uui-modal-container>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalContainerElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIModalDialogElement', () => {
  let element: UUIModalDialogElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-modal-dialog></uui-modal-dialog> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalDialogElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('UUIModalSidebarElement', () => {
  let element: UUIModalSidebarElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-modal-sidebar></uui-modal-sidebar> `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalSidebarElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
