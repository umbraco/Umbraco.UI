import { UUIButtonInlineCreateElement } from './button-inline-create.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './button-inline-create.js';

describe('UUIButtonInlineCreateElement', () => {
  let element: UUIButtonInlineCreateElement;

  beforeEach(async () => {
    element = render(html`
      <uui-button-inline-create
        label="Create something here"></uui-button-inline-create>
    `).container.querySelector('uui-button-inline-create')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
