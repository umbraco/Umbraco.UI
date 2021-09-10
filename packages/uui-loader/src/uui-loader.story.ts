import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  title: 'Symbols/Loader',
  component: 'uui-loader',
};

export const Overview: Story = () => html` <uui-loader></uui-loader> `;
