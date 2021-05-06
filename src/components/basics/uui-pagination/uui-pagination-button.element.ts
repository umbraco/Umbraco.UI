import { property } from 'lit-element';
import { UUIButtonElement } from '../uui-button/uui-button.element';

export class UUIPaginationButtonElement extends UUIButtonElement {
  static styles = [...UUIButtonElement.styles];

  @property({ type: Number })
  page = 0;
}
