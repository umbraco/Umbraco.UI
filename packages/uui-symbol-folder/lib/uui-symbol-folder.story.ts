import '.';

import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Symbols/Folder',
  component: 'uui-symbol-folder',
  id: 'uui-symbol-folder',
  parameters: {
    readme: { markdown: readme },
  },
};

export const Overview = () => html` <uui-symbol-folder></uui-symbol-folder> `;

Overview.parameters = {
  docs: {
    source: {
      code: '<uui-symbol-folder></uui-symbol-folder>',
    },
  },
};
