# Umbraco.UI

This is a WIP UI-library for Umbraco CMS and friends. This means that all elements should make sense in any context. 

The elements are built with LitElement and is meant to be displayed with storybook. You can build the library as a single bundle (with dependencies), or you can just import source directly and build yourself. 

The storybook knobs and docs are automatically created from the source, so please make sure to add the appropriate jsdoc-comments. See an existing element (eg. uui-button) for inpiration, or checkout [web-component-analyzer](https://github.com/runem/web-component-analyzer) for docs.

Once the project is "ready", it shall be released on npm for consumption. 

## Best practices for contributing to this library
- Properties should only use attr-reflection for styling - don’t map component-state to classes - use attr-reflection!
- New dependencies can only be added by HQ-team and only after scrutinizing debate (to keep size down)
- Components can’t assume Umbraco context
- Elements shouldn’t depend on TagNames - their own or children - instead use :host or this and use classes/id’s for selection
- Elements always use a shadow-root (shadowDOM - for encapsulation)
- Styles should have as simple rules as possible
- UI-events should be unique types that extend from our UUIEvent (see utils/) (for typing reasons)
- Elements are exported side-effect free (no registration) in the *.element.ts file, and with the registration in the index.ts file

## Before new elements can me merged
- Elements must have tests and pass them
- Elements must pass basic a11y test
- Elements must have a storybook setup
- Source-code must follow the eslint rules

## Scripts
- `storybook` opens storybook for the elements
- `test` runs your test suite with Web Test Runner
' `format` runs autoformatter
- `lint` runs the linter for your project