# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.17.0-rc.1](https://github.com/umbraco/Umbraco/compare/v1.17.0-rc.0...v1.17.0-rc.1) (2026-01-26)

**Note:** Version bump only for package uui-monorepo

# [1.17.0-rc.0](https://github.com/umbraco/Umbraco/compare/v1.16.0...v1.17.0-rc.0) (2026-01-26)

### Bug Fixes

- Hide value label for opacity slider as well in color picker ([#1212](https://github.com/umbraco/Umbraco/issues/1212)) ([0d855e6](https://github.com/umbraco/Umbraco/commit/0d855e6203e9ea01c3b231ef55c37fcbddaf24c8))

# [1.16.0](https://github.com/umbraco/Umbraco/compare/v1.16.0-rc.0...v1.16.0) (2025-10-17)

**Note:** Version bump only for package uui-monorepo

# [1.16.0-rc.0](https://github.com/umbraco/Umbraco/compare/v1.15.0...v1.16.0-rc.0) (2025-10-07)

### Bug Fixes

- Adjust indent to compensate border ([#1185](https://github.com/umbraco/Umbraco/issues/1185)) ([6a1f27e](https://github.com/umbraco/Umbraco/commit/6a1f27e450e4e09055f886de8534a6ef52f70238))
- makes the beforetoggle event listener passive and move to constructor ([f817422](https://github.com/umbraco/Umbraco/commit/f8174229b808a464d4917579fecfe2af748eed20))
- only exclude static parents if the previous element was no static (recalculate every time) ([4d46b8d](https://github.com/umbraco/Umbraco/commit/4d46b8d53a6b1149298b3040f561316f17f43000))
- only get scroll parents on open actions ([97f895d](https://github.com/umbraco/Umbraco/commit/97f895dfb14854cf8ea0242894c8075c074d44ba))
- reset scroll parents every time the method is called ([a20d69b](https://github.com/umbraco/Umbraco/commit/a20d69b3ece20717a7ef0e38a90a115e7cebbc6b))
- wanted margin on uui-ref items slot ([#1175](https://github.com/umbraco/Umbraco/issues/1175)) ([6718d47](https://github.com/umbraco/Umbraco/commit/6718d47c8eb1235fee8d403cc1db71e05bc0a101))

### Features

- **uui-combobox:** Add open functionality with space bar ([#1170](https://github.com/umbraco/Umbraco/issues/1170)) ([db5207c](https://github.com/umbraco/Umbraco/commit/db5207cc72b639a8cce04515446b0c122afbeb1f))

### Reverts

- Revert "chore: runs eslint --fix and adjusts tests based on new typings" ([33a6d62](https://github.com/umbraco/Umbraco/commit/33a6d62f834a5a40a38fff00bd2ac5b0f2ec0c11))

# [1.15.0](https://github.com/umbraco/Umbraco/compare/v1.15.0-rc.0...v1.15.0) (2025-08-25)

**Note:** Version bump only for package uui-monorepo

# [1.15.0-rc.0](https://github.com/umbraco/Umbraco/compare/v1.14.2...v1.15.0-rc.0) (2025-08-06)

### Bug Fixes

- **uui-color-picker:** sets preview color of empty value to transparent ([8aab968](https://github.com/umbraco/Umbraco/commit/8aab968bf33a91d6e6d0c8d325bd32f7137aaebf))
- **uui-color-slider:** sets `max = 100` for `lightness` type ([d7aeb38](https://github.com/umbraco/Umbraco/commit/d7aeb38fef4c9eeed994b4381e4465393ede0c1d))
- **uui-color-slider:** sets `max = 100` for `saturation` type ([66a0952](https://github.com/umbraco/Umbraco/commit/66a09523644bb93cb570c77d00ab1388b6a58e52))
- **uui-color-slider:** sets `max = 360` for `hue` type ([b0acef4](https://github.com/umbraco/Umbraco/commit/b0acef420c7fc36ff8b6c0f9e587176440dc3de1))
- **uui-combobox:** Change display to "inline-flex" ([b3320e3](https://github.com/umbraco/Umbraco/commit/b3320e35ba76ec55327d801eb846ad4f764a0858))

### Features

- Adjust color slider with min and max ([#1159](https://github.com/umbraco/Umbraco/issues/1159)) ([aa15fb6](https://github.com/umbraco/Umbraco/commit/aa15fb691051b695a5b93b1b95c92e12914f4285))
- **uui-card:** Adds checkbox for selection ([#1138](https://github.com/umbraco/Umbraco/issues/1138)) ([d12a9e1](https://github.com/umbraco/Umbraco/commit/d12a9e1d256d2c8ac4922df68f21ccda539911c9))
- **uui-color-slider:** adds `hideValueLabel` option ([da372bb](https://github.com/umbraco/Umbraco/commit/da372bbe82bd032a0445fcdd13c6bc8047e524bb))

## [1.14.2](https://github.com/umbraco/Umbraco/compare/v1.14.1...v1.14.2) (2025-07-03)

**Note:** Version bump only for package uui-monorepo

## [1.14.1](https://github.com/umbraco/Umbraco.UI/compare/v1.14.0...v1.14.1) (2025-06-30)

### Bug Fixes

- Recalculate popover position on lazy content ([#1129](https://github.com/umbraco/Umbraco.UI/issues/1129)) ([ae54fd9](https://github.com/umbraco/Umbraco.UI/commit/ae54fd98605702991c1c5f3921c9e8d639d877ae))
- removes the @chromatic-com/storybook because it does not work currently ([6ac2f37](https://github.com/umbraco/Umbraco.UI/commit/6ac2f37bf62381aa0bc033ece8b292b23cbe9a20))

# [1.14.0](https://github.com/umbraco/Umbraco.UI/compare/v1.14.0-rc.4...v1.14.0) (2025-06-11)

### Bug Fixes

- line-height set to 1 on uui-button ([#1114](https://github.com/umbraco/Umbraco.UI/issues/1114)) ([9c528f0](https://github.com/umbraco/Umbraco.UI/commit/9c528f004686924ad9874c3b4f429c9c1a3126c4))

# [1.14.0-rc.4](https://github.com/umbraco/Umbraco.UI/compare/v1.14.0-rc.3...v1.14.0-rc.4) (2025-05-30)

### Bug Fixes

- installs postcss-import and postcss-url to ensure asset paths are correct ([04e5033](https://github.com/umbraco/Umbraco.UI/commit/04e503310b3a95043bd7df22395e4bdbc70b106c))

# [1.14.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/v1.14.0-rc.2...v1.14.0-rc.3) (2025-05-28)

### Bug Fixes

- Set height for input prepend/append slots ([#1113](https://github.com/umbraco/Umbraco.UI/issues/1113)) ([0681615](https://github.com/umbraco/Umbraco.UI/commit/0681615c576dcf4e1095b1334caf48c21d29edba))

# [1.14.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.14.0-rc.1...v1.14.0-rc.2) (2025-05-26)

### Bug Fixes

- replaces all color() variables with their true value ([cd6a4a5](https://github.com/umbraco/Umbraco.UI/commit/cd6a4a5337b918e1858919a31772694da31cdb0d))

# [1.14.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.14.0-rc.0...v1.14.0-rc.1) (2025-05-23)

**Note:** Version bump only for package uui-monorepo

# [1.14.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.13.0...v1.14.0-rc.0) (2025-05-16)

### Bug Fixes

- color picker dark theme ([#1057](https://github.com/umbraco/Umbraco.UI/issues/1057)) ([415ff32](https://github.com/umbraco/Umbraco.UI/commit/415ff322fc2524a4167d75f0689343bed5f49bc2))
- Gave host "color" to make sure things like text in date picker are aligned with theme, as well as giving it a a color scheme option ([#1056](https://github.com/umbraco/Umbraco.UI/issues/1056)) ([49534c1](https://github.com/umbraco/Umbraco.UI/commit/49534c1517197ebc176f53d2d65907c38a8b3295))
- selection on click in color area ([#1075](https://github.com/umbraco/Umbraco.UI/issues/1075)) ([517788b](https://github.com/umbraco/Umbraco.UI/commit/517788b976de37852fe5d4e111f63a460570b5d8))
- Text character length validation should be more helpful ([#1060](https://github.com/umbraco/Umbraco.UI/issues/1060)) ([12cc5bc](https://github.com/umbraco/Umbraco.UI/commit/12cc5bcb2ab8c9b925bd811db0b25848df899a56))
- typo in comment ([#1084](https://github.com/umbraco/Umbraco.UI/issues/1084)) ([b1751f0](https://github.com/umbraco/Umbraco.UI/commit/b1751f020743f644f6a9b730851574e62bc906b0))
- **uui-color-picker:** alpha should default to 100 if there is no color string ([#1061](https://github.com/umbraco/Umbraco.UI/issues/1061)) ([dc445f3](https://github.com/umbraco/Umbraco.UI/commit/dc445f3de303d8b529759dedb9231e23e091efbf))

### Features

- adds an "initials" property ([601797f](https://github.com/umbraco/Umbraco.UI/commit/601797f03a469baa9e72b95363e916fade8561ee))
- adds localization to uui-pagination ([#1069](https://github.com/umbraco/Umbraco.UI/issues/1069)) ([4c3bbfa](https://github.com/umbraco/Umbraco.UI/commit/4c3bbfa656678edc8adb2f82ee606fbc41ef1b0b))
- Advanced color slider story ([#1076](https://github.com/umbraco/Umbraco.UI/issues/1076)) ([5a14b6a](https://github.com/umbraco/Umbraco.UI/commit/5a14b6a70781ee26628b1ff91320ef9f276d4cc0))
- Allow color gradient in color swatch ([#1074](https://github.com/umbraco/Umbraco.UI/issues/1074)) ([df8b8b0](https://github.com/umbraco/Umbraco.UI/commit/df8b8b072374c46ca5485d18d307f133129e2a07))
- Specific input mode similar to input type ([#1021](https://github.com/umbraco/Umbraco.UI/issues/1021)) ([f18414d](https://github.com/umbraco/Umbraco.UI/commit/f18414d12bbed4618bbb8b11eedd926c9ff27bf5))

# [1.13.0](https://github.com/umbraco/Umbraco.UI/compare/v1.13.0-rc.2...v1.13.0) (2025-03-26)

### Bug Fixes

- make fallback select border ([#1048](https://github.com/umbraco/Umbraco.UI/issues/1048)) ([ba493b1](https://github.com/umbraco/Umbraco.UI/commit/ba493b175c03ffc180b939ba340373747d557a5a)), closes [#1037](https://github.com/umbraco/Umbraco.UI/issues/1037)

# [1.13.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.13.0-rc.1...v1.13.0-rc.2) (2025-03-14)

### Bug Fixes

- ensure `renderSlots()` return correctly tagged unsafe html ([6a1366e](https://github.com/umbraco/Umbraco.UI/commit/6a1366e439870ad60d39ce8f387a3f8530ed1ba7))
- long media name hides the thumbnail ([#1042](https://github.com/umbraco/Umbraco.UI/issues/1042)) ([f049b67](https://github.com/umbraco/Umbraco.UI/commit/f049b674f626e47926a0efbce0fec4b2e1265a00))
- Make disabled menu item button more clear ([#1034](https://github.com/umbraco/Umbraco.UI/issues/1034)) ([a7177be](https://github.com/umbraco/Umbraco.UI/commit/a7177bee01932062c2118fc7cd4d81c9b71326fd))
- Remove extra margin on ref-node ([#1037](https://github.com/umbraco/Umbraco.UI/issues/1037)) ([#1038](https://github.com/umbraco/Umbraco.UI/issues/1038)) ([5718632](https://github.com/umbraco/Umbraco.UI/commit/57186329f83727439555c59b110e1deb4a980381))
- **uui-card:** text overflow when user name is too long ([#1036](https://github.com/umbraco/Umbraco.UI/issues/1036)) ([e18d793](https://github.com/umbraco/Umbraco.UI/commit/e18d793772f7fb6af9b3ba8b8690f31854780b19))

# [1.13.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.13.0-rc.0...v1.13.0-rc.1) (2025-03-06)

**Note:** Version bump only for package uui-monorepo

# [1.13.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.12.2...v1.13.0-rc.0) (2025-03-04)

### Bug Fixes

- add role attribute to tablist elements for accessibility ([3bb8802](https://github.com/umbraco/Umbraco.UI/commit/3bb88026716d23bffac9f9e4d341506861f05a5a))
- apply border radius to input, select, and textarea ([57abde0](https://github.com/umbraco/Umbraco.UI/commit/57abde0749cb0d43320e0ae8ea8b1f3b45a7925b))
- drag.ts lint errors ([0f9b0f3](https://github.com/umbraco/Umbraco.UI/commit/0f9b0f3db251e8168ba7733485e50dcae5a37c3a))
- lower table cell height to take up less space ([dd1bb25](https://github.com/umbraco/Umbraco.UI/commit/dd1bb257c5cd583517e1925ae8c02fb98832920f))
- reference to TouchEvent which is not defined in Firefox ([#1001](https://github.com/umbraco/Umbraco.UI/issues/1001)) ([338ca32](https://github.com/umbraco/Umbraco.UI/commit/338ca32b3f68e13699c815096ecd63b9d3d3211b))
- set svg width to 100% on UUIconElement ([23ceec8](https://github.com/umbraco/Umbraco.UI/commit/23ceec87c67d30de18b33f2ded21e7726b74d459))
- **uui-symbol-more:** inherit current color ([#1025](https://github.com/umbraco/Umbraco.UI/issues/1025)) ([b299735](https://github.com/umbraco/Umbraco.UI/commit/b2997357d6ae677b25a7d27f2fe901c6280ae0e9))
- vertical aligment uui-symbol-expand.element.ts ([#1010](https://github.com/umbraco/Umbraco.UI/issues/1010)) ([fb6d48e](https://github.com/umbraco/Umbraco.UI/commit/fb6d48ea68d75719484df7e15d2186e9a403e21a))

### Features

- Adds uui-button-copy-text ([#985](https://github.com/umbraco/Umbraco.UI/issues/985)) ([7641286](https://github.com/umbraco/Umbraco.UI/commit/764128623c45727b68684bad5cb281283d90c985))
- New color 'invalid' ([#1009](https://github.com/umbraco/Umbraco.UI/issues/1009)) ([cd24246](https://github.com/umbraco/Umbraco.UI/commit/cd24246fe6af0e245570d082357e8432b58b2302))

## [1.12.2](https://github.com/umbraco/Umbraco.UI/compare/v1.12.1...v1.12.2) (2024-11-27)

### Bug Fixes

- selectable mixin only be selective when selectabletarget is this ([#971](https://github.com/umbraco/Umbraco.UI/issues/971)) ([dc7a416](https://github.com/umbraco/Umbraco.UI/commit/dc7a4165cc7b4b09f6ad172e796c4cd54ee07eea))
- **uui-action-bar:** target any slotted element ([#964](https://github.com/umbraco/Umbraco.UI/issues/964)) ([03fe69c](https://github.com/umbraco/Umbraco.UI/commit/03fe69cef43863a2f21ee4bad2b14a5958640163))

## [1.12.1](https://github.com/umbraco/Umbraco.UI/compare/v1.12.0...v1.12.1) (2024-11-25)

### Bug Fixes

- revert the `height`on `uui-symbol-expand` ([15b38ff](https://github.com/umbraco/Umbraco.UI/commit/15b38ffc124d5f642a317a47557757e318ec5f80))

# [1.12.0](https://github.com/umbraco/Umbraco.UI/compare/v1.11.0...v1.12.0) (2024-11-20)

### Bug Fixes

- Add pointer cursor to color picker button ([#936](https://github.com/umbraco/Umbraco.UI/issues/936)) ([86c4fce](https://github.com/umbraco/Umbraco.UI/commit/86c4fce113530f7bf95b4a738ae4f60a099de224))

### Features

- make actions container visible on focus-within ([#949](https://github.com/umbraco/Umbraco.UI/issues/949)) ([29cfe66](https://github.com/umbraco/Umbraco.UI/commit/29cfe66a2f6fd0d27f342ebd91b14f537be3c286))

# [1.11.0](https://github.com/umbraco/Umbraco.UI/compare/v1.10.1...v1.11.0) (2024-10-14)

### Bug Fixes

- **uui-slider:** Ensure track step dots are in center on track ([#919](https://github.com/umbraco/Umbraco.UI/issues/919)) ([9cd02f6](https://github.com/umbraco/Umbraco.UI/commit/9cd02f634b144674543a1497b2ac53952d89d90c))
- **UUIFormControlMixin:** dont call setAttribute in the constructor ([#931](https://github.com/umbraco/Umbraco.UI/issues/931)) ([a7ca074](https://github.com/umbraco/Umbraco.UI/commit/a7ca074953759dc8a276bc80d57573b304f02582))

### Features

- :bulb: add readonly property ([6baf2ab](https://github.com/umbraco/Umbraco.UI/commit/6baf2ab7270f8e5e342dbe7bd9c2d7ee08b61772))
- **uui-color-picker:** Add readonly for color picker component ([#933](https://github.com/umbraco/Umbraco.UI/issues/933)) ([871b7dd](https://github.com/umbraco/Umbraco.UI/commit/871b7dd8ece9dae40f799aa820c2cc47da57f982))
- **uui-color-swatches:** Add readonly to color swatches component ([#932](https://github.com/umbraco/Umbraco.UI/issues/932)) ([e35daff](https://github.com/umbraco/Umbraco.UI/commit/e35dafffb00a11cee4b15ec3b3a5e6f744ebbd06))

## [1.10.1](https://github.com/umbraco/Umbraco.UI/compare/v1.10.0...v1.10.1) (2024-10-09)

### Bug Fixes

- **uui-slider:** Focus handle in slider instead of slider track itself ([#918](https://github.com/umbraco/Umbraco.UI/issues/918)) ([b3438a0](https://github.com/umbraco/Umbraco.UI/commit/b3438a07d28e945a1f98ebfd976d4f661222ed51))

# [1.10.0](https://github.com/umbraco/Umbraco.UI/compare/v1.10.0-rc.0...v1.10.0) (2024-09-16)

**Note:** Version bump only for package uui-monorepo

# [1.10.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.9.0-rc.2...v1.10.0-rc.0) (2024-09-10)

### Bug Fixes

- adds an `aria-label` to the caret button with a matching property ([03d22c1](https://github.com/umbraco/Umbraco.UI/commit/03d22c1ebdcac42d3bf507191870d30c31e4393c))
- adds an `aria-label` to the caret button with a matching property ([fd699d5](https://github.com/umbraco/Umbraco.UI/commit/fd699d511f69f84d0847a79a391b98606c689f2e))
- ensure that empty text nodes do not make the label mixin think it is non-empty ([ec197fc](https://github.com/umbraco/Umbraco.UI/commit/ec197fcd1455d7038c7b328a4ced44bf4ca9b8a8))
- revert the function to calculate if a default slot is empty ([0f00e3e](https://github.com/umbraco/Umbraco.UI/commit/0f00e3efb786635ca60902270970216ca6630f80))
- **uui-form-validation-message:** default renderer does not support raw HTML ([#835](https://github.com/umbraco/Umbraco.UI/issues/835)) ([f57456d](https://github.com/umbraco/Umbraco.UI/commit/f57456dcd68ae88a62209ab12b6970b866edb49d))
- **uui-input-lock:** the UUIInputLockEvent is not exported ([#836](https://github.com/umbraco/Umbraco.UI/issues/836)) ([88d9358](https://github.com/umbraco/Umbraco.UI/commit/88d9358c457ebdeab0b6e862190cae58cd54b76c))
- **uui-radio:** keyboard navigation does not work as intended ([#870](https://github.com/umbraco/Umbraco.UI/issues/870)) ([8a7d3d5](https://github.com/umbraco/Umbraco.UI/commit/8a7d3d5a40f360b5bb3314cc0cae66277151427b))
- **uui-radio:** keyboard navigation does not work as intended ([#870](https://github.com/umbraco/Umbraco.UI/issues/870)) ([46e93ca](https://github.com/umbraco/Umbraco.UI/commit/46e93cad2c42044cecc22cef0e31f44daa3b1fb1))
- **uui-textarea:** add danger border if the element is invalid ([286a605](https://github.com/umbraco/Umbraco.UI/commit/286a6051de35d87ad629c1af031258e930052c4c))
- **uui-textarea:** add danger border if the element is invalid ([b16d500](https://github.com/umbraco/Umbraco.UI/commit/b16d5009c2e8cea244e653b68a7527dd87bd9d65))

### Features

- add `rel` property to relevant elements to override default behavior ([#814](https://github.com/umbraco/Umbraco.UI/issues/814)) ([f1978e0](https://github.com/umbraco/Umbraco.UI/commit/f1978e0808102990790881bebdc26fd74a8a6cfa))
- add readonly mode ([bffe72b](https://github.com/umbraco/Umbraco.UI/commit/bffe72bfb1038978ed2a2c8c2fdc3361918b37ef))
- Consistent cursor style for checkbox and radiobutton ([#857](https://github.com/umbraco/Umbraco.UI/issues/857)) ([e2e1011](https://github.com/umbraco/Umbraco.UI/commit/e2e101108a2ce8d4469396a4cfe34861977ad91c))
- Consistent cursor style for checkbox and radiobutton ([#857](https://github.com/umbraco/Umbraco.UI/issues/857)) ([70c4efe](https://github.com/umbraco/Umbraco.UI/commit/70c4efee842da28fabd424096dc5664bf6c84ee9))
- dropzone should support folder upload ([#841](https://github.com/umbraco/Umbraco.UI/issues/841)) ([ea8bf2a](https://github.com/umbraco/Umbraco.UI/commit/ea8bf2a9edad35038ac7267af42db193e9239d62))
- implement readonly for uui-combobox ([1909b36](https://github.com/umbraco/Umbraco.UI/commit/1909b366e11d907a012102e161d35e6584465a8a))
- implement readonly for uui-range-slider ([89bbf0d](https://github.com/umbraco/Umbraco.UI/commit/89bbf0d246607b8c84bf2513db5a93c25db225ea))
- implement readonly mode for uui-ref-node ([5c84cec](https://github.com/umbraco/Umbraco.UI/commit/5c84cecb3137077adca956fed8a4c3be0fc3f138))
- implement readonly state for uui-slider ([14d8f33](https://github.com/umbraco/Umbraco.UI/commit/14d8f337766d0a9085d96faaceb392ec52276045))
- Indeterminate state for boolean input and checkbox ([#856](https://github.com/umbraco/Umbraco.UI/issues/856)) ([0692937](https://github.com/umbraco/Umbraco.UI/commit/0692937d992e99ff7e9b1c9bd33a1278f009c8b7))
- Indeterminate state for boolean input and checkbox ([#856](https://github.com/umbraco/Umbraco.UI/issues/856)) ([74a6121](https://github.com/umbraco/Umbraco.UI/commit/74a61210aa6335dbc3f2fdc5d8e17470bd8ed5c3))
- readonly state for boolean base class ([2c5c5a3](https://github.com/umbraco/Umbraco.UI/commit/2c5c5a317630ea3e6ab34ea7f7368ed695c0f047))
- readonly state for checkbox ([c58e6bf](https://github.com/umbraco/Umbraco.UI/commit/c58e6bf321fc24344c6a5a765821ebb168e501ef))
- readonly state for toggle ([86ab7b8](https://github.com/umbraco/Umbraco.UI/commit/86ab7b89cb0bb7060b522de16fe4eb62d767bd69))
- readonly state for uui-radio ([c7efa01](https://github.com/umbraco/Umbraco.UI/commit/c7efa018251ad031e7099b4698a9e975d8f26951))
- readonly state for uui-radio-group ([8d2e211](https://github.com/umbraco/Umbraco.UI/commit/8d2e2115bfc8c25fa10ec64f9b31937eab23e15c))
- **uui-color-picker:** allow the value to be empty ([#842](https://github.com/umbraco/Umbraco.UI/issues/842)) ([c3663b0](https://github.com/umbraco/Umbraco.UI/commit/c3663b066bba677de79d624f30d894c1ee9c6661))
- **uui-popover-container:** remove the Firefox popover polyfill ([#858](https://github.com/umbraco/Umbraco.UI/issues/858)) ([a8d87b5](https://github.com/umbraco/Umbraco.UI/commit/a8d87b50b1cc63f6adee32aa04134dfbb3f3af7c))
- **uui-popover-container:** remove the Firefox popover polyfill ([#858](https://github.com/umbraco/Umbraco.UI/issues/858)) ([d26635f](https://github.com/umbraco/Umbraco.UI/commit/d26635f0851e32b875406e7f951cdc5660bd8baa))

# [1.9.0](https://github.com/umbraco/Umbraco.UI/compare/v1.9.0-rc.2...v1.9.0) (2024-07-25)

### Bug Fixes

- adds an `aria-label` to the caret button with a matching property ([fd699d5](https://github.com/umbraco/Umbraco.UI/commit/fd699d511f69f84d0847a79a391b98606c689f2e))
- **uui-radio:** keyboard navigation does not work as intended ([#870](https://github.com/umbraco/Umbraco.UI/issues/870)) ([46e93ca](https://github.com/umbraco/Umbraco.UI/commit/46e93cad2c42044cecc22cef0e31f44daa3b1fb1))
- **uui-textarea:** add danger border if the element is invalid ([b16d500](https://github.com/umbraco/Umbraco.UI/commit/b16d5009c2e8cea244e653b68a7527dd87bd9d65))

### Features

- Consistent cursor style for checkbox and radiobutton ([#857](https://github.com/umbraco/Umbraco.UI/issues/857)) ([70c4efe](https://github.com/umbraco/Umbraco.UI/commit/70c4efee842da28fabd424096dc5664bf6c84ee9))
- Indeterminate state for boolean input and checkbox ([#856](https://github.com/umbraco/Umbraco.UI/issues/856)) ([74a6121](https://github.com/umbraco/Umbraco.UI/commit/74a61210aa6335dbc3f2fdc5d8e17470bd8ed5c3))
- **uui-popover-container:** remove the Firefox popover polyfill ([#858](https://github.com/umbraco/Umbraco.UI/issues/858)) ([d26635f](https://github.com/umbraco/Umbraco.UI/commit/d26635f0851e32b875406e7f951cdc5660bd8baa))

# [1.9.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.9.0-rc.1...v1.9.0-rc.2) (2024-07-12)

**Note:** Version bump only for package uui-monorepo

# [1.9.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.9.0-rc.0...v1.9.0-rc.1) (2024-07-11)

### Bug Fixes

- revert the function to calculate if a default slot is empty ([cea165e](https://github.com/umbraco/Umbraco.UI/commit/cea165e539348a0f8346c4c4f7ba1128e22eb831))

# [1.9.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.8.1...v1.9.0-rc.0) (2024-07-11)

### Bug Fixes

- ensure that empty text nodes do not make the label mixin think it is non-empty ([b0461b6](https://github.com/umbraco/Umbraco.UI/commit/b0461b6bbcc5413f7eb4e59d7f0bdfc4be1020ec))
- Hide the native input for boolean elements in firefox ([#808](https://github.com/umbraco/Umbraco.UI/issues/808)) ([bc31088](https://github.com/umbraco/Umbraco.UI/commit/bc310888ef68faf685e0f0c3ac05827381d5ddcd))
- Hide the native input for boolean elements in firefox ([#808](https://github.com/umbraco/Umbraco.UI/issues/808)) ([81c0a95](https://github.com/umbraco/Umbraco.UI/commit/81c0a95a24b6df903f5382cb3b735cfa4a27f381))
- prevent overflow when not hovered ([#816](https://github.com/umbraco/Umbraco.UI/issues/816)) ([3e3f22a](https://github.com/umbraco/Umbraco.UI/commit/3e3f22a9ae1e6110c71161bc226f4487a6176196))
- prevent overflow when not hovered ([#816](https://github.com/umbraco/Umbraco.UI/issues/816)) ([b3fcd2b](https://github.com/umbraco/Umbraco.UI/commit/b3fcd2b535ce3d7049739d13a6b56a9cc2036e8a))
- **uui-form-validation-message:** default renderer does not support raw HTML ([#835](https://github.com/umbraco/Umbraco.UI/issues/835)) ([4320539](https://github.com/umbraco/Umbraco.UI/commit/4320539dc3b327a1993042dedaef95d0b1bc4bd2))
- **uui-input-lock:** the UUIInputLockEvent is not exported ([#836](https://github.com/umbraco/Umbraco.UI/issues/836)) ([43a7528](https://github.com/umbraco/Umbraco.UI/commit/43a7528b70620786de691572be8171553e086af5))

### Features

- add `rel` property to relevant elements to override default behavior ([#814](https://github.com/umbraco/Umbraco.UI/issues/814)) ([cf81c2d](https://github.com/umbraco/Umbraco.UI/commit/cf81c2d991b25eae7728bef2f6581d43e9367448))
- add readonly mode ([23c6d2c](https://github.com/umbraco/Umbraco.UI/commit/23c6d2ccb9d28a1f0c66e142bcf1024384306c48))
- dropzone should support folder upload ([#841](https://github.com/umbraco/Umbraco.UI/issues/841)) ([dc7594d](https://github.com/umbraco/Umbraco.UI/commit/dc7594d30112b390acb998a65eda84d7832af30d))
- implement readonly for uui-combobox ([2b03861](https://github.com/umbraco/Umbraco.UI/commit/2b038610fd4bbc9635c3769d8d70fd11b962e13e))
- implement readonly for uui-range-slider ([e720227](https://github.com/umbraco/Umbraco.UI/commit/e720227cc92f21d631bdaaadaafa9ecc03ff13da))
- implement readonly mode for uui-ref-node ([d37861c](https://github.com/umbraco/Umbraco.UI/commit/d37861c759730fc40a7842bb4736735ba0454f22))
- implement readonly state for uui-slider ([9379cc1](https://github.com/umbraco/Umbraco.UI/commit/9379cc17ea6d7327911fa6fd319767eb2b88c7dd))
- readonly state for boolean base class ([78ebbdd](https://github.com/umbraco/Umbraco.UI/commit/78ebbdde6e8622e1048b760c4727e5f19a397ab1))
- readonly state for checkbox ([5e3cbdc](https://github.com/umbraco/Umbraco.UI/commit/5e3cbdcc785aa9954a727d28af90f06d3ca1625c))
- readonly state for toggle ([c7565b9](https://github.com/umbraco/Umbraco.UI/commit/c7565b91fc9d74ac105b91e6b9c1b7114187430f))
- readonly state for uui-radio ([201917e](https://github.com/umbraco/Umbraco.UI/commit/201917e24a77ddbf2c0faaa884bae7b1204923c5))
- readonly state for uui-radio-group ([6a5f636](https://github.com/umbraco/Umbraco.UI/commit/6a5f63667d1d9f274753e25305447a8f9c5d5d63))
- **uui-color-picker:** allow the value to be empty ([#842](https://github.com/umbraco/Umbraco.UI/issues/842)) ([c45ac40](https://github.com/umbraco/Umbraco.UI/commit/c45ac4001a53f123804c2a11923e290e9ff5da10))
- **uui-slider:** Hide label property + fix error for floating point numbers ([#813](https://github.com/umbraco/Umbraco.UI/issues/813)) ([bef030f](https://github.com/umbraco/Umbraco.UI/commit/bef030f70bc2b68ccf2c2074aa34c8fa18fea6e8))
- **uui-slider:** Hide label property + fix error for floating point numbers ([#813](https://github.com/umbraco/Umbraco.UI/issues/813)) ([12bcd06](https://github.com/umbraco/Umbraco.UI/commit/12bcd06f978f0937b9d697c4c16f449779038b56))

## [1.8.2](https://github.com/umbraco/Umbraco.UI/compare/v1.8.1...v1.8.2) (2024-06-18)

### Bug Fixes

- Hide the native input for boolean elements in firefox ([#808](https://github.com/umbraco/Umbraco.UI/issues/808)) ([81c0a95](https://github.com/umbraco/Umbraco.UI/commit/81c0a95a24b6df903f5382cb3b735cfa4a27f381))
- prevent overflow when not hovered ([#816](https://github.com/umbraco/Umbraco.UI/issues/816)) ([b3fcd2b](https://github.com/umbraco/Umbraco.UI/commit/b3fcd2b535ce3d7049739d13a6b56a9cc2036e8a))

### Features

- **uui-slider:** Hide label property + fix error for floating point numbers ([#813](https://github.com/umbraco/Umbraco.UI/issues/813)) ([12bcd06](https://github.com/umbraco/Umbraco.UI/commit/12bcd06f978f0937b9d697c4c16f449779038b56))

## [1.8.1](https://github.com/umbraco/Umbraco.UI/compare/v1.8.0...v1.8.1) (2024-05-24)

**Note:** Version bump only for package uui-monorepo

# [1.8.0](https://github.com/umbraco/Umbraco.UI/compare/v1.8.0-rc.3...v1.8.0) (2024-05-23)

### Bug Fixes

- Dont show a link when no href is supplied ([#797](https://github.com/umbraco/Umbraco.UI/issues/797)) ([658b6a6](https://github.com/umbraco/Umbraco.UI/commit/658b6a685e026fa4f7d201cc00a5ed2eb718f9ab))

### Features

- Add custom properties to uui-tag ([#791](https://github.com/umbraco/Umbraco.UI/issues/791)) ([46fde86](https://github.com/umbraco/Umbraco.UI/commit/46fde86c6f2e783e6ddd0c49b0e5a6688808df89))
- Align FormControl implementation with latest from Backoffice Validation ([#788](https://github.com/umbraco/Umbraco.UI/issues/788)) ([0edfd0c](https://github.com/umbraco/Umbraco.UI/commit/0edfd0c4acfe29e7d108db83308baea8618d30b0))
- focus method for menu-item ([#789](https://github.com/umbraco/Umbraco.UI/issues/789)) ([86062ae](https://github.com/umbraco/Umbraco.UI/commit/86062ae020841b145edd81977a62728301e2d570))
- menu items hide actions ([#796](https://github.com/umbraco/Umbraco.UI/issues/796)) ([9f07ae6](https://github.com/umbraco/Umbraco.UI/commit/9f07ae6b98881dc048b2c90710aaca8a38502cd9))

# [1.8.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/v1.8.0-rc.2...v1.8.0-rc.3) (2024-04-16)

### Bug Fixes

- modal css vars ([#784](https://github.com/umbraco/Umbraco.UI/issues/784)) ([145dbf0](https://github.com/umbraco/Umbraco.UI/commit/145dbf016eac5a5591a5470ebe327bd9a6ef3f3b))

# [1.8.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.8.0-rc.1...v1.8.0-rc.2) (2024-04-15)

### Bug Fixes

- **uui-button:** :ambulance: add back missing animation ([#782](https://github.com/umbraco/Umbraco.UI/issues/782)) ([5a1fea7](https://github.com/umbraco/Umbraco.UI/commit/5a1fea7d84a01193ab1af479ae389411584dead2))
- **uui-dialog:** remove background ([#781](https://github.com/umbraco/Umbraco.UI/issues/781)) ([13fd470](https://github.com/umbraco/Umbraco.UI/commit/13fd470e233c51b0312ebde2ad77934108d15202))

# [1.8.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.8.0-rc.0...v1.8.0-rc.1) (2024-04-11)

### Bug Fixes

- add custom property for menu border radius ([f6e0a94](https://github.com/umbraco/Umbraco.UI/commit/f6e0a9444eb982969ec70aeff773daa51f97cf8b))
- inherit font weight for uui-menu-item ([d1c59ad](https://github.com/umbraco/Umbraco.UI/commit/d1c59ad81d5bd2b893ab67795d83667440050fd4))
- Update uui-box.element.ts to support border color changeability ([455c1ca](https://github.com/umbraco/Umbraco.UI/commit/455c1caa9b96ecd43c07cd75a46abacb8e0af5c2))

# [1.8.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.7.1...v1.8.0-rc.0) (2024-04-05)

### Bug Fixes

- **uui-css:** do not import the lato font here as it means you cannot import only the custom properties without getting the font ([2b57abb](https://github.com/umbraco/Umbraco.UI/commit/2b57abbd1331092f02e05622db81862de587249e))
- **uui-css:** do not import the lato font here as it means you cannot import only the custom properties without getting the font ([ed8659c](https://github.com/umbraco/Umbraco.UI/commit/ed8659c707ecdce0507a3c22bec1af95e7523950))
- **uui-tab-group:** Unable to remove tab ([#753](https://github.com/umbraco/Umbraco.UI/issues/753)) ([2e24e27](https://github.com/umbraco/Umbraco.UI/commit/2e24e27317d20adea6572da07f8df39081ffe415))
- **uui-tab-group:** Unable to remove tab ([#753](https://github.com/umbraco/Umbraco.UI/issues/753)) ([07c0045](https://github.com/umbraco/Umbraco.UI/commit/07c00452ed9668799a9b4edef01103959e6c7d90))
- **uui-textarea:** Don't hide placeholder text on focus ([#751](https://github.com/umbraco/Umbraco.UI/issues/751)) ([d6cf94f](https://github.com/umbraco/Umbraco.UI/commit/d6cf94fa09499e3c5eb1400f331bf355aa49340a))
- **uui-textarea:** Don't hide placeholder text on focus ([#751](https://github.com/umbraco/Umbraco.UI/issues/751)) ([a90a510](https://github.com/umbraco/Umbraco.UI/commit/a90a510a01ce8a752167e5f455571e010c9cb9ed))

### Features

- :lipstick: add custom properties for menu item ([#773](https://github.com/umbraco/Umbraco.UI/issues/773)) ([229b8da](https://github.com/umbraco/Umbraco.UI/commit/229b8da5cc8ae616e1442e2e11531461864bbe26))
- :lipstick: add more custom properties to uui-box ([#772](https://github.com/umbraco/Umbraco.UI/issues/772)) ([def0263](https://github.com/umbraco/Umbraco.UI/commit/def02631de128e0a45ef678b74f0bb4715d72ea9))
- FormControlMixin refactor for types safety and default values ([#745](https://github.com/umbraco/Umbraco.UI/issues/745)) ([37e473b](https://github.com/umbraco/Umbraco.UI/commit/37e473b004e35f69776617dba7787b0a4d64bd80))
- **uui-button:** add transition property ([#771](https://github.com/umbraco/Umbraco.UI/issues/771)) ([da9151a](https://github.com/umbraco/Umbraco.UI/commit/da9151af7381ddfd84f233789b364b6f66019885))

### BREAKING CHANGES

- rename to UUIFormControlMixin

- ValueType type

- append the ValueType type on getDefaultValue method

- refactor for typings and default value

- declare \_runValidators method

- undefined Default Value Type

- corrections

## [1.7.2](https://github.com/umbraco/Umbraco.UI/compare/v1.7.1...v1.7.2) (2024-03-18)

### Bug Fixes

- **uui-css:** do not import the lato font here as it means you cannot import only the custom properties without getting the font ([ed8659c](https://github.com/umbraco/Umbraco.UI/commit/ed8659c707ecdce0507a3c22bec1af95e7523950))
- **uui-tab-group:** Unable to remove tab ([#753](https://github.com/umbraco/Umbraco.UI/issues/753)) ([07c0045](https://github.com/umbraco/Umbraco.UI/commit/07c00452ed9668799a9b4edef01103959e6c7d90))
- **uui-textarea:** Don't hide placeholder text on focus ([#751](https://github.com/umbraco/Umbraco.UI/issues/751)) ([a90a510](https://github.com/umbraco/Umbraco.UI/commit/a90a510a01ce8a752167e5f455571e010c9cb9ed))

## [1.7.1](https://github.com/umbraco/Umbraco.UI/compare/v1.7.0...v1.7.1) (2024-02-13)

### Bug Fixes

- export elements for UMD bundle ([4e7a3cb](https://github.com/umbraco/Umbraco.UI/commit/4e7a3cb7578935a01f0b12e37c572780010158df))
- **uui-button:** conditionally render aria-label ([9f4d928](https://github.com/umbraco/Umbraco.UI/commit/9f4d9286b13af9f22ce7900d58cbaa3938aff2f1))

# [1.7.0](https://github.com/umbraco/Umbraco.UI/compare/v1.7.0-rc.0...v1.7.0) (2024-02-13)

### Bug Fixes

- **uui-box:** add a getter to headlineVariant to support Lit 3 ([0fc8dbc](https://github.com/umbraco/Umbraco.UI/commit/0fc8dbc31f178bfceaa314c5b466a868f48d18c2))
- **uui-select:** make native inner select follow the width of the outer element ([39c08dd](https://github.com/umbraco/Umbraco.UI/commit/39c08dd8e66a962db1f6cf7b32883fb258b42cc6))

# [1.7.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.6.1...v1.7.0-rc.0) (2024-02-06)

### Bug Fixes

- bump dependent uui-css to correct version range ([2d004d7](https://github.com/umbraco/Umbraco.UI/commit/2d004d7acb48db028c0607f7a68b0a3886e8d3e9))
- Don't update saturation based on parsed color ([#536](https://github.com/umbraco/Umbraco.UI/issues/536)) ([d83b8ba](https://github.com/umbraco/Umbraco.UI/commit/d83b8bafd1798e69ade1e4c2917a9e5ec3acd97f))
- set correct version of uui-css to trail releases ([00020e5](https://github.com/umbraco/Umbraco.UI/commit/00020e5f637116c9228c74ef4e9e8ff9a7c13d09))
- **uui-tab-group:** layout is causing issues due to missing `display: flex` ([#730](https://github.com/umbraco/Umbraco.UI/issues/730)) ([d6cadd9](https://github.com/umbraco/Umbraco.UI/commit/d6cadd9e7bb19f848f17d33b95f726a769d6de27))

### Features

- allow lit 3 to be loaded for uui ([f9df5a5](https://github.com/umbraco/Umbraco.UI/commit/f9df5a5b82d1d8c182cd92e0642652a450a3c43b))
- no implicit lit ([c744ede](https://github.com/umbraco/Umbraco.UI/commit/c744edea60b5571e1f8a621522d8f45425e5f5fd))

## [1.6.2](https://github.com/umbraco/Umbraco.UI/compare/v1.6.1...v1.6.2) (2024-02-06)

### Bug Fixes

- bump dependent uui-css to correct version range ([008b0e5](https://github.com/umbraco/Umbraco.UI/commit/008b0e5a138119fb32ba3856bc6bcc9d01083535))

## [1.6.1](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0...v1.6.1) (2024-02-06)

### Bug Fixes

- **uui-tab-group:** layout is causing issues due to missing `display: flex` ([#730](https://github.com/umbraco/Umbraco.UI/issues/730)) ([5818804](https://github.com/umbraco/Umbraco.UI/commit/58188040d30f872a6ee1c68f92879e3c0e3ac1b1))

# [1.6.0](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.4...v1.6.0) (2024-02-02)

### Bug Fixes

- :bug: swap add icon svg storing sor a correct one ([#727](https://github.com/umbraco/Umbraco.UI/issues/727)) ([9b64e2d](https://github.com/umbraco/Umbraco.UI/commit/9b64e2de1758067c029e28e73f31207485a21fa5))
- uui-tab-group should have display set to block ([#722](https://github.com/umbraco/Umbraco.UI/issues/722)) ([ac5c2b1](https://github.com/umbraco/Umbraco.UI/commit/ac5c2b18b183fc8dcf9a9b2d641782db3f9215ad))
- **uui-tab-group:** async tabs are not calculated correctly and have memory leaks ([#726](https://github.com/umbraco/Umbraco.UI/issues/726)) ([03c5cdc](https://github.com/umbraco/Umbraco.UI/commit/03c5cdc794b316ce290e7db27860ac8043681c7c))

# [1.6.0-rc.4](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.3...v1.6.0-rc.4) (2024-01-23)

### Bug Fixes

- direct imports are not allowed ([3b4b4dd](https://github.com/umbraco/Umbraco.UI/commit/3b4b4dd2ade9b531cde1d35e2808b96b485eb3c7))
- use css var for text ([#717](https://github.com/umbraco/Umbraco.UI/issues/717)) ([278a6dd](https://github.com/umbraco/Umbraco.UI/commit/278a6ddac8556ee94a254aa2278654d4a264fde2))
- use css var for text ([#718](https://github.com/umbraco/Umbraco.UI/issues/718)) ([f5ccaa4](https://github.com/umbraco/Umbraco.UI/commit/f5ccaa42c4e5b07bf89226b5de835fa529161840))
- uui-popover container scroll event ([#713](https://github.com/umbraco/Umbraco.UI/issues/713)) ([656f181](https://github.com/umbraco/Umbraco.UI/commit/656f1811a1de862c7a7f6ca0221bf14e3532d53c))
- uui-tab-group support for gap ([#712](https://github.com/umbraco/Umbraco.UI/issues/712)) ([2f07793](https://github.com/umbraco/Umbraco.UI/commit/2f07793d7a9293b35dcc221006fee7be8c5df79c))

### Features

- Inline-button-create support for HREF ([#720](https://github.com/umbraco/Umbraco.UI/issues/720)) ([7d8affd](https://github.com/umbraco/Umbraco.UI/commit/7d8affdcd7d68e3a68a06a1591084b61ac5fe068))
- Prefix interface types with UUI ([#716](https://github.com/umbraco/Umbraco.UI/issues/716)) ([7cd20db](https://github.com/umbraco/Umbraco.UI/commit/7cd20dbcbef51fbee308798a90e3bb4c69dbf503))
- uui-ref-node should have href and target properties ([#715](https://github.com/umbraco/Umbraco.UI/issues/715)) ([12feafb](https://github.com/umbraco/Umbraco.UI/commit/12feafbbef3f736623503d452332eef7a5dea073))

# [1.6.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.2...v1.6.0-rc.3) (2023-12-15)

### Bug Fixes

- reference uui-card-block-type ([26349e6](https://github.com/umbraco/Umbraco.UI/commit/26349e6829f49f6a01b34824f9e4a186c9d3b50d))

# [1.6.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.1...v1.6.0-rc.2) (2023-12-14)

### Bug Fixes

- Ensure defineElement is used instead of customElement ([#685](https://github.com/umbraco/Umbraco.UI/issues/685)) ([8e3aea1](https://github.com/umbraco/Umbraco.UI/commit/8e3aea1476a594b9f611fbddd1cdd172bcdb2e43))
- padding fixes for uui-combobox ([#670](https://github.com/umbraco/Umbraco.UI/issues/670)) ([985bfaf](https://github.com/umbraco/Umbraco.UI/commit/985bfafe2f7c112a05a81832a0cff5a58ecd5e1c))
- tab group styling of dropdown ([#677](https://github.com/umbraco/Umbraco.UI/issues/677)) ([cb0414e](https://github.com/umbraco/Umbraco.UI/commit/cb0414e060a04cb3cde393eadedc001ebbd723aa))
- uui-combobox click to close by adding toggle ([#671](https://github.com/umbraco/Umbraco.UI/issues/671)) ([236c73b](https://github.com/umbraco/Umbraco.UI/commit/236c73ba2afa3708355aa86a046ede5ee78666c2))
- uui-combobox should correctly handle the active item ([#682](https://github.com/umbraco/Umbraco.UI/issues/682)) ([a438b03](https://github.com/umbraco/Umbraco.UI/commit/a438b03b2814e593c35c6519873b259d4e0b6782))

# [1.6.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.6.0-rc.0...v1.6.0-rc.1) (2023-11-22)

### Bug Fixes

- uui-dropzone should set the 'accept' attribute ([#662](https://github.com/umbraco/Umbraco.UI/issues/662)) ([9d03779](https://github.com/umbraco/Umbraco.UI/commit/9d0377930a6409498f9807f9df1cba3f8f4978b8))
- **uui-input:** make the inner input follow the height of the custom element and add a variable to control it ([4045c14](https://github.com/umbraco/Umbraco.UI/commit/4045c1428e78994f37bb1592a96d786ed60444f3))
- **uui-popover-container:** disable the focusout close listener ([#663](https://github.com/umbraco/Umbraco.UI/issues/663)) ([23900eb](https://github.com/umbraco/Umbraco.UI/commit/23900ebbc9507fcdc8c7c96bff0b478af813992b))
- **uui-select:** do not enforce a certain background-color ([c2eebfc](https://github.com/umbraco/Umbraco.UI/commit/c2eebfcae3934752a7e17fc0fc793821bf5ba503))
- **uui-select:** make the inner select follow the height of the custom element ([9ac213a](https://github.com/umbraco/Umbraco.UI/commit/9ac213abb9b0be1c7c05d6e1cfdad88d17759c7e))
- **uui-select:** move 'height' and other properties to inner element because it is easiest to control the select rather than mimick it in terms of :focus and :hover on the outer element ([b69ed74](https://github.com/umbraco/Umbraco.UI/commit/b69ed74b962c285ce984ecfbc00d648dde2b8b55))
- **uui-select:** set display to "inline-block" to match the inner native element ([e4e3ffd](https://github.com/umbraco/Umbraco.UI/commit/e4e3ffd27ec795f8e74a5c3d135e97d728961199))

### Features

- **uui-menu-item:** add flatten css var to hide chevron column ([#665](https://github.com/umbraco/Umbraco.UI/issues/665)) ([cec3188](https://github.com/umbraco/Umbraco.UI/commit/cec3188e4a2d1e848aa0d94ac1e6800b0a6d536a))
- **uui-popover-container:** set popover attribute automatically ([#664](https://github.com/umbraco/Umbraco.UI/issues/664)) ([201f449](https://github.com/umbraco/Umbraco.UI/commit/201f44960d2f729997d29abab6b5e69d303e6cf6))

# [1.6.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0...v1.6.0-rc.0) (2023-11-08)

### Bug Fixes

- correct green colors ([#648](https://github.com/umbraco/Umbraco.UI/issues/648)) ([d33d4e6](https://github.com/umbraco/Umbraco.UI/commit/d33d4e60b04dfd6873abd7062629de4559a1d3d5))

### Features

- Don't hide placeholder text on focus ([#624](https://github.com/umbraco/Umbraco.UI/issues/624)) ([9cb90b4](https://github.com/umbraco/Umbraco.UI/commit/9cb90b40504e47997756eebb3955bb016057f6e0))
- **uui-popover-container:** firefox polyfill ([#628](https://github.com/umbraco/Umbraco.UI/issues/628)) ([7242825](https://github.com/umbraco/Umbraco.UI/commit/72428255cc67ceeb4af8564efe051d99098b795f))
- **uui-swatch:** ability to overwrite displayed color with a css custom prop ([#649](https://github.com/umbraco/Umbraco.UI/issues/649)) ([48db9f5](https://github.com/umbraco/Umbraco.UI/commit/48db9f5d2b6e1bb59be430506b757e99ed8a0ea2))

# [1.5.0](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0-rc.3...v1.5.0) (2023-10-30)

**Note:** Version bump only for package uui-monorepo

# [1.5.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0-rc.2...v1.5.0-rc.3) (2023-10-18)

**Note:** Version bump only for package uui-monorepo

# [1.5.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0-rc.1...v1.5.0-rc.2) (2023-10-18)

**Note:** Version bump only for package uui-monorepo

# [1.5.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.5.0-rc.0...v1.5.0-rc.1) (2023-10-17)

### Bug Fixes

- fixing imports + story for hrefs ([#614](https://github.com/umbraco/Umbraco.UI/issues/614)) ([4bfb6a1](https://github.com/umbraco/Umbraco.UI/commit/4bfb6a1d866830b67139ed5f3ed8be09d60d28ac))
- Modal close-end event, no more bubbling modal events ([#598](https://github.com/umbraco/Umbraco.UI/issues/598)) ([825d722](https://github.com/umbraco/Umbraco.UI/commit/825d722fd30d210a9363ed14c47cccd96811575f))
- small bugfix for auto width not rendering ([#578](https://github.com/umbraco/Umbraco.UI/issues/578)) ([af8b738](https://github.com/umbraco/Umbraco.UI/commit/af8b738d7fdb4e819b6bc13fd31a881515b45cf8))

### Features

- Add HSV as accepted color format ([#610](https://github.com/umbraco/Umbraco.UI/issues/610)) ([61c62e4](https://github.com/umbraco/Umbraco.UI/commit/61c62e43f03ff0b660d78035f369d3723386c841))
- horizontal padding for uui-tab ([#579](https://github.com/umbraco/Umbraco.UI/issues/579)) ([8459fdb](https://github.com/umbraco/Umbraco.UI/commit/8459fdb5dca949680be3097fdf510966caaf78ce))
- **uui-icon:** Set aria-hidden if no label has been set ([#612](https://github.com/umbraco/Umbraco.UI/issues/612)) ([ac11819](https://github.com/umbraco/Umbraco.UI/commit/ac118190aead6ccb586cc9de7de62bcb9d56201a))
- Visually hidden component ([#593](https://github.com/umbraco/Umbraco.UI/issues/593)) ([875d46e](https://github.com/umbraco/Umbraco.UI/commit/875d46ed4c2b3224affb98cfd3a7d270e63349e8))

# [1.5.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.4.0-rc.2...v1.5.0-rc.0) (2023-09-21)

### Bug Fixes

- add ifDefined() to remove attributes if not defined ([cf1b454](https://github.com/umbraco/Umbraco.UI/commit/cf1b454771f81850034c4bc6cfd1ff00536e3b83))
- all codepaths should return a value ([19393d2](https://github.com/umbraco/Umbraco.UI/commit/19393d2cd39a8b9808c5580f1c51ef00082a2e45))
- allow TouchEvents to be read for move() function ([0e6a6e8](https://github.com/umbraco/Umbraco.UI/commit/0e6a6e82dccfff8f9362bf5f76b9bcadd46b18f1))
- Button text color hover not taking effect ([#520](https://github.com/umbraco/Umbraco.UI/issues/520)) ([e55274e](https://github.com/umbraco/Umbraco.UI/commit/e55274ef3e92efe43b96f9224284592cf9629d73))
- check that coordinates are actual numbers before proceeding with syncing values ([e747ad0](https://github.com/umbraco/Umbraco.UI/commit/e747ad04aa77418c3517958896293579a0574b5f))
- correct base card requestUpdate on selectable ([#563](https://github.com/umbraco/Umbraco.UI/issues/563)) ([8641d98](https://github.com/umbraco/Umbraco.UI/commit/8641d98b5646a5b9ff8384def3c46203115f56e9))
- **uui-input:** inputmode property renamed to inputMode to follow its inherited property ([170651e](https://github.com/umbraco/Umbraco.UI/commit/170651e061c158edc37537923c7246c3d44d97f4))
- **uui-input:** messages should be string not boolean ([ec16fd5](https://github.com/umbraco/Umbraco.UI/commit/ec16fd5c029e5858d3c3b6095061a67ebe2d5996))
- **uui-input:** treat autoWidth as bool attribute ([a1bf741](https://github.com/umbraco/Umbraco.UI/commit/a1bf741d76ea7cfe8765daecce57d86694fa22eb))
- **uui-input:** validators should convert to string ([8457c0b](https://github.com/umbraco/Umbraco.UI/commit/8457c0bb946d324bc504d32a2ec74373e63bb0f3))

### Features

- tab group priority navigation ([#573](https://github.com/umbraco/Umbraco.UI/issues/573)) ([e6a2cd8](https://github.com/umbraco/Umbraco.UI/commit/e6a2cd8f3ce00ea128844ae74068171481a6e8ef))
- **uui-box:** add a property to control the headline variant ([#521](https://github.com/umbraco/Umbraco.UI/issues/521)) ([bda766c](https://github.com/umbraco/Umbraco.UI/commit/bda766cda1d65b6b9711a4cf2c137f2f66e3030d))
- **uui-button:** content align css variable ([#548](https://github.com/umbraco/Umbraco.UI/issues/548)) ([24b2ac5](https://github.com/umbraco/Umbraco.UI/commit/24b2ac58503792a8e2aa4cbd3481821c74729443))
- **uui-input:** Add support for auto-width ([#526](https://github.com/umbraco/Umbraco.UI/issues/526)) ([d8504ec](https://github.com/umbraco/Umbraco.UI/commit/d8504eca80717fefc99b02115f06352bf30de5fc))
- **uui-input:** autofocus and inputmode ([#549](https://github.com/umbraco/Umbraco.UI/issues/549)) ([f9fdbd2](https://github.com/umbraco/Umbraco.UI/commit/f9fdbd26798598e404d641359da4cf105664a734))

# [1.4.0](https://github.com/umbraco/Umbraco.UI/compare/v1.4.0-rc.2...v1.4.0) (2023-09-21)

**Note:** Version bump only for package uui-monorepo

# [1.4.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.4.0-rc.1...v1.4.0-rc.2) (2023-09-07)

### Bug Fixes

- correct base card requestUpdate on selectable ([#563](https://github.com/umbraco/Umbraco.UI/issues/563)) ([b4be148](https://github.com/umbraco/Umbraco.UI/commit/b4be148498a2cce2a5b5038b1a24c600402a43b1))

# [1.4.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.4.0-rc.0...v1.4.0-rc.1) (2023-08-10)

### Bug Fixes

- add ifDefined() to remove attributes if not defined ([22c002a](https://github.com/umbraco/Umbraco.UI/commit/22c002aa9df751f3ea5769d04866a4566b16b4bc))
- **uui-input:** inputmode property renamed to inputMode to follow its inherited property ([03487b0](https://github.com/umbraco/Umbraco.UI/commit/03487b0f4122743f2bbf3bdc64adeb03a789c03a))
- **uui-input:** messages should be string not boolean ([bdabb80](https://github.com/umbraco/Umbraco.UI/commit/bdabb8037fc9b94ab273e0e485f0b2d505669dc8))
- **uui-input:** treat autoWidth as bool attribute ([85528e9](https://github.com/umbraco/Umbraco.UI/commit/85528e91b144e0f84585bd072de73a01f4e2dc22))
- **uui-input:** validators should convert to string ([09a6e27](https://github.com/umbraco/Umbraco.UI/commit/09a6e27b9d9e52e8568d81e3dbd242712e78265f))

### Features

- **uui-button:** content align css variable ([#548](https://github.com/umbraco/Umbraco.UI/issues/548)) ([04554e8](https://github.com/umbraco/Umbraco.UI/commit/04554e89b16b9df9b5b8282fc91204aeea294a6a))
- **uui-input:** autofocus and inputmode ([#549](https://github.com/umbraco/Umbraco.UI/issues/549)) ([c1d52f8](https://github.com/umbraco/Umbraco.UI/commit/c1d52f8617b01421cec8ff56495409c0cb9164ec))

# [1.4.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.3.0...v1.4.0-rc.0) (2023-07-18)

### Bug Fixes

- all codepaths should return a value ([45f7132](https://github.com/umbraco/Umbraco.UI/commit/45f713257ead014c57a094a7e789490e43102862))
- allow TouchEvents to be read for move() function ([2342f5a](https://github.com/umbraco/Umbraco.UI/commit/2342f5a17542ef1ff4730ecf0490c3541aaf0ef7))
- Button text color hover not taking effect ([#520](https://github.com/umbraco/Umbraco.UI/issues/520)) ([c2c6d62](https://github.com/umbraco/Umbraco.UI/commit/c2c6d6209aaf5b879532087fb0c50c69f3c1b717))
- check that coordinates are actual numbers before proceeding with syncing values ([f6ce0f6](https://github.com/umbraco/Umbraco.UI/commit/f6ce0f65371fa2b999dddc16f448a7d80e100fbd))

### Features

- **uui-box:** add a property to control the headline variant ([#521](https://github.com/umbraco/Umbraco.UI/issues/521)) ([6fd4d85](https://github.com/umbraco/Umbraco.UI/commit/6fd4d85199f523ea1ecfe7a42472290cc96d5421))
- **uui-input:** Add support for auto-width ([#526](https://github.com/umbraco/Umbraco.UI/issues/526)) ([1800cf8](https://github.com/umbraco/Umbraco.UI/commit/1800cf85beb16607d28690bf0a3df0ee990f86b0))

# [1.3.0](https://github.com/umbraco/Umbraco.UI/compare/v1.3.0-rc.1...v1.3.0) (2023-05-31)

**Note:** Version bump only for package uui-monorepo

# [1.3.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.3.0-rc.0...v1.3.0-rc.1) (2023-05-25)

### Bug Fixes

- change jsdoc to allow the web-component-analyzer to output correct information ([0c18bdc](https://github.com/umbraco/Umbraco.UI/commit/0c18bdc4296ffa6d18b18141b122def410936a09))
- Make color slider disabled state consistent with disabled color area ([#489](https://github.com/umbraco/Umbraco.UI/issues/489)) ([209bb02](https://github.com/umbraco/Umbraco.UI/commit/209bb02b44994f98de6401ed9451da2182f846c2))
- not possible to drag&drop file with multiple dots ([#487](https://github.com/umbraco/Umbraco.UI/issues/487)) ([f9c6343](https://github.com/umbraco/Umbraco.UI/commit/f9c634308f35e2008d4554100766d65515810858))
- store the final value of any custom properties ([d4a200b](https://github.com/umbraco/Umbraco.UI/commit/d4a200b9d2b537b9bab5054248122cff856aef44))
- **uui-color-area:** dragging the mouse do not select a color ([#486](https://github.com/umbraco/Umbraco.UI/issues/486)) ([8bc217c](https://github.com/umbraco/Umbraco.UI/commit/8bc217c25454dcde2faa9b94a54607d69bdcb073))

# [1.3.0-rc.0](https://github.com/umbraco/Umbraco.UI/compare/v1.2.1...v1.3.0-rc.0) (2023-05-15)

### Bug Fixes

- avoid duplicating the code to accept files ([e209c16](https://github.com/umbraco/Umbraco.UI/commit/e209c168505252ad77b27d6ef97a15b78bb2516e))
- check for support of partly supported `webkitGetAsEntry` ([74a629a](https://github.com/umbraco/Umbraco.UI/commit/74a629aca67f85a0fa7f4b02844ae87a2d2ed424))
- ensure that accepted entries are returned with the File interface ([e75931d](https://github.com/umbraco/Umbraco.UI/commit/e75931d536aa99c4de656571c240803daacd6130))
- SelectableMixin should not prevent bubbling of keydown event ([2460fab](https://github.com/umbraco/Umbraco.UI/commit/2460fabb7e861ee4a82727a4ac9ef623ccff7610))
- **uui-file-dropzone:** export events needed externally ([4a8a377](https://github.com/umbraco/Umbraco.UI/commit/4a8a377244226a6f0f7ba8fe511db4ad46a85f9d))
- **uui-ref-list:** fit within width of given enviroment ([#473](https://github.com/umbraco/Umbraco.UI/issues/473)) ([b49a238](https://github.com/umbraco/Umbraco.UI/commit/b49a238b82736439baa74644e67405d133270871))

### Features

- add missing native attributes to uui-input and uui-textarea ([#484](https://github.com/umbraco/Umbraco.UI/issues/484)) ([93adc81](https://github.com/umbraco/Umbraco.UI/commit/93adc81d6206a4bd03196c8f59b4eccb38bdf3aa))
- change events to align with native browser behavior ([#476](https://github.com/umbraco/Umbraco.UI/issues/476)) ([814bdcc](https://github.com/umbraco/Umbraco.UI/commit/814bdcccebc541aed921e8c78ae91e5c96acacfb))

## [1.2.1](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0...v1.2.1) (2023-04-20)

**Note:** Version bump only for package uui-monorepo

# [1.2.0](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0-rc.3...v1.2.0) (2023-04-20)

### Features

- adds min, max, and step property to the uui-input ([#457](https://github.com/umbraco/Umbraco.UI/issues/457)) ([c8e8798](https://github.com/umbraco/Umbraco.UI/commit/c8e8798b3f961bdf57893c9b02d0b6bb10dcd252))

# [1.2.0-rc.3](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0-rc.2...v1.2.0-rc.3) (2023-04-14)

### Bug Fixes

- uui-range-slider overhaul ([#436](https://github.com/umbraco/Umbraco.UI/issues/436)) ([bc7a783](https://github.com/umbraco/Umbraco.UI/commit/bc7a783448a53cf330edd155efa68839c600174a))

### Features

- uui-scroll-container now uses auto scroll and has an enforce scroll option ([#448](https://github.com/umbraco/Umbraco.UI/issues/448)) ([44ce789](https://github.com/umbraco/Umbraco.UI/commit/44ce789b180ebe3812340a0189668031968ca5bd))

# [1.2.0-rc.2](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0-rc.1...v1.2.0-rc.2) (2023-03-27)

### Features

- ship uui with custom-elements file in vscode format ([a92eee4](https://github.com/umbraco/Umbraco.UI/commit/a92eee4444280745e9b0d12e5409c6596380454d))

# [1.2.0-rc.1](https://github.com/umbraco/Umbraco.UI/compare/v1.2.0-rc.0...v1.2.0-rc.1) (2023-03-22)

### Features

- :bug: add disabled property to uui-combobox ([3c13b8b](https://github.com/umbraco/Umbraco.UI/commit/3c13b8b2dde4287e20f73cbec99582d0a1b2502c))
- added css custom property to overwrite z-index ([#441](https://github.com/umbraco/Umbraco.UI/issues/441)) ([062891a](https://github.com/umbraco/Umbraco.UI/commit/062891a07dec81674f5e08f8b748c283e1d4a511))
- **uui-color-swatches:** color swatches changes form when showLabel is true ([#427](https://github.com/umbraco/Umbraco.UI/issues/427)) ([b42a474](https://github.com/umbraco/Umbraco.UI/commit/b42a4741f86b69ed227cac096a5556b5ca9cd7b3))

# 1.2.0-rc.0 (2023-02-07)

### Bug Fixes

- **a11y:** add role=listitem to the "dots" button ([ce38577](https://github.com/umbraco/Umbraco.UI/commit/ce38577c00d754a2c58d64e1ff010cf5b06be29a))
- add background color in uui-textarea ([#410](https://github.com/umbraco/Umbraco.UI/issues/410)) ([8141eb7](https://github.com/umbraco/Umbraco.UI/commit/8141eb7e2906c88482075bca3325ef67c4e82a44))
- Add cd to installation instruction before npm install ([a6424c0](https://github.com/umbraco/Umbraco.UI/commit/a6424c05dd913f18136634e099f2322b52471b17))
- Add labels to fix accessibility warnings ([#289](https://github.com/umbraco/Umbraco.UI/issues/289)) ([373f0d3](https://github.com/umbraco/Umbraco.UI/commit/373f0d396183f7f89a71840b0542c52316821ceb))
- add missing reference to uui-input-lock ([#187](https://github.com/umbraco/Umbraco.UI/issues/187)) ([b2d69bf](https://github.com/umbraco/Umbraco.UI/commit/b2d69bf0146339f0b5f90c17d087d25dc907a7bb))
- add missing references to uui barrel ([c9bf476](https://github.com/umbraco/Umbraco.UI/commit/c9bf476f9fb2f0f77e38227298948c9c1b3fd26b))
- Add tests to ensure menu-item is tested in its default state with a label as a button ([dedde98](https://github.com/umbraco/Umbraco.UI/commit/dedde984de3e0a90053cd0600e2b5d03a9af4019))
- Add whitespace when appending/prepending icon in uui-input ([#408](https://github.com/umbraco/Umbraco.UI/issues/408)) ([3a86f01](https://github.com/umbraco/Umbraco.UI/commit/3a86f017dea6856649f3f5b76e270a0658a5b96f))
- Align lit versions ([#183](https://github.com/umbraco/Umbraco.UI/issues/183)) ([e15536e](https://github.com/umbraco/Umbraco.UI/commit/e15536e4ab0722881c7e5d975a6632bb9b27ad07))
- Align lit versions ([#183](https://github.com/umbraco/Umbraco.UI/issues/183)) ([050c0ff](https://github.com/umbraco/Umbraco.UI/commit/050c0ff0eef1f8dadd64c77128c5e75a25c6a584))
- Allow uui-button to fit in less tall contexts ([#236](https://github.com/umbraco/Umbraco.UI/issues/236)) ([8b7422f](https://github.com/umbraco/Umbraco.UI/commit/8b7422ffee065cbcce2580b46b2f0b3ef3da114b))
- Bump opacity a bit, to pass color contrast accessibility check ([#351](https://github.com/umbraco/Umbraco.UI/issues/351)) ([92354aa](https://github.com/umbraco/Umbraco.UI/commit/92354aa21ab42de1600fbc2fbab17ab60b607dd4))
- Case insensitivity when using combobox-avatar ([#363](https://github.com/umbraco/Umbraco.UI/issues/363)) ([7acd240](https://github.com/umbraco/Umbraco.UI/commit/7acd240655d8483ada1e8c9cfb7ee1838ba63fcd))
- Change `uui-button` height to min-height and remove the height from `button` inside ([#271](https://github.com/umbraco/Umbraco.UI/issues/271)) ([d7cecac](https://github.com/umbraco/Umbraco.UI/commit/d7cecaca0b70205dd958b9b6f71743f3c07f3366))
- change notification color primary to default ([#258](https://github.com/umbraco/Umbraco.UI/issues/258)) ([2930d52](https://github.com/umbraco/Umbraco.UI/commit/2930d522f25f9bc5de027f8b5dda4049d8539988))
- change super.value to this.value for backwards compatibility ([9cb6399](https://github.com/umbraco/Umbraco.UI/commit/9cb63995a3750471140ad71f5e151d1aa7c7d447))
- change UUIInput type to getter/setter to support input-password ([d529f60](https://github.com/umbraco/Umbraco.UI/commit/d529f6001708466dcca97ad2474b703593fe436c))
- clear a mistake where setter would call itself ([ded01fe](https://github.com/umbraco/Umbraco.UI/commit/ded01fec3d47922a65f2a6672b57a8ec526e7f41))
- clear up confusion with overriding the setter ([9de8dce](https://github.com/umbraco/Umbraco.UI/commit/9de8dcefe043de2eaed25477b839d29020353a9f))
- close button color inherits from toast notification ([bdcc0a4](https://github.com/umbraco/Umbraco.UI/commit/bdcc0a4c039ead337e8cb8078463f8d2a3b55a4f))
- disable-child-interaction going over edges + other details ([#251](https://github.com/umbraco/Umbraco.UI/issues/251)) ([078fcf0](https://github.com/umbraco/Umbraco.UI/commit/078fcf05802fd651bce0546165f0ec2a6ff79dc7))
- dispatching of events twice ([#292](https://github.com/umbraco/Umbraco.UI/issues/292)) ([901da47](https://github.com/umbraco/Umbraco.UI/commit/901da475b52be7ef65e7e429effc3c82c9aa481b))
- do not overwrite the super.value setter but refer to `this`instead ([6d9db70](https://github.com/umbraco/Umbraco.UI/commit/6d9db70e388032f1e746b0ea59bc78cfdb4951bd))
- fixed padding and added multiline story ([#277](https://github.com/umbraco/Umbraco.UI/issues/277)) ([d264e73](https://github.com/umbraco/Umbraco.UI/commit/d264e73c3a512e45b2640286d805ccf070bbd4bb))
- have pagination render update when the total number of pages has changed ([#364](https://github.com/umbraco/Umbraco.UI/issues/364)) ([4d7cc4c](https://github.com/umbraco/Umbraco.UI/commit/4d7cc4c793a646789fc56d588254267b33679a03))
- implement validity property for form controls ([de5cf72](https://github.com/umbraco/Umbraco.UI/commit/de5cf726f7c7098bd9e86a00d691653e1a9802f4))
- import types as types ([3dcb9ce](https://github.com/umbraco/Umbraco.UI/commit/3dcb9ce2abd59dbb665ca0391aae9b72afa930f8))
- iteration of iterators requires more configuration so we are now more specific with Array.from ([0c904f7](https://github.com/umbraco/Umbraco.UI/commit/0c904f74fab9da7fc198b007dbbcc8c82e1589ce))
- make popover work nicely in the button group ([#296](https://github.com/umbraco/Umbraco.UI/issues/296)) ([a5b3635](https://github.com/umbraco/Umbraco.UI/commit/a5b36351694ae84e707611c6826e239442913b17))
- remove default import from test template so new components are not double defined ([0c13b24](https://github.com/umbraco/Umbraco.UI/commit/0c13b2434b7e7a2318f568dbced6383fb266436c))
- remove double definitions of several test files ([15d303a](https://github.com/umbraco/Umbraco.UI/commit/15d303a173981d16a78a879f959dfae045f494ce))
- Remove local definition of --uui-box-default-padding for uui-box ([#189](https://github.com/umbraco/Umbraco.UI/issues/189)) ([fd290a4](https://github.com/umbraco/Umbraco.UI/commit/fd290a47dbe3e3f79e33282a6ac4778c6374b430))
- return empty tempate if there are no groups ([b294ef7](https://github.com/umbraco/Umbraco.UI/commit/b294ef7b70b6c8553c0ae33075036de973cecece))
- Small visual corrections ([#212](https://github.com/umbraco/Umbraco.UI/issues/212)) ([bb3a3d7](https://github.com/umbraco/Umbraco.UI/commit/bb3a3d7128886c65c974b36a2119b613f8aaaf1d))
- Small visual corrections ([#213](https://github.com/umbraco/Umbraco.UI/issues/213)) ([ba42fe8](https://github.com/umbraco/Umbraco.UI/commit/ba42fe8597d10035d30ab74eb76937ffeb557079))
- **storybook:** default slot did not show up in docs tab ([b88cd1d](https://github.com/umbraco/Umbraco.UI/commit/b88cd1de628525ee0a6879d70ee330a8643d01c9))
- Sync disable state for uui-radio with uui-radio-group ([#393](https://github.com/umbraco/Umbraco.UI/issues/393)) ([1902987](https://github.com/umbraco/Umbraco.UI/commit/1902987c4f2eb17db539bc78faa0ff12aa52c926))
- Tabs not working in TabGroup ([91bf2a7](https://github.com/umbraco/Umbraco.UI/commit/91bf2a70b27c55ac284e5f910e08886afe3418cb))
- **test:** add general import to access all components ([5ebb5ef](https://github.com/umbraco/Umbraco.UI/commit/5ebb5ef4f0809a3f7b86631f6fa2616323459a0d))
- **test:** add missing test cases ([f1fa095](https://github.com/umbraco/Umbraco.UI/commit/f1fa095f8a15410a10fe3c02069dc8dff0225173))
- **test:** change type of lookup to querySelector ([d25bb2c](https://github.com/umbraco/Umbraco.UI/commit/d25bb2cf14d67a262dccbce439a640d5bd672bd0))
- **test:** remove a duplicate test ([c035de5](https://github.com/umbraco/Umbraco.UI/commit/c035de5f412243e4e74b8498abd10710c650765a))
- Use an ::after element for selection border ([#239](https://github.com/umbraco/Umbraco.UI/issues/239)) ([8a9d4f1](https://github.com/umbraco/Umbraco.UI/commit/8a9d4f11d49eb19af708d637ce20de2a50b7dcf6))
- use form control mixin in uui-button ([d8466d4](https://github.com/umbraco/Umbraco.UI/commit/d8466d4fe04e0bf52d3515e0d51d4368f6356314))
- uui-button-inline-create collides with storybook documentation for LabelMixin, and since it only uses the property for label we can just declare that directly on the component instead of inheriting ([5ce670c](https://github.com/umbraco/Umbraco.UI/commit/5ce670c8fe7b5e42130e0486b32c6e2ea64cc327))
- **uui-button:** adjust success and failed state styling ([#312](https://github.com/umbraco/Umbraco.UI/issues/312)) ([7634d19](https://github.com/umbraco/Umbraco.UI/commit/7634d19ff4a75215690f8479e40abf1af33c2b59))
- **uui-card-media:** replaced wrong css variables ([#300](https://github.com/umbraco/Umbraco.UI/issues/300)) ([ced7bdb](https://github.com/umbraco/Umbraco.UI/commit/ced7bdbcdc00865a860f79eeb4b874356dd0bcdb))
- **uui-card-media:** should render images correctly ([5c0ead3](https://github.com/umbraco/Umbraco.UI/commit/5c0ead364b674c54b853c98721d2606ae4642301))
- **uui-combobox:** fix focus issues ([#311](https://github.com/umbraco/Umbraco.UI/issues/311)) ([a71ac05](https://github.com/umbraco/Umbraco.UI/commit/a71ac0514ee44b57a63626abff3e8d8b6ff4b47b))
- **uui-combobox:** fix for small resolutions ([#327](https://github.com/umbraco/Umbraco.UI/issues/327)) ([0180ee2](https://github.com/umbraco/Umbraco.UI/commit/0180ee21e405e8609465a74dd2cdb2847696379f))
- **uui-inline-button-create:** ensure there is a border-color on horizontal ([#328](https://github.com/umbraco/Umbraco.UI/issues/328)) ([91ecd17](https://github.com/umbraco/Umbraco.UI/commit/91ecd178eb2e25ed07b277838d76e6f70e0b86a6))
- uui-input change aling-items to stretch ([#362](https://github.com/umbraco/Umbraco.UI/issues/362)) ([7d285b4](https://github.com/umbraco/Umbraco.UI/commit/7d285b4bff3e81d6b8a3c8bcac471a23bfff1752))
- uui-input-password sets spellcheck to false ([#339](https://github.com/umbraco/Umbraco.UI/issues/339)) ([160f3db](https://github.com/umbraco/Umbraco.UI/commit/160f3dba9cc435a44d664bcc55be965e326e8793))
- **uui-radio-button:** radio circle is malformed on multiple lines ([#298](https://github.com/umbraco/Umbraco.UI/issues/298)) ([e390365](https://github.com/umbraco/Umbraco.UI/commit/e39036511bf9afb5d5e7b15123ec85f23a0b6957))
- **uui-select:** :bug: sets the value to the value of selected option if present ([6ae94ee](https://github.com/umbraco/Umbraco.UI/commit/6ae94ee684abf78390110cba3d1298aa3f1c3d9c))
- uui-toggle change adjacent sibling combinator to general sibling ([cd2aaf6](https://github.com/umbraco/Umbraco.UI/commit/cd2aaf6b99f014ebd904976586da25de41786bcc))
- **uui:** add missing reference to uui-popover ([cbb74c6](https://github.com/umbraco/Umbraco.UI/commit/cbb74c6050a85241ac19e651a9eecfd6ecfe9c99)), closes [#194](https://github.com/umbraco/Umbraco.UI/issues/194)
- **uui:** change "import" to "export \*" ([d46e02a](https://github.com/umbraco/Umbraco.UI/commit/d46e02a7ec2c4558b775a3a22b8f6b743fb1375b))
- various issues of combobox and related ([#276](https://github.com/umbraco/Umbraco.UI/issues/276)) ([6b1ee6f](https://github.com/umbraco/Umbraco.UI/commit/6b1ee6f7dbf41b6a7ce7a2b0d698f3a836aa0450))
- vertical align content of UUI-Button anchor tag ([#254](https://github.com/umbraco/Umbraco.UI/issues/254)) ([319312c](https://github.com/umbraco/Umbraco.UI/commit/319312c0e7c6abe4083a44cf89cefe4dc1f40d8c))

- Release/0.1.1 (#190) ([d91d346](https://github.com/umbraco/Umbraco.UI/commit/d91d346a0659f52de2a3c4746065c554f95e6328)), closes [#190](https://github.com/umbraco/Umbraco.UI/issues/190) [#188](https://github.com/umbraco/Umbraco.UI/issues/188) [#187](https://github.com/umbraco/Umbraco.UI/issues/187) [#189](https://github.com/umbraco/Umbraco.UI/issues/189)

### Features

- add a query for the native element ([c7ed761](https://github.com/umbraco/Umbraco.UI/commit/c7ed761220ec627399b8b7b72a1ea46576ac291a))
- add demandCustomElement for all elements that require other uui-elements to render correctly ([#172](https://github.com/umbraco/Umbraco.UI/issues/172)) ([adb4f3b](https://github.com/umbraco/Umbraco.UI/commit/adb4f3b39db28a866267ab4290e64a91c1a8e9a0))
- add element names as property for custom child selectors to support custom elements ([55cc647](https://github.com/umbraco/Umbraco.UI/commit/55cc64756cb8f80637a3c1ffc865bcc10b58fe0e))
- add href attribute to uui-button & uui-tab ([9cda1f8](https://github.com/umbraco/Umbraco.UI/commit/9cda1f8530df0ddf6a9265b6bfafa35b8d9bf385))
- add more test cases to uui-select ([d46272d](https://github.com/umbraco/Umbraco.UI/commit/d46272d0cf841758aec54c9709db01bef8005cfe))
- add support for unknown breadcrumb items ([f588325](https://github.com/umbraco/Umbraco.UI/commit/f5883252e629b18d80325b89197a9bcdc76cb476))
- add support for unknown tab elements that extend the base class ([aca64f9](https://github.com/umbraco/Umbraco.UI/commit/aca64f9a7d09917cc4361c81de03d50e4d5f0482))
- add test for instanceOf ([9ba7430](https://github.com/umbraco/Umbraco.UI/commit/9ba7430839b09d7fb9c5194498dddccf40ee9048))
- added uui-combobox elements ([205ceee](https://github.com/umbraco/Umbraco.UI/commit/205ceeed5e08f644b9ebdc736b94943c45702689))
- Added uui-file-dropzone component ([47147f9](https://github.com/umbraco/Umbraco.UI/commit/47147f9a88431663601516bb3cd2080abce1549d))
- Added uui-file-preview component ([544b64e](https://github.com/umbraco/Umbraco.UI/commit/544b64e01c4560ef391ab368b845d8a6b7d84208))
- Added uui-input-file component ([2fbe6e0](https://github.com/umbraco/Umbraco.UI/commit/2fbe6e014c232b38eba7224b0d82c6d87c2dd376))
- Added uui-symbol-file-dropzone component ([0a6361d](https://github.com/umbraco/Umbraco.UI/commit/0a6361d7da75e3a58195c068f1105221e1c587ff))
- Added uui-symbol-file-thumbnail component ([51e0cb2](https://github.com/umbraco/Umbraco.UI/commit/51e0cb226f3cd915717d0a2a41e8cb73cc6c5045))
- **build:** Run eslint separately from the build to fail faster ([6f1871d](https://github.com/umbraco/Umbraco.UI/commit/6f1871d21ad9ddef807ad4954ba740fa82623653))
- **build:** update packages to esmodules and fix rollup import ([0980022](https://github.com/umbraco/Umbraco.UI/commit/0980022acd9fedc79b017f417d4c56d247d129e3))
- Button type removes null and adds undefined. ([2239de9](https://github.com/umbraco/Umbraco.UI/commit/2239de904f94d95c1a38aba534b9dbd243a8ffbf))
- change \_onInput method from private to protected ([#196](https://github.com/umbraco/Umbraco.UI/issues/196)) ([de26ed2](https://github.com/umbraco/Umbraco.UI/commit/de26ed2b3e4433d2de379c18f436ae8051ac3cec))
- change \_onInput method from private to protected ([#196](https://github.com/umbraco/Umbraco.UI/issues/196)) ([4b6cf65](https://github.com/umbraco/Umbraco.UI/commit/4b6cf657513c50c5cbfcdf8579d4673d0331dd47))
- **chore:** Upgrade Storybook from 6.4.8 to 6.4.14 ([07c6ac8](https://github.com/umbraco/Umbraco.UI/commit/07c6ac83ae17c17db3d2c46b39ecf3f18121b668))
- **eslint:** Ignore everything in the src folder ([8cab59f](https://github.com/umbraco/Umbraco.UI/commit/8cab59f2773ca60eba0b3217eb27218e36afd1da))
- Form elements submits the form on enter ([#288](https://github.com/umbraco/Umbraco.UI/issues/288)) ([a089cb1](https://github.com/umbraco/Umbraco.UI/commit/a089cb1ff0e288e9cb0f768c72a83a0c2c8c706e))
- new uui-color-\* components (color picker) ([#413](https://github.com/umbraco/Umbraco.UI/issues/413)) ([655ee88](https://github.com/umbraco/Umbraco.UI/commit/655ee88e538f7dfa4c47c7a23bb2bb9a9a2671fd))
- output classes with ecmascript standard definitions ([e786f56](https://github.com/umbraco/Umbraco.UI/commit/e786f56e8c54e775a23c49e2b9eb7d83e4387838))
- remove deprecation & allow unknowns ([afd3f67](https://github.com/umbraco/Umbraco.UI/commit/afd3f671022d4c795344a51eebff12952339549c))
- remove registration warning ([aca2ebf](https://github.com/umbraco/Umbraco.UI/commit/aca2ebfccc90cedc9895417ade08b18e639f2116))
- set onChange to protected to allow override of all callbacks ([3326ef8](https://github.com/umbraco/Umbraco.UI/commit/3326ef884d28ca4bbbb2a4d9920ecccadad03ab0))
- set onChange to protected to allow override of all callbacks ([eb5eed3](https://github.com/umbraco/Umbraco.UI/commit/eb5eed3ca11b1f005e95ef0847225e8650df4bab))
- **storybook:** add harness to menu-item to limit max-width of all stories ([6ee59aa](https://github.com/umbraco/Umbraco.UI/commit/6ee59aacc408e553705621bfc295a031aabe48ed))
- **storybook:** add story to explain item indentation using custom css prop ([fc6f018](https://github.com/umbraco/Umbraco.UI/commit/fc6f0184f3cd375b913a524471bc45574631e438))
- **storybook:** apply MenuItems array to all relevant stories to ensure same visual layout throughout all stories ([a6d5ffe](https://github.com/umbraco/Umbraco.UI/commit/a6d5ffe2e2bbb9a650ed4bcbd2a8b9f0570be59c))
- **storybook:** Update Storybook to latest ([c95ba6e](https://github.com/umbraco/Umbraco.UI/commit/c95ba6e4618fca0dee1b2ffb0a48aa0ac188f72e))
- support custom tabs by selecting on attributes instead of classes ([0df4cd4](https://github.com/umbraco/Umbraco.UI/commit/0df4cd48339d4e6a593fcf87b9a78c8c214db4a9))
- support custom tabs that do not necessarily extend from UUITab but still follows the interface ([9f99225](https://github.com/umbraco/Umbraco.UI/commit/9f992252561b0e339a841831366d2ae2af868f3c))
- **test:** add related tests for form validation to uui-select ([aa3ba9a](https://github.com/umbraco/Umbraco.UI/commit/aa3ba9ad17ab430f2849b7fcb26c8a8ebb1c94fc))
- update dependencies for build and lint processes ([718483d](https://github.com/umbraco/Umbraco.UI/commit/718483dfb24f98a529a805b2458c3d6bda58fd48))
- update minifyhtml ([15e6d1b](https://github.com/umbraco/Umbraco.UI/commit/15e6d1ba57b77490d8e3472e5d76bc3dbc2b41c3))
- upgrade element-internals-polyfill to 1.1.9 ([d1d312d](https://github.com/umbraco/Umbraco.UI/commit/d1d312d780c66e290e20d8f84066688f837d9673))
- upgrade lit from 2.2.2 to 2.2.5 ([b76d5c6](https://github.com/umbraco/Umbraco.UI/commit/b76d5c6e8d05c3b225e9145e95980c2727b5de94))
- upgrade typescript from 4.5 to 4.7 ([e6d3faf](https://github.com/umbraco/Umbraco.UI/commit/e6d3faf249aaf22274ff85af8d20859c951cb68c))
- **uui-combobox:** add requirement for uui-popover ([447f15f](https://github.com/umbraco/Umbraco.UI/commit/447f15ffde2c7e2bebaaab74024ea6769093a9ca))
- **uui-input-file:** Only show add button when multiple or no file selected ([#395](https://github.com/umbraco/Umbraco.UI/issues/395)) ([61e6716](https://github.com/umbraco/Umbraco.UI/commit/61e67162e1a0177816e0f13b4d102a0c18b93890))
- uui-select extends from FormControlMixin instead of defining its own methods ([b4b9bc9](https://github.com/umbraco/Umbraco.UI/commit/b4b9bc90413f4ae1688551f2a60771b464f269ca))
- **uui:** set uui to esmodule ([3ce3f75](https://github.com/umbraco/Umbraco.UI/commit/3ce3f754b7d086529c0207b55b3187ebc4a11b82))

### Reverts

- Revert "build(deps-dev): bump rimraf -g from 3.0.2 to 4.1.2" ([1516f6a](https://github.com/umbraco/Umbraco.UI/commit/1516f6a37961635edb7ae95597a8e435700ab464))
- Revert "try to optimise chromatic by not customising the name of build-storybook" ([73548dd](https://github.com/umbraco/Umbraco.UI/commit/73548ddd03416f8b418100e82d69276656b379ca))
- Revert "added missing properties to the list and added docs" ([92d8e22](https://github.com/umbraco/Umbraco.UI/commit/92d8e22d32b4bc2978303ea0376c1556bb61e6db))
- Revert "see if turbo works without cache" ([fb58473](https://github.com/umbraco/Umbraco.UI/commit/fb584737582ee047261707a87c9bf0d48e12a882))
- Revert "internal: upgrade esbuild + deps" ([ab7f3f7](https://github.com/umbraco/Umbraco.UI/commit/ab7f3f7c8b1b9f3be436abd92898b5816fc19f75))
- Revert "TEST - change color" ([3eda269](https://github.com/umbraco/Umbraco.UI/commit/3eda2694ddecdf12854661187a60edb1aa2fd7ce))
- Revert "TEST - unset border-radius" ([f9e959a](https://github.com/umbraco/Umbraco.UI/commit/f9e959abccc793199fa933c1350001a1128aada4))
- Revert "Remove uui-css.css" ([0114f1f](https://github.com/umbraco/Umbraco.UI/commit/0114f1fdf9fce9255fd405bb0b5f4b0cf3ced458))
- Revert "Move assets to lib since they are now being inlined" ([0df44b5](https://github.com/umbraco/Umbraco.UI/commit/0df44b54efe3aea6f1ef0fe23711665626f14dd8))
- Revert "Update sleep duration for tests in order not to exceed test limit and to better test autoclose functionality" ([6294014](https://github.com/umbraco/Umbraco.UI/commit/62940141b812ac58b0a0c0b4782810e2e7d46a24))
- Revert "Update container tests for event types and timers to match the notification container component" ([ce318be](https://github.com/umbraco/Umbraco.UI/commit/ce318be713b9cd426439021ad773b0cebbb21062))
- Revert "remove unnecessary hide-validation feature" ([082cfeb](https://github.com/umbraco/Umbraco.UI/commit/082cfeb4af9c86d9ece0b470bf14029095091ded))
- Revert "Publish" ([3d183a4](https://github.com/umbraco/Umbraco.UI/commit/3d183a47c927dd55b2ebabface68a9e28b5b68f9))
- Revert "Publish" ([571707b](https://github.com/umbraco/Umbraco.UI/commit/571707b120b4afb65528851974482c41f4b35d41))
- Revert "remove hardcoded fallback value" ([ac13b0f](https://github.com/umbraco/Umbraco.UI/commit/ac13b0f5e285a4d13bf37fd753db8586037831be))
- Revert "re-structure components grouping" ([ffe1b93](https://github.com/umbraco/Umbraco.UI/commit/ffe1b93905a5f45d31358921c122d84dd20b4f01))
- Revert "fix missing type and event class" ([4c0ae77](https://github.com/umbraco/Umbraco.UI/commit/4c0ae77dc204942870e7df2c7164587f7024d6ac))

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

- This should now be configured globally
