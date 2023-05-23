import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  id: 'uui-pagination',
  title: 'Buttons/Pagination',
  component: 'uui-pagination',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-pagination total="100"></uui-pagination>`,
      },
    },
  },
};

// export const AAAOverview: Story = props =>
//   html`
//     <uui-pagination
// .total=${props.total}
// .current=${props.current}></uui-pagination>
//   `;

export const AAAOverview: Story = props => html`
  <h4>
    Resize the container to see how the number of pagination buttons changes.
  </h4>
  <div style="resize: horizontal; overflow: hidden; padding: 6px;">
    <uui-pagination
      .total=${props.total}
      .current=${props.current}></uui-pagination>
  </div>
`;
AAAOverview.storyName = 'Overview';
AAAOverview.args = { total: 100, current: 1 };
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-pagination total=100></uui-pagination>`,
    },
  },
};
