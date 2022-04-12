import '.';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-icon/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-file-preview',
  title: 'Displays/File Preview',
  component: 'uui-file-preview',
};

const Template: Story = props => html`
  <uui-icon-registry-essential>
    <uui-file-preview
      name=${props.name}
      extension=${props.extension}
      size=${props.size}
      ?isDirectory=${props.isDirectory}
      src=${props.src}
      url="${props.url}">
      <uui-action-bar slot="actions">
        <uui-button look="">
          <uui-icon name="copy"></uui-icon>
        </uui-button>
        <uui-button look="danger">
          <uui-icon name="delete"></uui-icon>
        </uui-button>
      </uui-action-bar>
    </uui-file-preview>
  </uui-icon-registry-essential>
`;

export const AAAOverview = Template.bind({});

AAAOverview.storyName = 'Overview';

AAAOverview.args = {
  name: 'ThisFileHasAVeryAndIMeanVeryLongName',
  extension: 'jpg',
  size: '12376',
  src: 'https://i.picsum.photos/id/323/300/200.jpg?hmac=BJ1RcgeAgjXdKzYxBF0RBcRyuwapnAUk9K9c465dOKE',
  url: 'https://i.picsum.photos/id/323/300/200.jpg?hmac=BJ1RcgeAgjXdKzYxBF0RBcRyuwapnAUk9K9c465dOKE',
};

export const NoImage = Template.bind({});

NoImage.args = {
  name: 'ThisFileHasAVeryAndIMeanVeryLongName',
  extension: 'pdf',
  size: '12376',
};

export const Directory = Template.bind({});

Directory.args = {
  name: 'My Folder',
  isDirectory: true,
};
