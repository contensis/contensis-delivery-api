# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- entries api: use POST based searches if the browser is IE and the url length is greater than 2083.
- entries api: new distanceWithin operator for location based searches.

## [1.1.0-beta.6] 2019-03-26
### Added
- entries api: changed the request type from POST to GET for searches.

## [1.1.0-beta.5] 2019-03-26
### Changed
- nodes api: enhanced api error processing.
- upgraded packages that had vulnerabilities.

## [1.1.0-beta.2] 2019-03-25
### Added
- nodes api: optional response handler for api errors.

## [1.1.0-beta.1] 2019-03-25
### Changed
- nodes api: if the requested node or nodes are not found we return a null object.

## [1.1.0-beta.0] 2019-03-20
### Added
- nodes api implementation.
- client side validation for node api.
- node api unit tests.
- support for reverse proxy scenarios in a browser context.

### Changed
- added bundle-es2015 folder to source control.
- Upgraded package locking file.
- removed interfaces.ts and replaced it with models folder.
- corrected default parameters processing.
- stopped setting the default language to en-GB.

## [1.0.1] - 2019-03-05
### Changed
- Corrected author information and created the changelog.

## [1.0.0] - 2019-02-28
### Added
- Created this repo from the develop branch of [api-delivery-js](https://github.com/contensis/api-delivery-js) repo.
- Published the first npm package.