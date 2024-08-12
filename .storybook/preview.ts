import type { Preview } from '@storybook/web-components';
import '../packages/uui-css/lib/uui-css.css';
import { html } from 'lit';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [story => html`<div class="uui-font; uui-text">${story()}</div>`],
};

export default preview;
