import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';
import { UUIModalEvent } from './UUIModalEvent';

/**
 *  @element uui-modal
 *  @description - All-round modal base component, to be injected into the modal container
 */
export class UUIModalElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ];

  private modalMovementTimeout?: number;

  @property({ type: Boolean, reflect: true })
  public modalVisible = false;

  public openModal() {
    window.clearTimeout(this.modalMovementTimeout as number);
    this.updateComplete.then(() => {
      window.requestAnimationFrame(() => {
        this.modalVisible = true;
        this.dispatchEvent(new UUIModalEvent(UUIModalEvent.OPEN, this));
      });
    });
  }
  public closeModal() {
    if (this.modalVisible === true) {
      this.modalVisible = false;
      this.dispatchEvent(new UUIModalEvent(UUIModalEvent.CLOSE, this));

      this.modalMovementTimeout = window.setTimeout(() => {
        if (this.modalVisible === false) {
          this.dispatchEvent(new UUIModalEvent(UUIModalEvent.CLOSED, this));
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        }
      }, 480);
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}
