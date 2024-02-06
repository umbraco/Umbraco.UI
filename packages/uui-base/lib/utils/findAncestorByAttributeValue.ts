/**
 * Recursively find an ancestor element by attribute name and value. This also checks children of the ancestor.
 * @func findAncestorByAttributeValue
 * @param {HTMLElement} startNode - Origin node of the search.
 * @param {string} attributeName - Name of the attribute to search for.
 * @param {string} attributeValue - Value of the attribute to search for.
 */
export const findAncestorByAttributeValue = (
  startNode: HTMLElement | ParentNode,
  attributeName: string,
  attributeValue: string,
): HTMLElement | null => {
  let currentNode: typeof startNode | null = startNode;

  while (currentNode !== null) {
    // Check if the current element has the specified attribute
    const elementHasAttribute =
      currentNode instanceof HTMLElement &&
      currentNode.hasAttribute(attributeName) &&
      currentNode.getAttribute(attributeName) === attributeValue;

    // Check if the current element contains an element with the specified attribute
    const elementContainsAttribute =
      currentNode.querySelector(`[${attributeName}="${attributeValue}"]`) !==
      null;

    if (elementHasAttribute) {
      return currentNode as HTMLElement; // Found a matching ancestor
    } else if (elementContainsAttribute) {
      return currentNode.querySelector(
        `[${attributeName}="${attributeValue}"]`,
      ) as HTMLElement; // Found a matching ancestor
    }

    // Move up the DOM tree to the parent or parentNode, whichever is available
    currentNode =
      currentNode.parentElement ||
      currentNode.parentNode ||
      (currentNode as ShadowRoot).host ||
      null;
  }

  return null; // No matching ancestor found
};
