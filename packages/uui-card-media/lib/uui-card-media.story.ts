import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  id: 'uui-card-media',
  title: 'Displays/Cards/Media',
  component: 'uui-card-media',
  parameters: {
    readme: {
      markdown: readme,
    },
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story: any) => html`<div style="width: 200px;">${Story()}</div>`,
  ],
};

export const AAAOverview: Story = props => html`
  <uui-card-media
    name=${props.name}
    file-ext=${props.fileExt}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    ?readonly=${props.readonly}
    href=${props.href}
    target=${props.target}
    rel=${props.rel}></uui-card-media>
`;
AAAOverview.storyName = 'Overview';

AAAOverview.args = {
  name: 'The card',
  fileExt: 'jpg',
  selectable: false,
  selected: false,
  error: false,
  disabled: false,
  readonly: false,
};

export const File: Story = props => html`
  <uui-card-media name="File name" .fileExt=${props.fileExt}></uui-card-media>
`;

File.args = {
  fileExt: 'txt',
};

File.parameters = {
  controls: { include: ['fileExt'] },
  docs: {
    source: {
      code: `
<uui-card-media name="File name" file-ext="txt"></uui-card-media>`,
    },
  },
};

export const Tag: Story = () => html`
  <uui-card-media name="File name">
    <uui-tag slot="tag" size="s" color="danger">Trashed</uui-tag>
    <img src="https://placedog.net/1447/?random" alt="" />
  </uui-card-media>
`;
Tag.parameters = {
  docs: {
    source: {
      code: `
<uui-card-media name="File name">
  <uui-tag slot="tag" size="s" color="danger">Trashed</uui-tag>
  <img src="https://placedog.net/1447/?random" alt="" />
</uui-card-media>`,
    },
  },
};

export const Actions: Story = () => html`
  <uui-card-media name="File name">
    <uui-action-bar slot="actions">
      <uui-button look="secondary" label="Remove">Remove</uui-button>
    </uui-action-bar>
    <img src="https://placedog.net/1447/?random" alt="" />
  </uui-card-media>
`;
Actions.parameters = {
  docs: {
    source: {
      code: `
<uui-card-media name="File name">
  <uui-action-bar slot="actions">
    <uui-button look="secondary" label="Remove">Remove</uui-button>
  </uui-action-bar>

  <img src="https://placedog.net/1447/?random" alt="" />
</uui-card-media>`,
    },
  },
};

export const Folder: Story = () => html`
  <uui-card-media name="Folder Name"></uui-card-media>
`;
Folder.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="Folder Name"></uui-card-media>`,
    },
  },
};

export const Image: Story = () => html`
  <uui-card-media name="File name">
    <img src="https://placedog.net/1447/?random" alt="" />
  </uui-card-media>
`;

Image.parameters = {
  docs: {
    source: {
      code: `
<uui-card-media name="File name">
  <img src="https://placedog.net/1447/?random" alt="" />
</uui-card-media>`,
    },
  },
};

export const Error: Story = props => html`
  <uui-card-media name="File name" ?error=${props.error}
    ><img src="https://placedog.net/1447/?random" alt=""
  /></uui-card-media>
`;

Error.args = {
  error: true,
};

Error.parameters = {
  controls: { include: ['error'] },
  docs: {
    source: {
      code: `
<uui-card-media name="File name" error>
  <img src="https://placedog.net/1447/?random" alt="" />
</uui-card-media>`,
    },
  },
};

export const Selectable: Story = props => html`
  <uui-card-media name="File name" ?selectable=${props.selectable}
    ><img src="https://placedog.net/1447/?random" alt=""
  /></uui-card-media>
`;
Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  controls: { include: ['selectable'] },
  docs: {
    source: {
      code: `
<uui-card-media name="File name" selectable>
  <img src="https://placedog.net/1447/?random" alt="" />
</uui-card-media>`,
    },
  },
};

export const Disabled: Story = props => html`
  <uui-card-media name="File name" ?disabled=${props.disabled}
    ><img src="https://placedog.net/1447/?random" alt=""
  /></uui-card-media>
`;

Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  controls: { include: ['disabled'] },
  docs: {
    source: {
      code: `
<uui-card-media name="File name" disabled>
  <img src="https://placedog.net/1447/?random" alt="" />
</uui-card-media>
`,
    },
  },
};

export const Readonly: Story = props => html`
  <uui-card-media name="File name" ?readonly=${props.readonly}
    ><img src="https://placedog.net/1447/?random" alt=""
  /></uui-card-media>
`;

Readonly.args = {
  readonly: true,
};

Readonly.parameters = {
  controls: { include: ['readonly'] },
  docs: {
    source: {
      code: `
<uui-card-media name="File name" readonly>
  <img src="https://placedog.net/1447/?random" alt="" />
</uui-card-media>
`,
    },
  },
};
