import { html } from 'lit-html';
import '@umbraco-ui/uui-folder-symbol/lib/index';
export default {
  title: 'Symbols/Folder Symbol',
  component: 'uui-folder-symbol',
};

export const Overview = () => html` <uui-folder-symbol></uui-folder-symbol> `;

Overview.parameters = {
  docs: {
    source: {
      code: '<uui-folder-symbol></uui-folder-symbol>',
    },
  },
};
