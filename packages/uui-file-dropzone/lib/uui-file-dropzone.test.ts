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
        expect(files.length).to.equal(1);
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
        expect(files.length).to.equal(2);
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
        expect(files.length).to.equal(1);
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
        expect(files.length).to.equal(1);
      }
    });
  });*/

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

    it('emits reject event when files do not match accept attribute', done => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        const file2 = new File([''], 'file2.pdf', { type: 'application/pdf' });
        dt.items.add(file1);
        dt.items.add(file2);

        element.accept = 'image/*';
        element.multiple = true;

        element.addEventListener('reject', e => {
          const { files } = (e as UUIFileDropzoneEvent).detail;
          expect(files.length).to.equal(2);
          expect(files[0].name).to.equal('file1.txt');
          expect(files[1].name).to.equal('file2.pdf');
          done();
        });

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));
      } else {
        done();
      }
    });

    it('emits both change and reject events when some files match and some do not', done => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
        dt.items.add(file1);
        dt.items.add(file2);

        element.accept = 'image/*';
        element.multiple = true;

        let changeEventFired = false;
        let rejectEventFired = false;

        element.addEventListener('change', e => {
          const { files } = (e as UUIFileDropzoneEvent).detail;
          expect(files.length).to.equal(1);
          expect(files[0].name).to.equal('file1.jpg');
          changeEventFired = true;
          if (changeEventFired && rejectEventFired) {
            done();
          }
        });

        element.addEventListener('reject', e => {
          const { files } = (e as UUIFileDropzoneEvent).detail;
          expect(files.length).to.equal(1);
          expect(files[0].name).to.equal('file2.txt');
          rejectEventFired = true;
          if (changeEventFired && rejectEventFired) {
            done();
          }
        });

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));
      } else {
        done();
      }
    });

    it('emits reject event when file extension does not match', done => {
      const dt = new DataTransfer();
      if ('items' in dt) {
        const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
        dt.items.add(file1);

        element.accept = '.jpg,.png';

        element.addEventListener('reject', e => {
          const { files } = (e as UUIFileDropzoneEvent).detail;
          expect(files.length).to.equal(1);
          expect(files[0].name).to.equal('file1.txt');
          done();
        });

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));
      } else {
        done();
      }
    });

    it('does not emit reject event when multiple=false and an accepted file is found', done => {
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

        element.addEventListener('change', e => {
          const { files } = (e as UUIFileDropzoneEvent).detail;
          expect(files.length).to.equal(1);
          expect(files[0].name).to.equal('file1.jpg');
          expect(rejectEventFired).to.be.false;
          done();
        });

        innerElement.files = dt.files;
        innerElement.dispatchEvent(new Event('change'));
      } else {
        done();
      }
    });
  });

  describe('_processRootEntries', () => {
    function mockFileEntry(
      name: string,
      type = 'text/plain',
    ): FileSystemFileEntry {
      return {
        isFile: true,
        isDirectory: false,
        name,
        file: (cb: (f: File) => void) => cb(new File([''], name, { type })),
      } as unknown as FileSystemFileEntry;
    }

    function mockFolderEntry(name: string): FileSystemDirectoryEntry {
      return {
        isFile: false,
        isDirectory: true,
        name,
        createReader: () => ({
          readEntries: (cb: (entries: FileSystemEntry[]) => void) => cb([]),
        }),
      } as unknown as FileSystemDirectoryEntry;
    }

    it('returns all folders when multiple=true', async () => {
      element.multiple = true;
      const result = await (element as any)._processRootEntries([
        mockFolderEntry('folderA'),
        mockFolderEntry('folderB'),
      ]);
      expect(result.folders.length).to.equal(2);
      expect(result.folders[0].folderName).to.equal('folderA');
      expect(result.folders[1].folderName).to.equal('folderB');
    });

    it('skips folders when multiple=false', async () => {
      element.multiple = false;
      const result = await (element as any)._processRootEntries([
        mockFolderEntry('folderA'),
      ]);
      expect(result.folders.length).to.equal(0);
    });

    it('returns all accepted files', async () => {
      const result = await (element as any)._processRootEntries([
        mockFileEntry('a.txt'),
        mockFileEntry('b.txt'),
      ]);
      expect(result.files.length).to.equal(2);
    });

    it('separates accepted and rejected files by mime type', async () => {
      element.accept = 'image/*';
      const result = await (element as any)._processRootEntries([
        mockFileEntry('photo.jpg', 'image/jpeg'),
        mockFileEntry('doc.txt', 'text/plain'),
      ]);
      expect(result.files.length).to.equal(1);
      expect(result.files[0].name).to.equal('photo.jpg');
      expect(result.rejectedFiles.length).to.equal(1);
      expect(result.rejectedFiles[0].name).to.equal('doc.txt');
    });
  });
});
