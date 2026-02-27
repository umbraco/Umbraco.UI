import { defineElement } from '../../internal/registration/index.js';
import { UUIAvatarElement } from './avatar.element.js';

defineElement('uui-avatar', UUIAvatarElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-avatar': UUIAvatarElement;
  }
}

export * from './avatar.element.js';
export { UUIAvatarElement as default } from './avatar.element.js';
