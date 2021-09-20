import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  title: 'Symbols/Loader Bar',
  component: 'uui-loader-bar',
};

const colors = [
  '#F79C37',
  '#FAD634',
  '#F5C1BC',
  '#162335',
  '#1B264F',
  '#3544B1',
  '#2152A3',
  '#3879FF',
  '#D42054',
  '#25aa60',
  '#191715',
  '#2E2B29',
  '#332A24',
  '#9D8057',
  '#E2DAD4',
  '#d8d7d9',
  '#f3f3f5',
  '#FEFEFE',
  '#060606',
  '#C4C4C4',
  '#9B9B9B',
  '#3E3E3E',
];

export const Default: Story = () => html` <uui-loader-bar></uui-loader-bar> `;

export const WithColor: Story = () =>
  html`${colors.map(
    color =>
      html`<uui-loader-bar
        style=${`color: ${color}; margin-bottom: 40px`}></uui-loader-bar>`
  )}`;
