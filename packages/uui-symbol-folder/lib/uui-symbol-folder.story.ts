import '.';

import { html } from 'lit';

export default {
  title: 'Symbols/Folder',
  component: 'uui-symbol-folder',
  id: 'uui-symbol-folder',
};

export const Overview = () => html` <uui-symbol-folder></uui-symbol-folder> `;

Overview.parameters = {
  docs: {
    source: {
      code: '<uui-symbol-folder></uui-symbol-folder>',
    },
  },
};
