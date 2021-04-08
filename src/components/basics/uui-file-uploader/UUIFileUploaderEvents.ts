import { UUIEvent } from '../../../event/UUIEvent';
import { UUIFileUploaderElement } from './uui-file-uploader.element';

export class UUIFileUploaderEvent extends UUIEvent<{}, UUIFileUploaderElement> {
  public static readonly FILE_DROP: string = 'file-drop';
}
