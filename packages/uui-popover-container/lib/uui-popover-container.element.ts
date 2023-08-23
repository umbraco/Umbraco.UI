import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 * @element uui-popover-container
 */
@defineElement('uui-popover-container')
export class UUIPopoverContainerElement extends LitElement {
  #target: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('beforetoggle', this.#beforeToggle);
    document.addEventListener('scroll', this.#updatePosition);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('beforetoggle', this.#beforeToggle);
    document.removeEventListener('scroll', this.#updatePosition);
  }

  #beforeToggle = (event: any) => {
    if (event.newState !== 'open') return;

    this.id;
    this.#target = this.#findAncestorWithAttribute(
      this,
      'popovertarget',
      this.id
    );
    this.#updatePosition();
  };

  #updatePosition = () => {
    if (this.#target === null) return;

    const targetRect = this.#target.getBoundingClientRect();
    // const popoverRect = this.getBoundingClientRect();

    const top = targetRect.top + targetRect.height;
    const left = targetRect.left;

    this.style.transform = `translate(${left}px, ${top}px)`;
  };

  #findAncestorWithAttribute(
    element: HTMLElement,
    attributeName: string,
    attributeValue: string
  ) {
    while (element !== null && element.parentElement !== null) {
      element = element.parentElement;

      const elementHasAttribute =
        element.hasAttribute(attributeName) &&
        element.getAttribute(attributeName) === attributeValue;
      const elementContainsAttribute =
        element.querySelector(`[${attributeName}="${attributeValue}"]`) !==
        null;
      if (elementHasAttribute) {
        return element;
      } else if (elementContainsAttribute) {
        return element.querySelector(
          `[${attributeName}="${attributeValue}"]`
        ) as HTMLElement;
      }
    }
    return null;
  }

  render() {
    return html` Markup goes here `;
  }

  static styles = [
    css`
      :host {
        margin: 0;
        border: 1px solid var(--uui-color-border);
        border-radius: var(--uui-border-radius);
        padding: var(--uui-size-space-2);
        background-color: var(--uui-color-surface);
        box-shadow: var(--uui-shadow-depth-3);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-popover-container': UUIPopoverContainerElement;
  }
}
