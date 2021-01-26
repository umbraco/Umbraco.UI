import { html, css } from 'lit-element';
import './index';

export default {
  title: 'Basics/Card Styling example',
  component: 'uui-card',
};

const styles = css`
  uui-button {
    --uui-button-ordinary-background-color: blue;
  }

  .red {
    --uui-button-ordinary-background-color: red;
  }

  uui-card {
    --uui-card-background-color: green;
  }

  .yellow-card {
    --uui-card-background-color: yellow;
    --uui-card-button-background-color: orange;
  }
`;

export const Overview = () =>
  html` Styling components from the implementation level

    <uui-card title="I am the card title">
      <h2 slot="subtitle">Will this be white? Yes</h2>
      <h3 slot="subtitle">Will this be white? NO</h3>
      <p>I am in deafault slot</p>
      <uui-button slot="actions" class="red">Action 1</uui-button>
      <uui-button slot="actions">Action 2</uui-button>
      <p>I fall to deafault slot even if i'm after buttons in the makrup</p>
    </uui-card>

    <uui-card title="I am the card title">
      <p>I am in deafault slot</p>
      <uui-button slot="actions" class="red">Action 1</uui-button>
      <uui-button slot="actions">Action 2</uui-button>
      <p>I fall to deafault slot even if i'm after buttons in the makrup</p>
    </uui-card>

    <uui-card class="yellow-card" title="I am the card title">
      <p>I am in deafault slot</p>
      <uui-button slot="actions">Action 1</uui-button>
      <uui-button slot="actions">Action 2</uui-button>
      <p>I fall to deafault slot even if i'm after buttons in the makrup</p>
    </uui-card>

    <style>
      ${styles}
    </style>`;
