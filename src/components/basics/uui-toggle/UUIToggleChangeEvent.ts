import { UUIEvent } from '../../../event/UUIEvent';

export class UUIToggleChangeEvent extends UUIEvent {
  constructor() {
    super('change');
  }
}
