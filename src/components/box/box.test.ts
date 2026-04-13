import './box.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';

import { UUIBoxElement } from './box.element';
import { UUIInterfaceHeadingValues } from '../../internal/types';

describe('UUIBox', () => {
  let element: UUIBoxElement;
  beforeEach(async () => {
    element = render(html` <uui-box headline="headline"> Main </uui-box>`).container.querySelector('uui-box')!;

    await element.updateComplete;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIBoxElement);
  });

  it('passes the a11y audit', async () => {
    for (const headlineVariant of UUIInterfaceHeadingValues) {
      element = render(html` <uui-box
          headline="headline"
          .headlineVariant="${headlineVariant}">
          Main
        </uui-box>`).container.querySelector('uui-box')!;

      await element.updateComplete;
      expect(await axeRun(element)).toHaveNoViolations();
    }
  });

  describe('properties', () => {
    it('has a headline property', () => {
      expect(element).toHaveProperty('headline');
    });
    it('has a headlineVariant property', () => {
      expect(element).toHaveProperty('headlineVariant');
    });
  });

  describe('css custom properties', () => {
    let wrapper: HTMLDivElement;
    let element: UUIBoxElement;
    beforeEach(async () => {
      wrapper = render(html`<div style="--uui-box-default-padding:1337px;">
          <uui-box headline="headline"> Main </uui-box>
        </div>`).container.querySelector('div')! as HTMLDivElement;
      element = wrapper.querySelector('uui-box')!;
    });
    it('allows for --uui-box-default-padding to be defined outside the scope.', () => {
      const elementStyles = window.getComputedStyle(element);
      expect(
        elementStyles.getPropertyValue('--uui-box-default-padding').trim(),
      ).toBe('1337px');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBe(null);
    });

    it('renders an headline slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=headline]')!;
      expect(slot).not.toBe(null);
    });

    it('renders a header slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=header]')!;
      expect(slot).not.toBe(null);
    });

    it('renders a header-actions slot', () => {
      const slot = element.shadowRoot!.querySelector(
        'slot[name=header-actions',
      )!;
      expect(slot).not.toBe(null);
    });

    it('renders specified headline tag when headlineVariant is set', async () => {
      element = render(html` <uui-box headline="headline" headline-variant="h2"
          >Main</uui-box
        >`).container.querySelector('uui-box')!;

      await element.updateComplete;

      // it should exist and it should be the only one
      expect(element.shadowRoot!.querySelectorAll('h2')).toHaveLength(1);

      // and it should change when headlineVariant changes
      element.headlineVariant = 'h3';
      await element.updateComplete;
      expect(element.shadowRoot!.querySelectorAll('h3')).toHaveLength(1);
    });
  });

  describe('UUIBox', () => {
    let element: UUIBoxElement;
    beforeEach(async () => {
      element = render(html` <uui-box>
          <div slot="header">Something in the header</div>
          Main
        </uui-box>`).container.querySelector('uui-box')!;

      await element.updateComplete;
    });

    it('passes the a11y audit', async () => {
      expect(await axeRun(element)).toHaveNoViolations();
    });
  });
});
