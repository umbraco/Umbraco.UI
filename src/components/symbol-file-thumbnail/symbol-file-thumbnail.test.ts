import './symbol-file-thumbnail.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUISymbolFileThumbnailElement } from './symbol-file-thumbnail.element';

import '../icon/icon.js';

describe('UUISymbolFileThumbnailElement', () => {
  let element: UUISymbolFileThumbnailElement;

  beforeEach(async () => {
    element = render(html`
      <uui-symbol-file-thumbnail></uui-symbol-file-thumbnail>
    `).container.querySelector('uui-symbol-file-thumbnail')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUISymbolFileThumbnailElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
