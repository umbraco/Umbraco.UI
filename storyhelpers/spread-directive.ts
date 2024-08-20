/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { Args, ArgTypes } from '@storybook/web-components';
import { directive, Directive } from 'lit/directive.js';

class UUIStoryBookSpreadDirective extends Directive {
  // TODO: We don't need the render method, but it's required by the Directive class
  render(
    props: object,
    cssProps: Partial<ArgTypes<Args>> = {},
    excludeProps: string[] = [],
  ): unknown {
    return this.render(props);
  }
  update(
    part: any,
    [props, cssProps = {}, excludeProps = []]: [
      any,
      Partial<ArgTypes<Args>>,
      string[],
    ],
  ): void {
    // Remove Storybooks onClick event from props
    delete props.onClick;

    const excludeSet = new Set(excludeProps);
    const cssPropSet = new Set(Object.keys(cssProps));

    // Apply each property from props to the element
    Object.keys(props).forEach(key => {
      if (excludeSet.has(key)) return;

      // Check if the property is a CSS property
      if (cssPropSet.has(key)) {
        (part.element as HTMLElement).style.setProperty(key, props[key]);
        return;
      }

      part.element[key] = props[key];
      (part.element as HTMLElement).setAttribute(key, props[key]);
    });
  }
}

// Export the directive so it can be used in the template
export const spread = directive(UUIStoryBookSpreadDirective);
