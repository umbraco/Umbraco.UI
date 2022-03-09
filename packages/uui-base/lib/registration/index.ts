/**
 * Defensive definition of a custom element. It only defines the element if it has a valid name and isn't already defined.
 * @func defineElement
 * @param {string} name - Name for the new custom element. Note that custom element names must contain a hyphen.
 * @param {string} constructor - Constructor for the new custom element.
 * @param {string} [options] - Object that controls how the element is defined.
 */
export function defineElement(
  name: string,
  options?: ElementDefinitionOptions | undefined
) {
  return (constructor: CustomElementConstructor) => {
    const isValidElementName = name.indexOf('-') > 0;

    if (isValidElementName === false) {
      console.error(
        `${name} is not a valid custom element name. A custom element name should consist of at least two words separated by a hyphen.`
      );
      return;
    }

    const existingElement = window.customElements.get(name);

    if (existingElement) {
      console.warn(`${name} is already defined`, existingElement); // TODO: Remove this in production
    } else {
      window.customElements.define(name, constructor, options);
    }
  };
}
