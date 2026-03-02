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

  describe('file property', () => {
    it('getter returns the file after setting it', async () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      element.file = file;
      await element.updateComplete;
      expect(element.file).toBe(file);
    });

    it('renders the file name', async () => {
      const file = new File(['content'], 'document.pdf', {
        type: 'application/pdf',
      });
      element.file = file;
      await element.updateComplete;
      const nameEl =
        element.shadowRoot!.querySelector<HTMLElement>('#file-name');
      const text = nameEl?.textContent?.replace(/\s+/g, '') ?? '';
      expect(text).toContain('document');
    });
  });
});
