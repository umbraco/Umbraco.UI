import './input-file.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import { UUIInputFileElement } from './input-file.element';

import '../icon/icon.js';
import '../file-dropzone/file-dropzone.js';
import '../button/button.js';
import '../action-bar/action-bar.js';
import '../file-preview/file-preview.js';

describe('UUIInputFileElement', () => {
  let element: UUIInputFileElement;

  beforeEach(async () => {
    element = render(html` <uui-input-file></uui-input-file> `).container.querySelector('uui-input-file')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIInputFileElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
