import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';

import { UUIColorSwatchesElement } from './uui-color-swatches.element';

export class UUIColorSwatchesEvent extends UUIEvent<{}, UUIColorSwatchesElement> {
  public static readonly SELECT = 'select';
}