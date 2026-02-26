// Side-effect component imports
import '@umbraco-ui/uui/components/button/button.js';
import '@umbraco-ui/uui/components/input/input.js';

// Named imports from component deep paths
import { UUIButtonElement } from '@umbraco-ui/uui/components/button/button.element.js';
import type { UUIInputElement } from '@umbraco-ui/uui/components/input/input.element.js';

// Foundation imports (uui-base) — should merge into one
import { defineElement, LabelMixin, UUITextStyles } from '@umbraco-ui/uui';

// Barrel import — should be left alone
import '@umbraco-ui/uui';

// Export re-exports
export { UUIButtonElement } from '@umbraco-ui/uui/components/button/button.element.js';
export type { UUIInputEvent } from '@umbraco-ui/uui/components/input/input.event.js';
export * from '@umbraco-ui/uui/components/badge/badge.js';

// Dynamic import
const loader = () => import('@umbraco-ui/uui/components/dialog/dialog.js');

// Multi-part component name
import '@umbraco-ui/uui/components/button-group/button-group.js';

// Deep import with .js extension
import { UUICardElement } from '@umbraco-ui/uui/components/card/card.element.js';

// Removed component (should warn)
import '@umbraco-ui/uui-caret';

// Non-UUI import — should be left alone
import { html } from 'lit';

// CSS dist path in a config-style string literal
const cssPath = 'node_modules/@umbraco-ui/uui/dist/themes/light.css';

// Font assets path
const fontPath = 'node_modules/@umbraco-ui/uui/dist/assets/fonts/*';

// Template literal with <link> tag
const tpl = html`<link rel="stylesheet" href="node_modules/@umbraco-ui/uui/dist/themes/light.css" />`;
