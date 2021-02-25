import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Button Group',
  component: 'uui-button-group',
};

const buttons = ['development', 'staging', 'live'];

export const Overview = () =>
  html`<uui-button-group
    >${buttons.map(
      el => html`<uui-button look="secondary">${el}</uui-button>`
    )}<uui-button look="danger">Hello</uui-button></uui-button-group
  >`;

export const Outline = () =>
  html`<uui-button-group
    >${buttons.map(
      el => html`<uui-button look="outline">${el}</uui-button>`
    )}<uui-button look="danger">Hello</uui-button></uui-button-group
  >`;

export const Look = () =>
  html`<uui-button-group
    >${buttons.map(el => html`<uui-button>${el}</uui-button>`)}<uui-button
      look="danger"
      >Hello</uui-button
    ></uui-button-group
  >`;
