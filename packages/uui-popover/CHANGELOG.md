# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.2.0-rc.0 (2023-02-07)

### Bug Fixes

- make popover work nicely in the button group ([#296](https://github.com/umbraco/Umbraco.UI/issues/296)) ([a5b3635](https://github.com/umbraco/Umbraco.UI/commit/a5b36351694ae84e707611c6826e239442913b17))
- remove double definitions of several test files ([15d303a](https://github.com/umbraco/Umbraco.UI/commit/15d303a173981d16a78a879f959dfae045f494ce))

- Release/0.1.1 (#190) ([d91d346](https://github.com/umbraco/Umbraco.UI/commit/d91d346a0659f52de2a3c4746065c554f95e6328)), closes [#190](https://github.com/umbraco/Umbraco.UI/issues/190) [#188](https://github.com/umbraco/Umbraco.UI/issues/188) [#187](https://github.com/umbraco/Umbraco.UI/issues/187) [#189](https://github.com/umbraco/Umbraco.UI/issues/189)

### Features

- added uui-combobox elements ([205ceee](https://github.com/umbraco/Umbraco.UI/commit/205ceeed5e08f644b9ebdc736b94943c45702689))
- **build:** update packages to esmodules and fix rollup import ([0980022](https://github.com/umbraco/Umbraco.UI/commit/0980022acd9fedc79b017f417d4c56d247d129e3))
- new uui-color-\* components (color picker) ([#413](https://github.com/umbraco/Umbraco.UI/issues/413)) ([655ee88](https://github.com/umbraco/Umbraco.UI/commit/655ee88e538f7dfa4c47c7a23bb2bb9a9a2671fd))

### BREAKING CHANGES

- This should now be configured globally

- internal: add more files to lerna ignore

- Publish

* @umbraco-ui/uui-action-bar@0.1.1
* @umbraco-ui/uui-avatar-group@0.1.1
* @umbraco-ui/uui-avatar@0.1.1
* @umbraco-ui/uui-badge@0.1.1
* @umbraco-ui/uui-base@0.1.1
* @umbraco-ui/uui-boolean-input@0.1.1
* @umbraco-ui/uui-box@0.2.0
* @umbraco-ui/uui-breadcrumbs@0.1.1
* @umbraco-ui/uui-button-group@0.1.1
* @umbraco-ui/uui-button-inline-create@0.1.1
* @umbraco-ui/uui-button@0.2.1
* @umbraco-ui/uui-card-content-node@0.1.1
* @umbraco-ui/uui-card-media@0.1.1
* @umbraco-ui/uui-card-user@0.1.1
* @umbraco-ui/uui-card@0.1.1
* @umbraco-ui/uui-caret@0.1.1
* @umbraco-ui/uui-checkbox@0.1.1
* @umbraco-ui/uui-css@0.1.1
* @umbraco-ui/uui-dialog-layout@0.1.1
* @umbraco-ui/uui-dialog@0.1.1
* @umbraco-ui/uui-form-layout-item@0.1.1
* @umbraco-ui/uui-form-validation-message@0.1.1
* @umbraco-ui/uui-form@0.1.1
* @umbraco-ui/uui-icon-registry-essential@0.1.1
* @umbraco-ui/uui-icon-registry@0.1.1
* @umbraco-ui/uui-icon@0.1.1
* @umbraco-ui/uui-input-lock@0.1.1
* @umbraco-ui/uui-input-password@0.1.1
* @umbraco-ui/uui-input@0.1.1
* @umbraco-ui/uui-keyboard-shortcut@0.1.1
* @umbraco-ui/uui-label@0.1.1
* @umbraco-ui/uui-loader-bar@0.1.1
* @umbraco-ui/uui-loader-circle@0.1.1
* @umbraco-ui/uui-loader@0.1.1
* @umbraco-ui/uui-menu-item@0.1.1
* @umbraco-ui/uui-pagination@0.1.1
* @umbraco-ui/uui-popover@0.1.1
* @umbraco-ui/uui-progress-bar@0.1.1
* @umbraco-ui/uui-radio@0.1.1
* @umbraco-ui/uui-ref-list@0.1.1
* @umbraco-ui/uui-ref-node-data-type@0.1.1
* @umbraco-ui/uui-ref-node-document-type@0.1.1
* @umbraco-ui/uui-ref-node-form@0.1.1
* @umbraco-ui/uui-ref-node-member@0.1.1
* @umbraco-ui/uui-ref-node-package@0.1.1
* @umbraco-ui/uui-ref-node-user@0.1.1
* @umbraco-ui/uui-ref-node@0.1.1
* @umbraco-ui/uui-ref@0.1.1
* @umbraco-ui/uui-scroll-container@0.1.1
* @umbraco-ui/uui-select@0.1.1
* @umbraco-ui/uui-slider@0.1.1
* @umbraco-ui/uui-symbol-expand@0.1.1
* @umbraco-ui/uui-symbol-file@0.1.1
* @umbraco-ui/uui-symbol-folder@0.1.1
* @umbraco-ui/uui-symbol-lock@0.1.1
* @umbraco-ui/uui-symbol-more@0.1.1
* @umbraco-ui/uui-symbol-sort@0.1.1
* @umbraco-ui/uui-table@0.1.1
* @umbraco-ui/uui-tabs@0.1.1
* @umbraco-ui/uui-tag@0.1.1
* @umbraco-ui/uui-textarea@0.1.1
* @umbraco-ui/uui-toast-notification-container@0.1.1
* @umbraco-ui/uui-toast-notification-layout@0.1.1
* @umbraco-ui/uui-toast-notification@0.1.1
* @umbraco-ui/uui-toggle@0.1.1
* @umbraco-ui/uui@0.1.1

- update references

- internal: use npm ci to counter Github Actions oddness

- internal: try with unsafe-perm to counter differentiating OS'es

- internal: downgrade Turbo to 1.1.5 to supposedly work with Github Actions

Co-authored-by: Niels Lyngsø <niels.lyngso@gmail.com>

# [1.1.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@1.0.0...@umbraco-ui/uui-popover@1.1.0) (2023-01-11)

### Features

- **build:** update packages to esmodules and fix rollup import ([0980022](https://github.com/umbraco/Umbraco.UI/commit/0980022acd9fedc79b017f417d4c56d247d129e3))

# [1.0.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@1.0.0-rc.3...@umbraco-ui/uui-popover@1.0.0) (2022-08-22)

**Note:** Version bump only for package @umbraco-ui/uui-popover

# [1.0.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@1.0.0-rc.2...@umbraco-ui/uui-popover@1.0.0-rc.3) (2022-08-15)

### Bug Fixes

- make popover work nicely in the button group ([#296](https://github.com/umbraco/Umbraco.UI/issues/296)) ([a5b3635](https://github.com/umbraco/Umbraco.UI/commit/a5b36351694ae84e707611c6826e239442913b17))

# [1.0.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@1.0.0-rc.1...@umbraco-ui/uui-popover@1.0.0-rc.2) (2022-08-10)

**Note:** Version bump only for package @umbraco-ui/uui-popover

# [1.0.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@1.0.0-rc.0...@umbraco-ui/uui-popover@1.0.0-rc.1) (2022-06-28)

**Note:** Version bump only for package @umbraco-ui/uui-popover

# [1.0.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@0.2.1...@umbraco-ui/uui-popover@1.0.0-rc.0) (2022-06-02)

**Note:** Version bump only for package @umbraco-ui/uui-popover

# [1.0.0-alpha.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@0.2.1...@umbraco-ui/uui-popover@1.0.0-alpha.0) (2022-06-01)

**Note:** Version bump only for package @umbraco-ui/uui-popover

## [0.2.1](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@0.2.0...@umbraco-ui/uui-popover@0.2.1) (2022-05-31)

**Note:** Version bump only for package @umbraco-ui/uui-popover

# [0.2.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@0.1.0...@umbraco-ui/uui-popover@0.2.0) (2022-05-04)

- Release/0.1.1 (#190) ([d91d346](https://github.com/umbraco/Umbraco.UI/commit/d91d346a0659f52de2a3c4746065c554f95e6328)), closes [#190](https://github.com/umbraco/Umbraco.UI/issues/190) [#188](https://github.com/umbraco/Umbraco.UI/issues/188) [#187](https://github.com/umbraco/Umbraco.UI/issues/187) [#189](https://github.com/umbraco/Umbraco.UI/issues/189)

### Features

- added uui-combobox elements ([205ceee](https://github.com/umbraco/Umbraco.UI/commit/205ceeed5e08f644b9ebdc736b94943c45702689))

### BREAKING CHANGES

- This should now be configured globally

- internal: add more files to lerna ignore

- Publish

* @umbraco-ui/uui-action-bar@0.1.1
* @umbraco-ui/uui-avatar-group@0.1.1
* @umbraco-ui/uui-avatar@0.1.1
* @umbraco-ui/uui-badge@0.1.1
* @umbraco-ui/uui-base@0.1.1
* @umbraco-ui/uui-boolean-input@0.1.1
* @umbraco-ui/uui-box@0.2.0
* @umbraco-ui/uui-breadcrumbs@0.1.1
* @umbraco-ui/uui-button-group@0.1.1
* @umbraco-ui/uui-button-inline-create@0.1.1
* @umbraco-ui/uui-button@0.2.1
* @umbraco-ui/uui-card-content-node@0.1.1
* @umbraco-ui/uui-card-media@0.1.1
* @umbraco-ui/uui-card-user@0.1.1
* @umbraco-ui/uui-card@0.1.1
* @umbraco-ui/uui-caret@0.1.1
* @umbraco-ui/uui-checkbox@0.1.1
* @umbraco-ui/uui-css@0.1.1
* @umbraco-ui/uui-dialog-layout@0.1.1
* @umbraco-ui/uui-dialog@0.1.1
* @umbraco-ui/uui-form-layout-item@0.1.1
* @umbraco-ui/uui-form-validation-message@0.1.1
* @umbraco-ui/uui-form@0.1.1
* @umbraco-ui/uui-icon-registry-essential@0.1.1
* @umbraco-ui/uui-icon-registry@0.1.1
* @umbraco-ui/uui-icon@0.1.1
* @umbraco-ui/uui-input-lock@0.1.1
* @umbraco-ui/uui-input-password@0.1.1
* @umbraco-ui/uui-input@0.1.1
* @umbraco-ui/uui-keyboard-shortcut@0.1.1
* @umbraco-ui/uui-label@0.1.1
* @umbraco-ui/uui-loader-bar@0.1.1
* @umbraco-ui/uui-loader-circle@0.1.1
* @umbraco-ui/uui-loader@0.1.1
* @umbraco-ui/uui-menu-item@0.1.1
* @umbraco-ui/uui-pagination@0.1.1
* @umbraco-ui/uui-popover@0.1.1
* @umbraco-ui/uui-progress-bar@0.1.1
* @umbraco-ui/uui-radio@0.1.1
* @umbraco-ui/uui-ref-list@0.1.1
* @umbraco-ui/uui-ref-node-data-type@0.1.1
* @umbraco-ui/uui-ref-node-document-type@0.1.1
* @umbraco-ui/uui-ref-node-form@0.1.1
* @umbraco-ui/uui-ref-node-member@0.1.1
* @umbraco-ui/uui-ref-node-package@0.1.1
* @umbraco-ui/uui-ref-node-user@0.1.1
* @umbraco-ui/uui-ref-node@0.1.1
* @umbraco-ui/uui-ref@0.1.1
* @umbraco-ui/uui-scroll-container@0.1.1
* @umbraco-ui/uui-select@0.1.1
* @umbraco-ui/uui-slider@0.1.1
* @umbraco-ui/uui-symbol-expand@0.1.1
* @umbraco-ui/uui-symbol-file@0.1.1
* @umbraco-ui/uui-symbol-folder@0.1.1
* @umbraco-ui/uui-symbol-lock@0.1.1
* @umbraco-ui/uui-symbol-more@0.1.1
* @umbraco-ui/uui-symbol-sort@0.1.1
* @umbraco-ui/uui-table@0.1.1
* @umbraco-ui/uui-tabs@0.1.1
* @umbraco-ui/uui-tag@0.1.1
* @umbraco-ui/uui-textarea@0.1.1
* @umbraco-ui/uui-toast-notification-container@0.1.1
* @umbraco-ui/uui-toast-notification-layout@0.1.1
* @umbraco-ui/uui-toast-notification@0.1.1
* @umbraco-ui/uui-toggle@0.1.1
* @umbraco-ui/uui@0.1.1

- update references

- internal: use npm ci to counter Github Actions oddness

- internal: try with unsafe-perm to counter differentiating OS'es

- internal: downgrade Turbo to 1.1.5 to supposedly work with Github Actions

Co-authored-by: Niels Lyngsø <niels.lyngso@gmail.com>

## [0.1.1](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-popover@0.1.0...@umbraco-ui/uui-popover@0.1.1) (2022-04-01)

**Note:** Version bump only for package @umbraco-ui/uui-popover

# 0.1.0 (2022-03-31)

### Bug Fixes

- remove double definitions of several test files ([15d303a](https://github.com/umbraco/Umbraco.UI/commit/15d303a173981d16a78a879f959dfae045f494ce))
