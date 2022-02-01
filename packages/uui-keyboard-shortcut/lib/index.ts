import { UUIKeyElement } from './uui-key.element';
import { UUIKeyboardShortcutElement } from './uui-keyboard-shortcut.element';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

defineElement('uui-key', UUIKeyElement);
defineElement('uui-keyboard-shortcut', UUIKeyboardShortcutElement);

export * from './uui-keyboard-shortcut.element';
export * from './uui-key.element';
