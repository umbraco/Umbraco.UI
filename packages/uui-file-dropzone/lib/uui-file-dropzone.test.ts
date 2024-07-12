import { html, fixture, expect } from '@open-wc/testing';
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

  describe('drop files', () => {
    it('supports dropping a single file', done => {
      const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);

      expectFileChangeEvent(element, 1, 0, done);

      element.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    });

    it('can drop multiple files', done => {
      const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);

      element.multiple = true;

      expectFileChangeEvent(element, 2, 0, done);

      element.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    });

    it('can set the accept attribute with a mimetype', done => {
      const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);

      element.accept = 'image/*';

      expectFileChangeEvent(element, 1, 0, done);

      element.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    });

    it('can set the accept attribute with a file extension', done => {
      const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);

      element.accept = '.jpg';

      expectFileChangeEvent(element, 1, 0, done);

      element.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    });
  });

  describe('browse files', () => {
    let innerElement: HTMLInputElement;

    beforeEach(() => {
      innerElement = element.shadowRoot!.querySelector('input')!;
    });

    it('supports selecting a single file', done => {
      const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
      const dt = new DataTransfer();
      dt.items.add(file1);
      dt.items.add(file2);

      expectFileChangeEvent(element, 1, 0, done);

      innerElement.files = dt.files;
      innerElement.dispatchEvent(new Event('change'));
    });

    it('can select multiple files', done => {
      const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
      const dt = new DataTransfer();
      dt.items.add(file1);
      dt.items.add(file2);

      element.multiple = true;

      expectFileChangeEvent(element, 2, 0, done);

      innerElement.files = dt.files;
      innerElement.dispatchEvent(new Event('change'));
    });
  });
});
