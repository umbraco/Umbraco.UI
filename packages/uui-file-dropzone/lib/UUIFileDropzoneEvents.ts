import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import { UUIFileDropzoneElement } from './uui-file-dropzone.element';

export class UUIFileDropzoneEvent extends UUIEvent<
  { files: File[] },
  UUIFileDropzoneElement
> {
  public static readonly FILE_CHANGE: string = 'file-change';
}
