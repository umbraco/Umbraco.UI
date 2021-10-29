/**
 * Defensive definition of a custom element. It only defines the element if it has a valid name and isn't already defined.
 * @func defineElement
 * @param {string} name - Name for the new custom element. Note that custom element names must contain a hyphen.
 * @param {string} constructor - Constructor for the new custom element.
 * @param {string} [options] - Object that controls how the element is defined.
 */
export const defineElement = (
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions | undefined
) => {
  const isValidElementName = name.indexOf('-') > -1;

  if (isValidElementName === false) {
    console.error(
      `${name} is not a valid custom element name. A custom element name must contain a hyphen.`
    );
    return;
  }

  if (customElements.get(name)) {
    console.error(`${name} is already defined`);
  } else {
    customElements.define(name, constructor, options);
  }
};
