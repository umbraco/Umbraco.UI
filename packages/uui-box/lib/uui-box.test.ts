import { expect, fixture, html } from '@open-wc/testing';

import { UUIBoxElement } from './uui-box.element';
import { InterfaceHeadingValues } from '@umbraco-ui/uui-base/lib/types';

describe('UUIBox', () => {
  let element: UUIBoxElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-box headline="headline"> Main </uui-box>`
    );
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIBoxElement);
  });

  it('passes the a11y audit', async () => {
    for (const headlineVariant of InterfaceHeadingValues) {
      element = await fixture(
        html` <uui-box
          headline="headline"
          .headlineVariant="${headlineVariant}">
          Main
        </uui-box>`
      );
      await expect(element).shadowDom.to.be.accessible();
    }
  });

  describe('properties', () => {
    it('has a headline property', () => {
      expect(element).to.have.property('headline');
    });
    it('has a headlineVariant property', () => {
      expect(element).to.have.property('headlineVariant');
    });
  });

  describe('css custom properties', () => {
    let wrapper: HTMLDivElement;
    let element: UUIBoxElement;
    beforeEach(async () => {
      wrapper = (await fixture(
        html`<div style="--uui-box-default-padding:1337px;">
          <uui-box headline="headline"> Main </uui-box>
        </div>`
      )) as HTMLDivElement;
      element = wrapper.querySelector('uui-box')!;
    });
    it('allows for --uui-box-default-padding to be defined outside the scope.', () => {
      const elementStyles = window.getComputedStyle(element);
      expect(
        elementStyles.getPropertyValue('--uui-box-default-padding').trim()
      ).to.equal('1337px');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });

    it('renders an headline slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=headline]')!;
      expect(slot).to.exist;
    });

    it('renders a header slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=header]')!;
      expect(slot).to.exist;
    });

    it('renders a header-actions slot', () => {
      const slot = element.shadowRoot!.querySelector(
        'slot[name=header-actions'
      )!;
      expect(slot).to.exist;
    });

    it('renders specified headline tag when headlineVariant is set', async () => {
      element = await fixture(
        html` <uui-box headline="headline" headline-variant="h2">Main</uui-box>`
      );

      // it should exist and it should be the only one
      expect(element.shadowRoot!.querySelectorAll('h2')).to.have.lengthOf(1);

      // and it should change when headlineVariant changes
      element.headlineVariant = 'h3';
      await element.updateComplete;
      expect(element.shadowRoot!.querySelectorAll('h3')).to.have.lengthOf(1);
    });
  });

  describe('UUIBox', () => {
    let element: UUIBoxElement;
    beforeEach(async () => {
      element = await fixture(
        html` <uui-box>
          <div slot="header">Something in the header</div>
          Main
        </uui-box>`
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });
});
