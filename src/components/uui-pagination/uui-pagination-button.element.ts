import { property } from 'lit-element';
import { UUIButtonElement } from '../uui-button/uui-button.element';

export class UUIPaginationButtonElement extends UUIButtonElement {
  static styles = [...UUIButtonElement.styles];

  firstUpdated() {
    // this.buttonWidth = this.getBoundingClientRect().width;
    // console.log(this.buttonWidth);
  }

  @property({ attribute: false })
  buttonWidth = 0;

  @property({ type: Number })
  page = 0;
}
