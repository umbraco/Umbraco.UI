import { UUIEvent } from './UUIEvent';

type DetailType = {
  value: string;
};

export class UUIToggleChangeEvent extends UUIEvent<DetailType> {}
