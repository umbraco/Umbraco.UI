# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.14.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.13.0...v1.14.0-rc.0) (2025-05-16)

### Bug Fixes

- selection on click in color area ([#1075](https://github.com/umbraco/Umbraco.UI/issues/1075)) ([517788b](https://github.com/umbraco/Umbraco.UI/commit/517788b976de37852fe5d4e111f63a460570b5d8))

# [1.13.0](https://github.com/umbraco/Umbraco.UI/compare/v1.13.0-rc.2...v1.13.0) (2025-03-26)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.13.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.13.0-rc.1...v1.13.0-rc.2) (2025-03-14)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.13.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.12.2...v1.13.0-rc.0) (2025-03-04)

### Bug Fixes

- drag.ts lint errors ([0f9b0f3](https://github.com/umbraco/Umbraco.UI/commit/0f9b0f3db251e8168ba7733485e50dcae5a37c3a))
- reference to TouchEvent which is not defined in Firefox ([#1001](https://github.com/umbraco/Umbraco.UI/issues/1001)) ([338ca32](https://github.com/umbraco/Umbraco.UI/commit/338ca32b3f68e13699c815096ecd63b9d3d3211b))

### Features

- New color 'invalid' ([#1009](https://github.com/umbraco/Umbraco.UI/issues/1009)) ([cd24246](https://github.com/umbraco/Umbraco.UI/commit/cd24246fe6af0e245570d082357e8432b58b2302))

## [1.12.2](https://github.com/umbraco/Umbraco.UI/compare/v1.12.1...v1.12.2) (2024-11-27)

### Bug Fixes

- selectable mixin only be selective when selectabletarget is this ([#971](https://github.com/umbraco/Umbraco.UI/issues/971)) ([dc7a416](https://github.com/umbraco/Umbraco.UI/commit/dc7a4165cc7b4b09f6ad172e796c4cd54ee07eea))

## [1.12.1](https://github.com/umbraco/Umbraco.UI/compare/v1.12.0...v1.12.1) (2024-11-25)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.12.0](https://github.com/umbraco/Umbraco.UI/compare/v1.11.0...v1.12.0) (2024-11-20)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.11.0](https://github.com/umbraco/Umbraco.UI/compare/v1.10.1...v1.11.0) (2024-10-14)

### Bug Fixes

- **UUIFormControlMixin:** dont call setAttribute in the constructor ([#931](https://github.com/umbraco/Umbraco.UI/issues/931)) ([a7ca074](https://github.com/umbraco/Umbraco.UI/commit/a7ca074953759dc8a276bc80d57573b304f02582))

# [1.10.0](https://github.com/umbraco/Umbraco.UI/compare/v1.10.0-rc.0...v1.10.0) (2024-09-16)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.10.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.9.0-rc.2...v1.10.0-rc.0) (2024-09-10)

### Bug Fixes

- ensure that empty text nodes do not make the label mixin think it is non-empty ([ec197fc](https://github.com/umbraco/Umbraco.UI/commit/ec197fcd1455d7038c7b328a4ced44bf4ca9b8a8))
- revert the function to calculate if a default slot is empty ([0f00e3e](https://github.com/umbraco/Umbraco.UI/commit/0f00e3efb786635ca60902270970216ca6630f80))

# [1.9.0](https://github.com/umbraco/Umbraco.UI/compare/v1.9.0-rc.2...v1.9.0) (2024-07-25)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.9.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.9.0-rc.0...v1.9.0-rc.1) (2024-07-11)

### Bug Fixes

- revert the function to calculate if a default slot is empty ([cea165e](https://github.com/umbraco/Umbraco.UI/commit/cea165e539348a0f8346c4c4f7ba1128e22eb831))

# [1.9.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.8.1...v1.9.0-rc.0) (2024-07-11)

### Bug Fixes

- ensure that empty text nodes do not make the label mixin think it is non-empty ([b0461b6](https://github.com/umbraco/Umbraco.UI/commit/b0461b6bbcc5413f7eb4e59d7f0bdfc4be1020ec))

# [1.8.0](https://github.com/umbraco/Umbraco.UI/compare/v1.8.0-rc.3...v1.8.0) (2024-05-23)

### Features

- Align FormControl implementation with latest from Backoffice Validation ([#788](https://github.com/umbraco/Umbraco.UI/issues/788)) ([0edfd0c](https://github.com/umbraco/Umbraco.UI/commit/0edfd0c4acfe29e7d108db83308baea8618d30b0))

# [1.8.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.7.1...v1.8.0-rc.0) (2024-04-05)

### Features

- FormControlMixin refactor for types safety and default values ([#745](https://github.com/umbraco/Umbraco.UI/issues/745)) ([37e473b](https://github.com/umbraco/Umbraco.UI/commit/37e473b004e35f69776617dba7787b0a4d64bd80))

### BREAKING CHANGES

- rename to UUIFormControlMixin

- ValueType type

- append the ValueType type on getDefaultValue method

- refactor for typings and default value

- declare \_runValidators method

- undefined Default Value Type

- corrections

# [1.7.0](https://github.com/umbraco/Umbraco.UI/compare/v1.7.0-rc.0...v1.7.0) (2024-02-13)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.7.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.6.1...v1.7.0-rc.0) (2024-02-06)

### Features

- allow lit 3 to be loaded for uui ([f9df5a5](https://github.com/umbraco/Umbraco.UI/commit/f9df5a5b82d1d8c182cd92e0642652a450a3c43b))
- no implicit lit ([c744ede](https://github.com/umbraco/Umbraco.UI/commit/c744edea60b5571e1f8a621522d8f45425e5f5fd))

# [1.6.0](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.4...v1.6.0) (2024-02-02)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.6.0-rc.4](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.3...v1.6.0-rc.4) (2024-01-23)

### Features

- Prefix interface types with UUI ([#716](https://github.com/umbraco/Umbraco.UI/issues/716)) ([7cd20db](https://github.com/umbraco/Umbraco.UI/commit/7cd20dbcbef51fbee308798a90e3bb4c69dbf503))

# [1.6.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.2...v1.6.0-rc.3) (2023-12-15)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.6.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.1...v1.6.0-rc.2) (2023-12-14)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.6.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.0...v1.6.0-rc.1) (2023-11-22)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.6.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0...v1.6.0-rc.0) (2023-11-08)

### Features

- **uui-popover-container:** firefox polyfill ([#628](https://github.com/umbraco/Umbraco.UI/issues/628)) ([7242825](https://github.com/umbraco/Umbraco.UI/commit/72428255cc67ceeb4af8564efe051d99098b795f))

# [1.5.0](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0-rc.3...v1.5.0) (2023-10-30)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.5.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0-rc.2...v1.5.0-rc.3) (2023-10-18)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.5.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0-rc.1...v1.5.0-rc.2) (2023-10-18)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.5.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0-rc.0...v1.5.0-rc.1) (2023-10-17)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.5.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.4.0-rc.2...v1.5.0-rc.0) (2023-09-21)

### Bug Fixes

- allow TouchEvents to be read for move() function ([0e6a6e8](https://github.com/umbraco/Umbraco.UI/commit/0e6a6e82dccfff8f9362bf5f76b9bcadd46b18f1))
- correct base card requestUpdate on selectable ([#563](https://github.com/umbraco/Umbraco.UI/issues/563)) ([8641d98](https://github.com/umbraco/Umbraco.UI/commit/8641d98b5646a5b9ff8384def3c46203115f56e9))

### Features

- **uui-box:** add a property to control the headline variant ([#521](https://github.com/umbraco/Umbraco.UI/issues/521)) ([bda766c](https://github.com/umbraco/Umbraco.UI/commit/bda766cda1d65b6b9711a4cf2c137f2f66e3030d))

# [1.4.0](https://github.com/umbraco/Umbraco.UI/compare/v1.4.0-rc.2...v1.4.0) (2023-09-21)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.4.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.4.0-rc.1...v1.4.0-rc.2) (2023-09-07)

### Bug Fixes

- correct base card requestUpdate on selectable ([#563](https://github.com/umbraco/Umbraco.UI/issues/563)) ([b4be148](https://github.com/umbraco/Umbraco.UI/commit/b4be148498a2cce2a5b5038b1a24c600402a43b1))

# [1.4.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.4.0-rc.0...v1.4.0-rc.1) (2023-08-10)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.4.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.3.0...v1.4.0-rc.0) (2023-07-18)

### Bug Fixes

- allow TouchEvents to be read for move() function ([2342f5a](https://github.com/umbraco/Umbraco.UI/commit/2342f5a17542ef1ff4730ecf0490c3541aaf0ef7))

### Features

- **uui-box:** add a property to control the headline variant ([#521](https://github.com/umbraco/Umbraco.UI/issues/521)) ([6fd4d85](https://github.com/umbraco/Umbraco.UI/commit/6fd4d85199f523ea1ecfe7a42472290cc96d5421))

# [1.3.0](https://github.com/umbraco/Umbraco.UI/compare/v1.3.0-rc.1...v1.3.0) (2023-05-31)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.3.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.3.0-rc.0...v1.3.0-rc.1) (2023-05-25)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.3.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.2.1...v1.3.0-rc.0) (2023-05-15)

### Bug Fixes

- SelectableMixin should not prevent bubbling of keydown event ([2460fab](https://github.com/umbraco/Umbraco.UI/commit/2460fabb7e861ee4a82727a4ac9ef623ccff7610))

### Features

- change events to align with native browser behavior ([#476](https://github.com/umbraco/Umbraco.UI/issues/476)) ([814bdcc](https://github.com/umbraco/Umbraco.UI/commit/814bdcccebc541aed921e8c78ae91e5c96acacfb))

## [1.2.1](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0...v1.2.1) (2023-04-20)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.2.0](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0-rc.3...v1.2.0) (2023-04-20)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.2.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0-rc.2...v1.2.0-rc.3) (2023-04-14)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.2.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0-rc.1...v1.2.0-rc.2) (2023-03-27)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.2.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0-rc.0...v1.2.0-rc.1) (2023-03-22)

**Note:** Version bump only for package @umbraco-ui/uui-base

# 1.2.0-rc.0 (2023-02-07)

### Bug Fixes

- Add labels to fix accessibility warnings ([#289](https://github.com/umbraco/Umbraco.UI/issues/289)) ([373f0d3](https://github.com/umbraco/Umbraco.UI/commit/373f0d396183f7f89a71840b0542c52316821ceb))
- Align lit versions ([#183](https://github.com/umbraco/Umbraco.UI/issues/183)) ([050c0ff](https://github.com/umbraco/Umbraco.UI/commit/050c0ff0eef1f8dadd64c77128c5e75a25c6a584))
- dispatching of events twice ([#292](https://github.com/umbraco/Umbraco.UI/issues/292)) ([901da47](https://github.com/umbraco/Umbraco.UI/commit/901da475b52be7ef65e7e429effc3c82c9aa481b))
- implement validity property for form controls ([de5cf72](https://github.com/umbraco/Umbraco.UI/commit/de5cf726f7c7098bd9e86a00d691653e1a9802f4))
- Small visual corrections ([#213](https://github.com/umbraco/Umbraco.UI/issues/213)) ([ba42fe8](https://github.com/umbraco/Umbraco.UI/commit/ba42fe8597d10035d30ab74eb76937ffeb557079))

- Release/0.1.1 (#190) ([d91d346](https://github.com/umbraco/Umbraco.UI/commit/d91d346a0659f52de2a3c4746065c554f95e6328)), closes [#190](https://github.com/umbraco/Umbraco.UI/issues/190) [#188](https://github.com/umbraco/Umbraco.UI/issues/188) [#187](https://github.com/umbraco/Umbraco.UI/issues/187) [#189](https://github.com/umbraco/Umbraco.UI/issues/189)

### Features

- added uui-combobox elements ([205ceee](https://github.com/umbraco/Umbraco.UI/commit/205ceeed5e08f644b9ebdc736b94943c45702689))
- **build:** update packages to esmodules and fix rollup import ([0980022](https://github.com/umbraco/Umbraco.UI/commit/0980022acd9fedc79b017f417d4c56d247d129e3))
- Form elements submits the form on enter ([#288](https://github.com/umbraco/Umbraco.UI/issues/288)) ([a089cb1](https://github.com/umbraco/Umbraco.UI/commit/a089cb1ff0e288e9cb0f768c72a83a0c2c8c706e))
- new uui-color-\* components (color picker) ([#413](https://github.com/umbraco/Umbraco.UI/issues/413)) ([655ee88](https://github.com/umbraco/Umbraco.UI/commit/655ee88e538f7dfa4c47c7a23bb2bb9a9a2671fd))
- remove registration warning ([aca2ebf](https://github.com/umbraco/Umbraco.UI/commit/aca2ebfccc90cedc9895417ade08b18e639f2116))

### Reverts

- Revert "Publish" ([3d183a4](https://github.com/umbraco/Umbraco.UI/commit/3d183a47c927dd55b2ebabface68a9e28b5b68f9))
- Revert "Publish" ([571707b](https://github.com/umbraco/Umbraco.UI/commit/571707b120b4afb65528851974482c41f4b35d41))

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

# [1.1.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@1.0.0...@umbraco-ui/uui-base@1.1.0) (2023-01-11)

### Features

- **build:** update packages to esmodules and fix rollup import ([0980022](https://github.com/umbraco/Umbraco.UI/commit/0980022acd9fedc79b017f417d4c56d247d129e3))

# [1.0.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@1.0.0-rc.3...@umbraco-ui/uui-base@1.0.0) (2022-08-22)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.0.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@1.0.0-rc.2...@umbraco-ui/uui-base@1.0.0-rc.3) (2022-08-15)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.0.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@1.0.0-rc.1...@umbraco-ui/uui-base@1.0.0-rc.2) (2022-08-10)

### Bug Fixes

- Add labels to fix accessibility warnings ([#289](https://github.com/umbraco/Umbraco.UI/issues/289)) ([373f0d3](https://github.com/umbraco/Umbraco.UI/commit/373f0d396183f7f89a71840b0542c52316821ceb))
- dispatching of events twice ([#292](https://github.com/umbraco/Umbraco.UI/issues/292)) ([901da47](https://github.com/umbraco/Umbraco.UI/commit/901da475b52be7ef65e7e429effc3c82c9aa481b))

### Features

- Form elements submits the form on enter ([#288](https://github.com/umbraco/Umbraco.UI/issues/288)) ([a089cb1](https://github.com/umbraco/Umbraco.UI/commit/a089cb1ff0e288e9cb0f768c72a83a0c2c8c706e))

# [1.0.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@1.0.0-rc.0...@umbraco-ui/uui-base@1.0.0-rc.1) (2022-06-28)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.0.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@0.2.1...@umbraco-ui/uui-base@1.0.0-rc.0) (2022-06-02)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [1.0.0-alpha.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@0.2.1...@umbraco-ui/uui-base@1.0.0-alpha.0) (2022-06-01)

**Note:** Version bump only for package @umbraco-ui/uui-base

## [0.2.1](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@0.2.0...@umbraco-ui/uui-base@0.2.1) (2022-05-31)

### Bug Fixes

- Small visual corrections ([#213](https://github.com/umbraco/Umbraco.UI/issues/213)) ([ba42fe8](https://github.com/umbraco/Umbraco.UI/commit/ba42fe8597d10035d30ab74eb76937ffeb557079))

# [0.2.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@0.1.0...@umbraco-ui/uui-base@0.2.0) (2022-05-04)

### Bug Fixes

- Align lit versions ([#183](https://github.com/umbraco/Umbraco.UI/issues/183)) ([050c0ff](https://github.com/umbraco/Umbraco.UI/commit/050c0ff0eef1f8dadd64c77128c5e75a25c6a584))
- implement validity property for form controls ([de5cf72](https://github.com/umbraco/Umbraco.UI/commit/de5cf726f7c7098bd9e86a00d691653e1a9802f4))

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

## [0.1.1](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@0.1.0...@umbraco-ui/uui-base@0.1.1) (2022-04-01)

**Note:** Version bump only for package @umbraco-ui/uui-base

# [0.1.0](https://github.com/umbraco/Umbraco.UI/compare/@umbraco-ui/uui-base@0.0.15...@umbraco-ui/uui-base@0.1.0) (2022-03-31)

### Features

- remove registration warning ([aca2ebf](https://github.com/umbraco/Umbraco.UI/commit/aca2ebfccc90cedc9895417ade08b18e639f2116))
