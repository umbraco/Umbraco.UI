import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  id: 'uui-ref',
  title: 'Displays/References/Ref',
  component: 'uui-ref',
};

const Template: Story = () => html`
  <p>
    Ref is a Component that provides the basics for a Ref component. This can be
    extended in code to match a certain need.
  </p>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
import { UUIRefElement } from '@umbraco-ui/uui-ref/lib/uui-ref.element;

class MyRefElement extends UUIRefElement {}
    `,
      language: 'js',
    },
  },
};
