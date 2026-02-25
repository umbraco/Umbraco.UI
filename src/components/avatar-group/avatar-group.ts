import { defineElement } from '../../internal/registration/index.js';
import { UUIAvatarGroupElement } from './avatar-group.element.js';

export * from './avatar-group.element.js';

export default UUIAvatarGroupElement;

defineElement('uui-avatar-group', UUIAvatarGroupElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-avatar-group': UUIAvatarGroupElement;
  }
}
