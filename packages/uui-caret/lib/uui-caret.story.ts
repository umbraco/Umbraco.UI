import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-caret/lib/index';

export default {
  id: 'uui-caret',
  title: 'Symbols/Caret',
  component: 'uui-caret',
  parameters: {
    docs: {
      source: {
        code: `<uui-caret></uui-caret>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html` <uui-caret
    @click=${(e: MouseEvent) => {
      console.log('Click');
      (e.target as any).open = !(e.target as any).open;
    }}></uui-caret>`;
