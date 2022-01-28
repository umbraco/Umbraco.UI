import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

import { UUIKeyElement } from '../lib/uui-key.element';
import { UUIKeyboardShortcutElement } from '../lib/uui-keyboard-shortcut.element';

defineElement('uui-key', UUIKeyElement);
defineElement('uui-keyboard-shortcut', UUIKeyboardShortcutElement);
