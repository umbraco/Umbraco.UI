import { html, fixture, expect } from '@open-wc/testing';
import { UUIFileDropzoneElement } from './uui-file-dropzone.element';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvent';

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

  describe('dragover', () => {
    it('supports dropping a single file', done => {
      const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);

      element.addEventListener('change', e => {
        const { files, folders } = (e as UUIFileDropzoneEvent).detail;
        expect(files.length, 'There should be one file uploaded').to.equal(1);
        expect(folders.length, 'There should be no folders uploaded').to.equal(
          0,
        );
        done();
      });

      element.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    });

    it('can drop multiple files', done => {
      const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
      const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);

      element.multiple = true;

      element.addEventListener('change', e => {
        const { files, folders } = (e as UUIFileDropzoneEvent).detail;
        expect(files.length, 'There should be two files uploaded').to.equal(2);
        expect(folders.length, 'There should be no folders uploaded').to.equal(
          0,
        );
        done();
      });

      element.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    });

    it('can drop a folder with multiple files', () => {
      // TODO: Need to find a way to simulate a folder drop
      expect(true).to.equal(true);
    });
  });
});
