import {
  addDecorator,
  addParameters,
  setCustomElements,
  withA11y,
  withKnobs,
  withWebComponentsKnobs,
} from '@open-wc/demoing-storybook';

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withWebComponentsKnobs);

addParameters({
  docs: {
    iframeHeight: '200px',
  },
});

async function run() {
  const customElements = await (
    await fetch(new URL('../custom-elements.json', import.meta.url))
  ).json();
  setCustomElements(customElements);
}

run();
