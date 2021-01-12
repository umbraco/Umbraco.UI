import { UUIEvent } from './UUIEvent';

type DetailType = {
  selected: boolean;
  source: string;
};

export class UUIListItemClickEvent extends UUIEvent<DetailType> {}
