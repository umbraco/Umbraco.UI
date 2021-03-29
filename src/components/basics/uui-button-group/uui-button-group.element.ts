import {
  LitElement,
  html,
  css,
  property,
  queryAssignedNodes,
} from 'lit-element';
import { UUIButtonElement } from '../uui-button/uui-button.element';

/**
 *  @element uui-button-group
 *  @slot - for buttons
 *  @description
 */
export class UUIButtonGroupElement extends LitElement {
  static styles = [
    css`
      ::slotted(uui-button) {
        --uui-size-border-radius: 0;
      }

      ::slotted(uui-button[look='outline']) {
        margin-left: -1px;
      }

      ::slotted(uui-button[look='outline']:hover) {
        z-index: 1;
      }
    `,
  ];

  @queryAssignedNodes(undefined, true, 'uui-button')
  slottedButtons!: UUIButtonElement[];

  firstUpdated() {
    console.log(this.slottedButtons);
    this.slottedButtons[0].setAttribute('first-group-button', 'true');
    this.slottedButtons[this.slottedButtons.length - 1].setAttribute(
      'last-group-button',
      'true'
    );
  }

  @property({ reflect: true })
  render() {
    return html` <slot></slot> `;
  }
}
