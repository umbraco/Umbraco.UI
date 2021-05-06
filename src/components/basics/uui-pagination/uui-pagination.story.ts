import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Pagination',
  component: 'uui-pagination',
};

export const Overview = () =>
  html` <uui-pagination .count=${20} .range=${5}></uui-pagination> `;
