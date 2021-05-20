import { html } from 'lit-html';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '../../type/InterfaceLook';
import './index';

export default {
  title: 'Symbols/Loader Circle',
  component: 'uui-loader-circle',
};

export const Overview = () => html` <uui-loader-circle></uui-loader-circle> `;

export const Sizes = () =>
  html`
    <uui-loader-circle size="s"></uui-loader-circle>
    <uui-loader-circle size="m"></uui-loader-circle>
    <uui-loader-circle size="l"></uui-loader-circle>
    <uui-loader-circle size="xl"></uui-loader-circle>
  `;
