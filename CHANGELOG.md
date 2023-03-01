# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2023-02-22
### Added
- added suport to authenticate with client credentials

## [1.2.1] - 2023-01-20
### Added
- thumbnails added thumbnail to entry definition

## [1.2.0] - 2022-06-08
### Changes
-  entries: changed *entries.search* to use either a *string*, a *Query* or a *ZenqlQuery* type

## [1.1.9] - 2022-04-14
### Changes
- *Entry.sys* property is now a *Partial*
- updated optional and required fields for *EntrySys* class

## [1.1.8] - 2021-10-15
### Added
- added aditional parameters to *freeText* 
## [1.1.7] - 2021-03-12
### Changed
- updated reference to contensis-core-api

## [1.1.6] - 2020-12-17
### Changed
- updated README file to reflect supported Contensis versions;

## [1.1.5] - 2020-11-04
### Changed
- corrected EntrySys definition, created general release;

## [1.1.5-rc.1] - 2020-09-01
### Changed
- updated to use the latest contensis-core-api that supports extended response handler behaviour;

## [1.1.5-beta.3] - 2020-05-26
### Changed
- use cross-fetch to make configuration identical between browser and Node.js
- the fetch function can now be injected to support better testing

## [1.1.5-beta.2] - 2020-05-21
### Changed
- updated contensis-core-api;
### Removed
- moved search query classes and interfaces to contensis-core-api

## [1.1.5-beta.1] - 2020-04-09
### Added
- additional EntrySys properties;

## [1.1.5-beta.0] - 2019-12-13
### Added
- moved code to contensis-core-api; 
- support for default headers;

### Removed
 - polyfills for IE < 11

## [1.1.4] - 2019-12-12
### Added
-  nodes api: Node has a includeInMenu property;

## [1.1.3] - 2019-10-17
### Added
-  nodes api: NodeGetByPathOptions has a new allowPartialMatch parameter
## [1.1.2] - 2019-09-11
### Changed
-  changed the browser build to use fetch.min.js .

## [1.1.1] - 2019-09-03
### Changed
-  changed taxonomy default order to be alphabetical.

## [1.1.0] - 2019-07-15
### Changed
- restored promise support on IE 11.
- upgraded packages that had vulnerabilities.

## [1.1.0-beta.7] - 2019-04-28
### Added
- entries api: use POST based searches if the browser is IE and the url length is greater than 2083.
- entries api: new distanceWithin operator for location based searches.

## [1.1.0-beta.6] - 2019-03-26
### Added
- entries api: changed the request type from POST to GET for searches.

## [1.1.0-beta.5] - 2019-03-26
### Changed
- nodes api: enhanced api error processing.
- upgraded packages that had vulnerabilities.

## [1.1.0-beta.2] - 2019-03-25
### Added
- nodes api: optional response handler for api errors.

## [1.1.0-beta.1] - 2019-03-25
### Changed
- nodes api: if the requested node or nodes are not found we return a null object.

## [1.1.0-beta.0] - 2019-03-20
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