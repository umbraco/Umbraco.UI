
import { setCustomElements } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import '../src/style/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  argTypes: {
    styles: {
      table: {
        disable: true,
      },
    },
  },
}

setCustomElements(customElements);