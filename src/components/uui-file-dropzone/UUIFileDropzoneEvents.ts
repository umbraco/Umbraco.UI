import { UUIEvent } from '../../event/UUIEvent';
import { UUIFileDropzoneElement } from './uui-file-dropzone.element';

export class UUIFileDropzoneEvent extends UUIEvent<{}, UUIFileDropzoneElement> {
  public static readonly FILE_DROP: string = 'file-drop';
}
