
import { setCustomElements } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import '../src/style/index.css';

const sort = (a, b) => {

  if(a[1].name === "Overview"){
    return 0;
  }
  if(b[1].name === "Overview"){
    return 1;
  }
  return (a[0] > b[0]);
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    method: 'alphabetical',
    storySort: sort
  },
  // Hides the CSS: [] property on the docs page.
  argTypes: {
    styles: {
      table: {
        disable: true,
      },
    },
  },
}

setCustomElements(customElements);