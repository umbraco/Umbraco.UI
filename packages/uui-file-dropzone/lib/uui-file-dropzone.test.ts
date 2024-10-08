import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { UUIFileDropzoneElement } from './uui-file-dropzone.element';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvent';

function expectFileChangeEvent(
  element: UUIFileDropzoneElement,
  numberOfFiles: number,
  numberOfFolders: number,
  done: Mocha.Done,
) {
  element.addEventListener('change', e => {
    const { files, folders } = (e as UUIFileDropzoneEvent).detail;
    expect(
      files.length,
      `There should be ${numberOfFiles} file(s) uploaded`,
    ).to.equal(numberOfFiles);
    expect(
      folders.length,
      `There should be ${numberOfFolders} folder(s) uploaded`,
    ).to.equal(numberOfFolders);
    done();
  });
}

describe('UUIFileDropzoneElement', () => {
  let element: UUIFileDropzoneElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-file-dropzone label="Dropzone"></uui-file-dropzone>
    `);
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIFileDropzoneElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('drop files', async () => {
    it('supports dropping a single file', () => {
      const dataTransfer = new DataTransfer();
      // Skip if browser does not support DataTransfer.items
      if ('items' in dataTransfer) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        const listener = oneEvent(element, UUIFileDropzoneEvent.CHANGE, false);
        element.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        listener.then(event => {
          const { files } = event.detail;
          expect(files.length).to.equal(1);
        });
      }
    });

    it('can drop multiple files', () => {
      const dataTransfer = new DataTransfer();
      if ('items' in dataTransfer) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        element.multiple = true;

        const listener = oneEvent(element, UUIFileDropzoneEvent.CHANGE, false);
        element.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        listener.then(event => {
          const { files } = event.detail;
          expect(files.length).to.equal(1);
        });
      }
    });

    it('can set the accept attribute with a mimetype', () => {
      const dataTransfer = new DataTransfer();
      if ('items' in dataTransfer) {
        const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        element.accept = 'image/*';

        const listener = oneEvent(element, UUIFileDropzoneEvent.CHANGE, false);
        element.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        listener.then(event => {
          const { files } = event.detail;
          expect(files.length).to.equal(1);
        });
      }
    });

    it('can set the accept attribute with a file extension', () => {
      const dataTransfer = new DataTransfer();
      if ('items' in dataTransfer) {
        const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        element.accept = '.jpg';

        const listener = oneEvent(element, UUIFileDropzoneEvent.CHANGE, false);
        element.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        listener.then(event => {
          const { files } = event.detail;
          expect(files.length).to.equal(1);
        });
      }
    });
  });

  describe('browse files', () => {
    let innerElement: HTMLInputElement;

    beforeEach(() => {
      innerElement = element.shadowRoot!.querySelector('input')!;
    });

    it('supports selecting a single file', done => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dt.items.add(file1);
        dt.items.add(file2);

        expectFileChangeEvent(element, 1, 0, done);

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));
      } else {
        done();
      }
    });

    it('can select multiple files', done => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dt.items.add(file1);
        dt.items.add(file2);

        element.multiple = true;

        expectFileChangeEvent(element, 2, 0, done);

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));
      } else {
        done();
      }
    });
  });
});
