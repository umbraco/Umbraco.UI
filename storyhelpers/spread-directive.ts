/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { Args, ArgTypes } from '@storybook/web-components';
import { directive, Directive } from 'lit/directive.js';

/**
 * A directive that spreads the properties of an object onto an element while filtering out certain properties such as events and slots.
 */
class UUIStoryBookSpreadDirective extends Directive {
  // TODO: We don't need the render method, but it's required by the Directive class
  render(props: object, excludeProps: string[] = []): unknown {
    return this.render(props);
  }
  update(part: any, [props, excludeProps = []]: [any, string[]]): void {
    // Remove Storybooks onClick event from props
    // delete props.onClick; // Not needed with the old component analyzer

    const excludeSet = new Set(excludeProps);

    // Apply each property from props to the element
    Object.keys(props).forEach(key => {
      if (excludeSet.has(key)) return;

      // Remove all events from props
      if (typeof props[key] === 'function') return;

      // Remove all slots from props
      if (key === 'slot' || key.endsWith(' slot')) {
        return;
      }

      // Check if the property is a CSS property (starts with --)
      if (key.startsWith('--')) {
        if (props[key] != null) {
          (part.element as HTMLElement).style.setProperty(key, props[key]);
        }
        return;
      }

      part.element[key] = props[key];

      // If the property is a boolean, toggle the attribute
      if (typeof props[key] === 'boolean') {
        if (props[key]) {
          (part.element as HTMLElement).setAttribute(key, '');
        } else {
          (part.element as HTMLElement).removeAttribute(key);
        }
        return;
      }

      (part.element as HTMLElement).setAttribute(key, props[key]);
    });
  }
}

/**
 * A directive that spreads the properties of an object onto an element while filtering out certain properties such as events and slots.
 */
export const spread = directive(UUIStoryBookSpreadDirective);
