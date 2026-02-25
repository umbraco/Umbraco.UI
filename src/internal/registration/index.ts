/**
 * Defensive definition of a custom element. It only defines the element if it has a valid name and isn't already defined.
 *
 * Supports both decorator and direct call syntax:
 * - Decorator: `@defineElement('uui-button')`
 * - Direct call: `defineElement('uui-button', UUIButtonElement)`
 */

// Overload: decorator usage — returns a class decorator
export function defineElement(
  name: string,
  options?: ElementDefinitionOptions,
): (constructor: CustomElementConstructor) => void;

// Overload: direct call — registers immediately, returns void
export function defineElement(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions,
): void;

// Implementation
export function defineElement(
  name: string,
  constructorOrOptions?:
    | CustomElementConstructor
    | ElementDefinitionOptions
    | undefined,
  options?: ElementDefinitionOptions | undefined,
): void | ((constructor: CustomElementConstructor) => void) {
  if (typeof constructorOrOptions === 'function') {
    register(name, constructorOrOptions, options);
    return;
  }
  return (constructor: CustomElementConstructor) => {
    register(name, constructor, constructorOrOptions);
  };
}

function register(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions,
) {
  if (name.indexOf('-') <= 0) {
    console.error(
      `${name} is not a valid custom element name. A custom element name should consist of at least two words separated by a hyphen.`,
    );
    return;
  }

  if (!window.customElements.get(name)) {
    window.customElements.define(name, constructor, options);
  }
}
