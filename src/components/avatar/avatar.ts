import { defineElement } from '../../internal/registration/index.js';
import { UUIAvatarElement } from './avatar.element.js';

export * from './avatar.element.js';

export default UUIAvatarElement;

defineElement('uui-avatar', UUIAvatarElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-avatar': UUIAvatarElement;
  }
}
