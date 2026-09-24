import './split-button.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUISplitButtonElement } from './split-button.element';

describe('UUISplitButtonElement', () => {
  let element: UUISplitButtonElement;

  beforeEach(async () => {
    element = render(
      html`<uui-split-button></uui-split-button>`,
    ).container.querySelector('uui-split-button')!;
    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUISplitButtonElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
