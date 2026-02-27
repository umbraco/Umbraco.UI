import { defineElement } from '../../internal/registration/index.js';
import { UUIAvatarGroupElement } from './avatar-group.element.js';

defineElement('uui-avatar-group', UUIAvatarGroupElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-avatar-group': UUIAvatarGroupElement;
  }
}

export * from './avatar-group.element.js';
export { UUIAvatarGroupElement as default } from './avatar-group.element.js';
