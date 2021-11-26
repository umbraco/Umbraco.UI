import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  id: 'uui-ref',
  title: 'Displays/Refs/Base',
  component: 'uui-ref',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref></uui-ref>`,
      },
    },
  },
};

export const Overview: Story = () =>
  html`
    <p>
      Ref is a Component that provides the basics for a Ref components. This can
      be extended in code to match a certain need.
    </p>
  `;
