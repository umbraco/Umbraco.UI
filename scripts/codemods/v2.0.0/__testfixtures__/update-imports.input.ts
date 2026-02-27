// Side-effect component imports
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-input';

// Named imports from component deep paths
import { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';
import type { UUIInputElement } from '@umbraco-ui/uui-input/lib/uui-input.element';

// Foundation imports (uui-base) — should merge into one
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

// CSS imports — should merge with uui-base into @umbraco-ui/uui
import { UUITextStyles } from '@umbraco-ui/uui-css/lib/uui-text.styles';

// Barrel import — should be left alone
import '@umbraco-ui/uui';

// Export re-exports
export { UUIButtonElement } from '@umbraco-ui/uui-button/lib/uui-button.element';
export type { UUIInputEvent } from '@umbraco-ui/uui-input/lib/uui-input.event';
export * from '@umbraco-ui/uui-badge';

// Dynamic import
const loader = () => import('@umbraco-ui/uui-dialog');

// Multi-part component name
import '@umbraco-ui/uui-button-group';

// Deep import with .js extension
import { UUICardElement } from '@umbraco-ui/uui-card/lib/uui-card.element.js';

// Bare uui-base import
import '@umbraco-ui/uui-base';

// Removed component (should warn)
import '@umbraco-ui/uui-caret';

// Non-UUI import — should be left alone
import { html } from 'lit';

// CSS dist path in a config-style string literal
const cssPath = 'node_modules/@umbraco-ui/uui-css/dist/uui-css.css';

// Font assets path
const fontDir = 'node_modules/@umbraco-ui/uui-css/assets/fonts';
const fontGlob = 'node_modules/@umbraco-ui/uui-css/assets/fonts/*';

// Template literal with <link> tag
const tpl = html`<link rel="stylesheet" href="node_modules/@umbraco-ui/uui-css/dist/uui-css.css" />`;
