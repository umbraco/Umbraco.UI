import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Pagination',
  component: 'uui-pagination',
};

export const Overview = () =>
  html` <uui-pagination .total=${100}></uui-pagination> `;
