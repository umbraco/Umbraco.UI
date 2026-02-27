import './file-dropzone.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import { UUIFileDropzoneElement } from './file-dropzone.element';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvent';

function expectFileChangeEvent(
  element: UUIFileDropzoneElement,
  numberOfFiles: number,
  numberOfFolders: number,
): Promise<void> {
  return new Promise<void>(resolve => {
    element.addEventListener('change', e => {
      const { files, folders } = (e as UUIFileDropzoneEvent).detail;
      expect(
        files.length,
        `There should be ${numberOfFiles} file(s) uploaded`,
      ).toBe(numberOfFiles);
      expect(
        folders.length,
        `There should be ${numberOfFolders} folder(s) uploaded`,
      ).toBe(numberOfFolders);
      resolve();
    });
  });
}

describe('UUIFileDropzoneElement', () => {
  let element: UUIFileDropzoneElement;

  beforeEach(async () => {
    element = render(html`
      <uui-file-dropzone label="Dropzone"></uui-file-dropzone>
    `).container.querySelector('uui-file-dropzone')!;

    await element.updateComplete;
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIFileDropzoneElement);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  /* Disabled because it does not work in the test runner, works in storybook and locally
  describe('drop files', async () => {
    it('supports dropping a single file', async () => {
      const dataTransfer = new DataTransfer();
      // Skip if browser does not support DataTransfer.items
      if ('items' in dataTransfer) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        const listener = oneEvent(element, UUIFileDropzoneEvent.CHANGE);
        element.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        const event = await listener;
        const { files } = event.detail;
        expect(files.length).toBe(1);
      }
    });

    it('can drop multiple files', async () => {
      const dataTransfer = new DataTransfer();
      if ('items' in dataTransfer) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        element.multiple = true;

        const listener = oneEvent(element, UUIFileDropzoneEvent.CHANGE);
        element.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        const event = await listener;
        const { files } = event.detail;
        expect(files.length).toBe(2);
      }
    });

    it('can set the accept attribute with a mimetype', async () => {
      const dataTransfer = new DataTransfer();
      if ('items' in dataTransfer) {
        const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        element.accept = 'image/*';

        const listener = oneEvent(element, UUIFileDropzoneEvent.CHANGE);
        element.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        const event = await listener;
        const { files } = event.detail;
        expect(files.length).toBe(1);
      }
    });

    it('can set the accept attribute with a file extension', async () => {
      const dataTransfer = new DataTransfer();
      if ('items' in dataTransfer) {
        const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        element.accept = '.jpg';

        const listener = oneEvent(element, UUIFileDropzoneEvent.CHANGE);
        element.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        const event = await listener;
        const { files } = event.detail;
        expect(files.length).toBe(1);
      }
    });
  });*/

  describe('browse files', () => {
    let innerElement: HTMLInputElement;

    beforeEach(() => {
      innerElement = element.shadowRoot!.querySelector('input')!;
    });

    it('supports selecting a single file', async () => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dt.items.add(file1);
        dt.items.add(file2);

        const pending = expectFileChangeEvent(element, 1, 0);

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));

        await pending;
      }
    });

    it('can select multiple files', async () => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dt.items.add(file1);
        dt.items.add(file2);

        element.multiple = true;

        const pending = expectFileChangeEvent(element, 2, 0);

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));

        await pending;
      }
    });

    it('emits reject event when files do not match accept attribute', async () => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.pdf', { type: 'application/pdf' });
        dt.items.add(file1);
        dt.items.add(file2);

        element.accept = 'image/*';
        element.multiple = true;

        const pending = new Promise<void>(resolve => {
          element.addEventListener('reject', e => {
            const { files } = (e as UUIFileDropzoneEvent).detail;
            expect(files.length).toBe(2);
            expect(files[0].name).toBe('file1.txt');
            expect(files[1].name).toBe('file2.pdf');
            resolve();
          });
        });

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));

        await pending;
      }
    });

    it('emits both change and reject events when some files match and some do not', async () => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dt.items.add(file1);
        dt.items.add(file2);

        element.accept = 'image/*';
        element.multiple = true;

        const changePending = new Promise<void>(resolve => {
          element.addEventListener('change', e => {
            const { files } = (e as UUIFileDropzoneEvent).detail;
            expect(files.length).toBe(1);
            expect(files[0].name).toBe('file1.jpg');
            resolve();
          });
        });

        const rejectPending = new Promise<void>(resolve => {
          element.addEventListener('reject', e => {
            const { files } = (e as UUIFileDropzoneEvent).detail;
            expect(files.length).toBe(1);
            expect(files[0].name).toBe('file2.txt');
            resolve();
          });
        });

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));

        await Promise.all([changePending, rejectPending]);
      }
    });

    it('emits reject event when file extension does not match', async () => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        dt.items.add(file1);

        element.accept = '.jpg,.png';

        const pending = new Promise<void>(resolve => {
          element.addEventListener('reject', e => {
            const { files } = (e as UUIFileDropzoneEvent).detail;
            expect(files.length).toBe(1);
            expect(files[0].name).toBe('file1.txt');
            resolve();
          });
        });

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));

        await pending;
      }
    });

    it('does not emit reject event when multiple=false and an accepted file is found', async () => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dt.items.add(file1);
        dt.items.add(file2);

        element.accept = 'image/*';
        element.multiple = false;

        let rejectEventFired = false;

        element.addEventListener('reject', () => {
          rejectEventFired = true;
        });

        const pending = new Promise<void>(resolve => {
          element.addEventListener('change', e => {
            const { files } = (e as UUIFileDropzoneEvent).detail;
            expect(files.length).toBe(1);
            expect(files[0].name).toBe('file1.jpg');
            expect(rejectEventFired).toBe(false);
            resolve();
          });
        });

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));

        await pending;
      }
    });
  });
});
