import {
  setCustomElementsManifest,
  type Preview,
} from '@storybook/web-components';
import '../packages/uui-css/lib/uui-css.css';
import customElements from '../custom-elements.json';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  tags: ['autodocs'],
};

WebComponentFormatter(customElements);
setCustomElementsManifest(customElements);

function WebComponentFormatter(customElements) {
  (customElements.modules ?? [])
    .flatMap(module => module.declarations ?? [])
    .forEach(declaration => {
      declaration.attributes = [];
      declaration.members = declaration.members?.filter(
        member => member.privacy !== 'private' && !member.name.startsWith('_'),
      );
    });
}

export default preview;
