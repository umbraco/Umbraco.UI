import './button-copy-text.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIButtonCopyTextElement } from './button-copy-text.element';
import '../icon/icon.js';

describe('UUIButtonCopyTextElement', () => {
  let element: UUIButtonCopyTextElement;

  beforeEach(async () => {
    element = render(html`<uui-button-copy-text
        text="Oh hi there"
        label="Copy"></uui-button-copy-text>`).container.querySelector('uui-button-copy-text')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIButtonCopyTextElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('renders correctly', async () => {
    expect(element.shadowRoot?.innerHTML).toContain(
      '<uui-icon name="copy" aria-hidden="true"></uui-icon>',
    );
  });
});
