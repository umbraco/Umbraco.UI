import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-card',
  title: 'Displays/Cards/Card',
  component: 'uui-card',
};

const Template: Story = () => html`
  <p>
    Card is a Component that provides the basics for a Card component. This can
    be extended in code to match a certain need.
  </p>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
import { UUICardElement } from '@umbraco-ui/uui-card/lib/uui-card.element;

class MyCardElement extends UUICardElement {}
    `,
    },
  },
};
