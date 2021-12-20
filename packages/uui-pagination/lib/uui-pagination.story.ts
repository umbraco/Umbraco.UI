import { html } from 'lit-html';
import { Story } from '@storybook/web-components';

import '@umbraco-ui/uui-pagination/lib/index';

export default {
  id: 'uui-pagination',
  title: 'Buttons/Pagination',
  component: 'uui-pagination',
  parameters: {
    docs: {
      source: {
        code: `<uui-pagination total="100"></uui-pagination>`,
      },
    },
  },
};

export const AAAOverview: Story = () =>
  html` <uui-pagination .total=${100}></uui-pagination> `;
AAAOverview.storyName = 'Overview';

export const Resize: Story = () => html`
  <h4>
    Resize the orange container to see how the number of pagination buttons
    changes.
  </h4>
  <div
    style="resize: horizontal; overflow: hidden; padding: 2em; border: 1px solid orange">
    <uui-pagination total=${30}></uui-pagination>
  </div>
`;
