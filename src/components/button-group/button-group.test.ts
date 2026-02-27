import './button-group.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIButtonGroupElement } from './button-group.element';
import '../button/button.js';

describe('UuiButtonGroup', () => {
  let element: UUIButtonGroupElement;
  beforeEach(async () => {
    element = render(html`
      <uui-button-group
        ><uui-button label="My label">Hello uui-button</uui-button
        ><uui-button label="My label">Hello uui-button</uui-button
        ><uui-button label="My label"
          >Hello uui-button</uui-button
        ></uui-button-group
      >
    `).container.querySelector('uui-button-group')!;

    await element.updateComplete;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIButtonGroupElement);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).not.toBe(null);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
