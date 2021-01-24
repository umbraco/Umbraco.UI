import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Card',
  component: 'uui-card',
};

export const Overview = () =>
  html` <uui-card title="I am the card title">
    <h2 slot="subtitle">Will this be white? Yes</h2>
    <h3 slot="subtitle">Will this be white? NO</h3>
    <p>I am in deafault slot</p>

    <uui-button slot="actions" class="red">Action 1</uui-button>
    <uui-button slot="actions">Action 2</uui-button>

    <p>I fall to deafault slot even if i'm after buttons in the makrup</p>
  </uui-card>`;
