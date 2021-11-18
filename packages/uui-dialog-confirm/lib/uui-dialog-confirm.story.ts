import { html } from 'lit-html';
import '@umbraco-ui/uui-dialog-confirm/lib/index';
import { UUIEvent } from 'packages/uui-base/lib/events/UUIEvent';

export default {
  id: 'uui-dialog-confirm',
  title: 'Displays/Dialog Confirm',
  component: 'uui-dialog-confirm',
  parameters: {
    docs: {
      source: {
        code: `<uui-dialog-confirm></uui-dialog-confirm>`,
      },
    },
  },
};

export const Danger = () => html`
  <uui-dialog-confirm
    title="Are you sure about this?"
    look="danger"
    @cancel=${(e: UUIEvent) => console.log('Cancelled', e)}
    @submit=${(e: UUIEvent) => console.log('Submitted', e)}
    submitLabel="Delete">
    Description of this very dangerous dialog
  </uui-dialog-confirm>
`;

export const Positive = () => html`
  <uui-dialog-confirm
    title="Would you like to make it happen?"
    look="positive"
    @cancel=${(e: UUIEvent) => console.log('Cancelled', e)}
    @submit=${(e: UUIEvent) => console.log('Submitted', e)}>
    Description of this very positive dialog
  </uui-dialog-confirm>
`;
