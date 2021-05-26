# [0.3.0](https://github.com/olegkuibar/ng-input-range/compare/v0.2.0...v0.3.0) (2021-04-18)


### Features

* enable form-field coloring in example ([47966fc](https://github.com/olegkuibar/ng-input-range/commit/47966fca3a96aa3fc349987da8b5ce40968368a4))

# [0.2.0](https://github.com/olegkuibar/ng-input-range/compare/v0.1.3...v0.2.0) (2021-04-18)


### Bug Fixes

* add missing theme scss mixin ([777a87d](https://github.com/olegkuibar/ng-input-range/commit/777a87d98cdbe0639e34b55c9b8a5eae5e22a855))
* **lib:** fix path for the NgInputRangeModule in test ([33e9c88](https://github.com/olegkuibar/ng-input-range/commit/33e9c88b3ebec9510e4b81988eebe5a0be957457))
* **project:** fix typo in "build:demo" script ([c0ed448](https://github.com/olegkuibar/ng-input-range/commit/c0ed448ecdaa664249006ca781394d2461298d7f))
* **showcase:** fix build -> update path to NgInputRangeComponent ([87980d8](https://github.com/olegkuibar/ng-input-range/commit/87980d8c35bbab02404e384baf9b69eea45fc7d3))


### Features

* **lib:** update material coloring ([e70c165](https://github.com/olegkuibar/ng-input-range/commit/e70c165e25fce9dafdee498543853d3da2d0a0ae))

# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [0.1.5] - 2021-04-18

[comment]: <> (Here we write upgrading notes for brands. It's a team effort to make them as)
[comment]: <> (straightforward as possible.)

### Added
- Add `scss-bundle` package
- Add component theming mixin bundling to the library

### Change
- Update README.md
  - Added demo links
  - Added example of usage with Material Theming
- Upgrade to Angular v11.2

### Fixed
- Fix component material mixin was not accessible for import
- Fix material theming was not applied to a component

## [0.1.2] - 2020-01-17

### Added
- MINOR Add option to switch between themes

### Change
- MINOR Update README.md

### Fixed
- PATCH Fix input not being focused
- PATCH Angular Material theming not working with component
- PATCH "Value" setting field was not updating `FormControl`
- PATCH "Step" setting field was not bind to the examples
