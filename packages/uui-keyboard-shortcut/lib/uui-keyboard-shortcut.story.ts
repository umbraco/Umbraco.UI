import '../define';

import { html } from 'lit-html';

export default {
  title: 'Displays/Keyboard Shortcut',
  component: 'uui-keyboard-shortcut',
  id: 'uui-keyboard-shortcut',
};

export const AAAOverview = () => html` <uui-key>Enter</uui-key> `;

AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-key>Enter</uui-key>`,
    },
  },
};

export const KeyCombination = () => html`
  <uui-keyboard-shortcut>
    <uui-key>ALT</uui-key>
    +
    <uui-key>shift</uui-key>
    +
    <uui-key>&#8593;</uui-key>
    +
    <uui-key>z</uui-key>
  </uui-keyboard-shortcut>
`;

KeyCombination.parameters = {
  docs: {
    source: {
      code: `
<uui-keyboard-shortcut>
  <uui-key>ALT</uui-key>
  +
  <uui-key>shift</uui-key>
  +
  <uui-key>&#8593;</uui-key>
  +
  <uui-key>z</uui-key>
</uui-keyboard-shortcut>`,
    },
  },
};
