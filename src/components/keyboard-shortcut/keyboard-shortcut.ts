import { defineElement } from '../../internal/registration/index.js';
import { UUIKeyElement } from './key.element.js';
import { UUIKeyboardShortcutElement } from './keyboard-shortcut.element.js';

export * from './key.element.js';
export * from './keyboard-shortcut.element.js';

export default UUIKeyboardShortcutElement;

defineElement('uui-key', UUIKeyElement);
defineElement('uui-keyboard-shortcut', UUIKeyboardShortcutElement);

declare global {
  interface HTMLElementTagNameMap {
    'uui-key': UUIKeyElement;
    'uui-keyboard-shortcut': UUIKeyboardShortcutElement;
  }
}
