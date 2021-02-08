import { UUIEvent } from '../../../event/UUIEvent';

export class UUIButtonClickEvent extends UUIEvent {
  constructor() {
    super('click');
  }
}
