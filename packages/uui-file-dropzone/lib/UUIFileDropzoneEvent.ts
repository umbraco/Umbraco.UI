import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import {
  UUIFileDropzoneElement,
  UUIFileFolder,
} from './uui-file-dropzone.element';

export class UUIFileDropzoneEvent extends UUIEvent<
  { files: File[]; folders: UUIFileFolder[] },
  UUIFileDropzoneElement
> {
  public static readonly CHANGE: string = 'change';

  constructor(evName: string, eventInit: any | null = {}) {
    super(evName, {
      ...{ bubbles: true },
      ...eventInit,
    });
  }
}
