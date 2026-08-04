import { defineElement } from '../../internal/registration/index.js';
import { UUICardUserElement } from './card-user.element.js';

defineElement('uui-card-user', UUICardUserElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-card-user': UUICardUserElement;
  }
}

export * from './card-user.element.js';
