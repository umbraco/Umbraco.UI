import { html } from 'lit-html';
import './index';

export default {
  title: 'Buttons/Pagination',
  component: 'uui-pagination',
};

export const Overview = () =>
  html` <uui-pagination .total=${100}></uui-pagination> `;

export const TwoPages = () =>
  html` <uui-pagination .total=${2}></uui-pagination> `;

export const OnePage = () => html` <uui-pagination></uui-pagination> `;
