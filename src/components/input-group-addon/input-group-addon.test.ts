import './input-group-addon.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIInputGroupAddonElement } from './input-group-addon.element';

describe('UUIInputGroupAddonElement', () => {
  let element: UUIInputGroupAddonElement;

  beforeEach(async () => {
    element = render(
      html`<uui-input-group-addon></uui-input-group-addon>`,
    ).container.querySelector('uui-input-group-addon')!;
    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIInputGroupAddonElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
