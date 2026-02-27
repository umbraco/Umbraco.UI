import './file-preview.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIFilePreviewElement } from './file-preview.element';

import '../symbol-file/symbol-file.js';
import '../symbol-folder/symbol-folder.js';
import '../symbol-file-thumbnail/symbol-file-thumbnail.js';

describe('UUIFilePreviewElement', () => {
  let element: UUIFilePreviewElement;

  beforeEach(async () => {
    element = render(html` <uui-file-preview></uui-file-preview> `).container.querySelector('uui-file-preview')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIFilePreviewElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
