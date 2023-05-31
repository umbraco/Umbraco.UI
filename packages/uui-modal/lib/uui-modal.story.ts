import '@umbraco-ui/uui-dialog-layout/lib';
import '.';

import { StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import './modal-example.element';
import readme from '../README.md?raw';

export default {
  id: 'uui-modal',
  title: 'Layout/Modals',
  component: 'uui-modal',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-modal></uui-modal>`,
      },
    },
  },
};

export const Overview: StoryFn = () => {
  return html`<modal-example></modal-example>`;
};
