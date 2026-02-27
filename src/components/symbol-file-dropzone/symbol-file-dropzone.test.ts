import { UUISymbolFileDropzoneElement } from './symbol-file-dropzone.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './symbol-file-dropzone.js';

describe('UUISymbolFileDropzoneElement', () => {
  let element: UUISymbolFileDropzoneElement;

  beforeEach(async () => {
    element = render(html`
      <uui-symbol-file-dropzone></uui-symbol-file-dropzone>
    `).container.querySelector('uui-symbol-file-dropzone')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUISymbolFileDropzoneElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
