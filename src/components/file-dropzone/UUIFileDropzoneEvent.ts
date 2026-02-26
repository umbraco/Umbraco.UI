import { UUIEvent } from '../../internal/events/index.js';
import type {
  UUIFileDropzoneElement,
  UUIFileFolder,
} from './file-dropzone.element.js';

export class UUIFileDropzoneEvent extends UUIEvent<
  { files: File[]; folders: UUIFileFolder[] },
  UUIFileDropzoneElement
> {
  public static readonly CHANGE: string = 'change';
  public static readonly REJECT: string = 'reject';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
