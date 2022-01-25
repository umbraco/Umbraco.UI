import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-icon-registry/lib/index';
import '@umbraco-ui/uui-icon/lib/index';

export default {
  id: 'uui-icon-registry',
  title: 'Symbols/Icon Registry',
  component: 'uui-icon-registry',
};

const myCustomSVGData =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M460.5 78.244l-26.472-26.473c-16.867-16.868-44.216-16.865-61.083.003l-61.466 61.468-29.702-29.699-58.764 58.763 24.501 24.499L79.748 334.573C68.761 345.557 62.6 359.972 61.767 374.81l-9.766 9.764c-20.867 20.881-20.863 54.838.002 75.704 10.106 10.108 23.548 15.679 37.85 15.679 14.297 0 27.733-5.568 37.847-15.67l9.758-9.765c15.211-.821 29.394-7.139 40.248-17.99l167.771-167.767 24.493 24.495 58.765-58.764-29.698-29.699 61.465-61.466c16.87-16.869 16.87-44.218-.002-61.087zM150.574 405.398a23.298 23.298 0 01-16.532 6.846c-3.501 0-7.007-.782-10.231-2.343v.007l-23.242 23.236a15.092 15.092 0 01-10.716 4.439 15.1 15.1 0 01-10.715-4.439c-5.919-5.922-5.919-15.516-.002-21.436l23.233-23.238.008-.004c-4.226-8.725-2.741-19.518 4.503-26.761l167.769-167.768 43.695 43.693-167.77 167.768z"></path></svg>';

export const AAAOverview: Story = () => html`
  <uui-icon-registry .icons=${{ myCustomIcon: myCustomSVGData }}>
    <uui-icon name="myCustomIcon"></uui-icon>
  </uui-icon-registry>
`;
AAAOverview.storyName = 'Overview';

AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-icon-registry .icons=\${{'myCustomIcon': '<svg>...</svg>'}}>
  <uui-icon name="myCustomIcon"></uui-icon>
</uui-icon-registry>`,
    },
  },
};

export const CustomElement: Story = () =>
  html`
    <uui-icon-registry .icons=${{ myCustomIcon: myCustomSVGData }}>
      <uui-icon name="myCustomIcon"></uui-icon>
    </uui-icon-registry>
  `;
CustomElement.parameters = {
  docs: {
    source: {
      language: 'js',
      code: `
import { UUIIconRegistryElement } from '@umbraco-ui/uui-icon-registry/lib/uui-icon-registry.element';

const icon = '<svg>..<svg>';

class MyIconRegistryElement extends UUIIconRegistryElement {
  constructor () {
    super();
    this.registry.defineIcon('myCustomIcon', icon);
  }
}

customElements.define('my-icon-registry', MyIconRegistryElement);
      `,
    },
  },
};

export const ProvideDynamicCustomIconRegistry: Story = () =>
  html`
    Icon Registry Element is a element that provides a Icon Registry. The
    Element holds a empty icon registry pr. default. This registry can be access
    or replaced to provide icons of your interest. This example shows how to
    build a custom icon registry that provides an icon loaded externally: [see
    code]
  `;

ProvideDynamicCustomIconRegistry.parameters = {
  docs: {
    source: {
      code: `
class MyCustomIconRegistry extends UUIIconRegistry {
  protected acceptIcon(iconName: string): boolean {
    if(iconName === "myPrefix:myIcon") {
      const icon = this.provideIcon(iconName);
      // Load SVG and set it on this icon-object:
      icon.svg = "<svg>...</svg>";
      return true;
    }
  return false;
  }
}

class MyIconRegistryElement extends UUIIconRegistryElement {
  constructor () {
    super();
    this.registry = new MyCustomIconRegistry();
  }
}

customElements.define('my-icon-registry', MyIconRegistryElement);

<my-icon-registry>
  <uui-icon name="myPrefix:myIcon"></uui-icon>
</my-icon-registry>
      `,
    },
  },
};
