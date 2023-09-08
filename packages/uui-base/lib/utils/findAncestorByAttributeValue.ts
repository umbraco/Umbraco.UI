/**
 * Recursively find an ancestor element by attribute name and value. This also checks children of the ancestor.
 * @func findAncestorByAttributeValue
 * @param {HTMLElement} element - Origin element of the search.
 * @param {string} attributeName - Name of the attribute to search for.
 * @param {string} attributeValue - Value of the attribute to search for.
 */
export const findAncestorByAttributeValue = (
  element: HTMLElement,
  attributeName: string,
  attributeValue: string
) => {
  while (element !== null && element.parentElement !== null) {
    element = element.parentElement;

    const elementHasAttribute =
      element.hasAttribute(attributeName) &&
      element.getAttribute(attributeName) === attributeValue;
    const elementContainsAttribute =
      element.querySelector(`[${attributeName}="${attributeValue}"]`) !== null;
    if (elementHasAttribute) {
      return element;
    } else if (elementContainsAttribute) {
      return element.querySelector(
        `[${attributeName}="${attributeValue}"]`
      ) as HTMLElement;
    }
  }
  return null;
};
