
import { setCustomElements } from "@storybook/web-components";
import customElements from "../custom-elements.json";


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