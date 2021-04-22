import { css } from 'lit-element';
import { UUIButtonGroupElement } from '../uui-button-group/uui-button-group.element';

export class UUIActionGroupElement extends UUIButtonGroupElement {
  static styles = [
    ...UUIButtonGroupElement.styles,
    css`
      ::slotted(*) {
        --uui-button-slot-padding-x-factor: 0.666;
      }

      ::slotted(uui-button:first-child) {
        --uui-button-border-radius: 100% 0 0 100%;
        --uui-button-slot-padding-x-factor: 0.8;
      }
      ::slotted(uui-button:nth-last-child(1)) {
        --uui-button-border-radius: 0 100% 100% 0;
        --uui-button-slot-padding-x-factor: 0.8;
      }
    `,
  ];
}
