# Contributing to Umbraco UI

Please review this document to help to streamline the process and save everyone's precious time.

This repo uses nodejs, so you should install `nodejs` as the package manager. See [installation guide](https://nodejs.org/en/).


## Pull Requests (PRs)

We welcome all contributions. There are many ways you can help us. This is few of those ways:

Before you submit a new PR, make sure you run `npm run test`.

### Reviewing PRs

**As a PR submitter**, you should reference the issue if there is one, include a short description of what you contributed and, if it is a code change, instructions for how to manually test out the change.

> NOTE: Although the latest released version of Umbraco UI corresponds to the `main` branch, then development happens in the `v0/dev` branch. If you submit a PR, branch off `v0/dev` and target your PR to `v0/dev`.


## Development Guide


### Best practices for contributing to this library
- Properties should only use attr-reflection for styling - don’t map component-state to classes - use attr-reflection!
- New dependencies can only be added by HQ-team and only after scrutinizing debate (to keep size down)
- Components can’t assume Umbraco context
- Elements shouldn’t depend on TagNames - their own or children - instead use :host or this and use classes/id’s for selection
- Elements always use a shadow-root (shadowDOM - for encapsulation)
- Styles should have as simple rules as possible
- UI-events should be unique types that extend from our UUIEvent (see utils/) (for typing reasons)
- Elements are exported side-effect free (no registration) in the *.element.ts file, and with the registration in the index.ts file

### Before a new element can me merged
- Element name must be prefixed with “UUI-”.
- Element must have tests and pass them.
- Element must pass basic Accessibility tests.
- Element must have a storybook setup.
- Source-code must follow the ES-lint rules.


### Documentation

[To be written.]
