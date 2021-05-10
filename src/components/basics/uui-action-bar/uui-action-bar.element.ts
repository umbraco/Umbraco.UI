import { css } from 'lit';
import { UUIButtonGroupElement } from '../uui-button-group/uui-button-group.element';

export class UUIActionBarElement extends UUIButtonGroupElement {
  static styles = [
    ...UUIButtonGroupElement.styles,
    css`
      ::slotted(*) {
        --uui-button-slot-margin-x-factor: 0.3;
        --uui-button-slot-padding-r-factor: 0.3;
        --uui-button-slot-padding-l-factor: 0.3;
      }

      ::slotted(uui-button:first-child) {
        --uui-button-border-radius: 100% 0 0 100%;
        --uui-button-slot-padding-l-factor: 2;
      }
      ::slotted(uui-button:nth-last-child(1)) {
        --uui-button-border-radius: 0 100% 100% 0;
        --uui-button-slot-padding-r-factor: 2;
      }

      ::slotted([look='outline']),
      ::slotted([look='placeholder']) {
        --uui-button-slot-margin-x-factor: 0.666;
        --uui-button-slot-padding-r-factor: 0.666;
        --uui-button-slot-padding-l-factor: 0.666;
      }

      ::slotted(uui-button[look='outline']:first-child),
      ::slotted(uui-button[look='placeholder']:first-child) {
        --uui-button-border-radius: 100% 0 0 100%;
        --uui-button-slot-padding-l-factor: 0.8;
      }
      ::slotted(uui-button[look='outline']:last-child),
      ::slotted(uui-button[look='placeholder']:last-child) {
        --uui-button-border-radius: 0 100% 100% 0;
        --uui-button-slot-padding-r-factor: 0.8;
      }
    `,
  ];
}
