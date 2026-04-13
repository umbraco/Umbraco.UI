import './button.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { page } from 'vitest/browser';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import { UUIInterfaceColorValues } from '../../internal/types/InterfaceColor.js';
import { UUIInterfaceLookValues } from '../../internal/types/InterfaceLook.js';
import { UUIButtonElement } from './button.element.js';

describe('UuiButton', () => {
  let formElement: HTMLFormElement;
  let inputElement: HTMLInputElement;
  let element: UUIButtonElement;

  beforeEach(() => {
    const screen = render(html`
      <form action="">
        <input type="text" name="test" value="" />
        <uui-button label="My label">Hello uui-button</uui-button>
      </form>
    `);

    formElement = screen.container.querySelector('form')!;
    inputElement = formElement.querySelector('input')!;
    element = formElement.querySelector('uui-button')!;
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(UUIButtonElement);
  });

  it('renders a button inside shadow DOM', async () => {
    await expect
      .element(page.elementLocator(element).getByRole('button'))
      .toBeInTheDocument();
  });

  it('passes the a11y audit', { timeout: 30000 }, async () => {
    for (const color of UUIInterfaceColorValues) {
      for (const look of UUIInterfaceLookValues) {
        for (const disabled of [true, false]) {
          const screen = render(
            html`<uui-button
              label="Continue"
              .disabled=${disabled}
              .look=${look}
              .color=${color}>
              Continue
            </uui-button>`,
          );
          const el = screen.container.querySelector('uui-button')!;
          expect(await axeRun(el)).toHaveNoViolations();
        }
      }
    }
  });

  describe('properties', () => {
    it('has a label property', () => {
      expect(element).toHaveProperty('label');
    });

    it('has a type property', () => {
      expect(element).toHaveProperty('type');
    });
    it('type property defaults to "button"', () => {
      expect(element.type).toBe('button');
    });

    it('has a disable property', () => {
      expect(element).toHaveProperty('disabled');
    });
    it('disable property defaults to false', () => {
      expect(element.disabled).toBe(false);
    });

    it('has a look property', () => {
      expect(element).toHaveProperty('look');
    });

    it('has a compact property', () => {
      expect(element).toHaveProperty('compact');
    });
    it('compact property defaults to false', () => {
      expect(element.compact).toBe(false);
    });

    it('has a state property', () => {
      expect(element).toHaveProperty('state');
    });

    it('has a href property', () => {
      expect(element).toHaveProperty('href');
    });

    it('has a target property', () => {
      expect(element).toHaveProperty('target');
    });

    it('has a rel property', () => {
      expect(element).toHaveProperty('rel');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).not.toBeNull();
    });
    it('renders a extra slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=extra]')!;
      expect(slot).not.toBeNull();
    });
    it('renders a button', () => {
      const btn = element.shadowRoot!.querySelector('button')!;
      expect(btn).not.toBeNull();
    });
    it('label property is used when no default slot is provided', async () => {
      const screen = render(html`<uui-button label="My label"></uui-button>`);
      await expect.element(screen.getByText('My label')).toBeInTheDocument();
    });
    it('default slot takes precedence over label property', async () => {
      element.label = 'My label';
      await element.updateComplete;
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot.assignedNodes().length).toBe(1);
      expect(slot.assignedNodes()[0].textContent).toBe('Hello uui-button');
    });
  });

  describe('events', () => {
    describe('click', () => {
      it('emits a click event when native button fires one', async () => {
        const button = element.shadowRoot!.querySelector('button')!;
        const listener = oneEvent(element, 'click');

        button.click();

        const event = await listener;
        expect(event).not.toBeNull();
        expect(event.type).toBe('click');
        expect(event.target).toBe(element);
      });
    });
  });

  describe('submit', () => {
    let wasSubmitted: boolean;

    beforeEach(() => {
      wasSubmitted = false;

      formElement.addEventListener('submit', event => {
        event.preventDefault();
        wasSubmitted = true;
      });
    });

    it('does not submit a form by default', () => {
      element.click();
      expect(wasSubmitted).toBe(false);
    });

    it('can submit a form when type is submit', async () => {
      element.setAttribute('type', 'submit');
      await element.updateComplete;
      await element.click();
      expect(wasSubmitted).toBe(true);
    });

    it('does not submit when disabled', () => {
      element.disabled = true;
      element.click();
      expect(wasSubmitted).toBe(false);
    });
  });

  describe('reset', () => {
    let wasReset: boolean;

    beforeEach(async () => {
      element.setAttribute('type', 'reset');
      await element.updateComplete;
      inputElement.value = 'Test value';

      wasReset = false;

      formElement.addEventListener('reset', () => {
        wasReset = true;
      });
    });

    it('can reset a form when type is reset', async () => {
      await element.click();
      expect(wasReset).toBe(true);

      const formData = new FormData(formElement);
      expect(formData.get('test')).toBe('');
    });

    it('does not reset when disabled', () => {
      element.disabled = true;

      element.click();
      expect(wasReset).toBe(false);

      const formData = new FormData(formElement);
      expect(formData.get('test')).toBe('Test value');
    });
  });

  describe('click', () => {
    let wasClicked: boolean;

    beforeEach(async () => {
      wasClicked = false;
      element.setAttribute('type', 'button');
      await element.updateComplete;

      element.addEventListener('click', () => {
        wasClicked = true;
      });
    });

    it('dispatches click event when type is button', async () => {
      await element.click();
      expect(wasClicked).toBe(true);
    });

    it('does not click when disabled', () => {
      element.disabled = true;
      element.click();
      expect(wasClicked).toBe(false);
    });
  });

  describe('HREF', () => {
    let anchorElement: HTMLElement;
    let element: UUIButtonElement;

    beforeEach(async () => {
      const screen = render(
        html`<uui-button
          label="menuitem"
          href="https://www.umbraco.com"></uui-button>`,
      );
      element = screen.container.querySelector('uui-button')!;
      await element.updateComplete;
      anchorElement = element.shadowRoot!.querySelector(
        '#button',
      ) as HTMLElement;
    });

    it('anchor element is defined', () => {
      expect(anchorElement).toBeInstanceOf(HTMLElement);
    });

    it('label is rendered as an anchor tag', async () => {
      await element.updateComplete;
      expect(anchorElement.nodeName).toBe('A');
    });

    it('target is applied to anchor tag', async () => {
      element.target = '_self';
      await element.updateComplete;
      expect(anchorElement.getAttribute('target')).toBe('_self');
    });

    it('when target is _blank and rel is not defined rel attribute is set.', async () => {
      element.target = '_blank';
      await element.updateComplete;
      expect(anchorElement.getAttribute('target')).toBe('_blank');
      expect(anchorElement.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('when rel is applied to anchor tag.', async () => {
      element.rel = 'noreferrer';
      await element.updateComplete;
      expect(anchorElement.getAttribute('rel')).toBe('noreferrer');
    });

    it('when target is _blank and rel is defined rel attribute is set.', async () => {
      element.target = '_blank';
      element.rel = 'noopener';
      await element.updateComplete;
      expect(anchorElement.getAttribute('target')).toBe('_blank');
      expect(anchorElement.getAttribute('rel')).toBe('noopener');
    });
  });
});
