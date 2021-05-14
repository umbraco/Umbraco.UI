import { UUIEvent } from '../../event/UUIEvent';
import { UUIFilePreviewElement } from './uui-file-preview.element';

export class UUIFilePreviewEvent extends UUIEvent<{}, UUIFilePreviewElement> {
  public static readonly REMOVE_FILE: string = 'remove-file';
}
