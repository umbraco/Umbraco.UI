import './input-group.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIInputGroupElement } from './input-group.element';

describe('UUIInputGroupElement', () => {
  let element: UUIInputGroupElement;

  beforeEach(async () => {
    element = render(
      html`<uui-input-group></uui-input-group>`,
    ).container.querySelector('uui-input-group')!;
    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIInputGroupElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
