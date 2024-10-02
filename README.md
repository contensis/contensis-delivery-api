# contensis-delivery-api [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)]() [![NPM version](https://img.shields.io/npm/v/contensis-delivery-api.svg?style=flat)](https://www.npmjs.com/package/contensis-delivery-api)

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]()

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/) [![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)](https://electronjs.org/) [![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/) [![Vue.js](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)

[![Contensis](https://img.shields.io/badge/Contensis-00304d?style=for-the-badge)](https://www.contensis.com)
[![Contensis Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://contensis.slack.com)

Create a Contensis client that allows you to query and retrieve entries, site view nodes, content types and projects. It can be used in all your JavaScript / TypeScript projects, whether it runs in a browser, Node.js app, or both.

Read our documentation on [contensis.com](https://www.contensis.com/help-and-docs/apis/management-js) and there is a [contensis-delivery-api-examples](https://github.com/contensis/contensis-delivery-api-examples) repo containing Express, React and Angular test applications, as well as an extended example using nodes api in a Node.js project.

Use with Contensis version 12.0 and above. For Contensis 11.3 support use [this version](https://github.com/contensis/contensis-delivery-api/tree/release/1.0) | [npm](https://www.npmjs.com/package/contensis-delivery-api/v/1.0.0). This library requires Node.js 8 or above.

# Installation

Install the package to your project `dependencies` using npm, or your preferred Node.js package manager.

```shell
npm install --save contensis-delivery-api
```

# Usage

Follow the examples with the preferred coding style that best suits your project

## Create a client

All of the delivery methods are available under the `client` instance returned by `Client.create(...)`

Use the provided intellisense to guide you where it is available

```typescript
// Using TypeScript, or ES Module syntax

import { Client } from "contensis-delivery-api";

const client = Client.create({
  rootUrl: "https://my-cms.com",
  accessToken: "DELIVERY_API_ACCESS_TOKEN",
  projectId: "website",
  language: "en-GB",
  versionStatus: "published",
});
```

```cjs
// Using Common JS syntax

const Client = require("contensis-delivery-api").Client;

const client = Client.create({
  rootUrl: "https://my-cms.com",
  accessToken: "DELIVERY_API_ACCESS_TOKEN",
  projectId: "website",
  language: "en-GB",
  versionStatus: "published",
});
```

## Get a list of entries

Reusing the `client` instance we created above

```typescript
// Using TypeScript, or ES Module syntax

const loadMovies = async () => {
  const movieList = await client.entries.list({
    contentTypeId: "movie",
    pageOptions: { pageIndex: 0, pageSize: 10 },
    order: ["-releaseDate"],
  });
  for (const movie of movieList.items) {
    console.log(movie);
  }
};

loadMovies();
```

## Create a client config and get a list of entries

Keep a common client configuration and create the delivery client when you need it

```typescript
// Using TypeScript with imported typing

import { Client, Config } from "contensis-delivery-api";

const contensisConfig: Config = {
  rootUrl: "https://my-cms.com",
  accessToken: "DELIVERY_API_ACCESS_TOKEN",
  projectId: "website",
  language: "en-GB",
  versionStatus: "published",
};

const loadMovies = async () => {
  const client = Client.create(contensisConfig);
  const movieList = await client.entries.list({
    contentTypeId: "movie",
    pageOptions: { pageIndex: 0, pageSize: 10 },
    order: ["-releaseDate"],
  });
  for (const movie of movieList.items) {
    console.log(movie);
  }
};

loadMovies();
```

```mjs
// Using async / await syntax in JavaScript (avoiding callbacks)

import { Client } from "contensis-delivery-api";

const contensisConfig = {
  rootUrl: "https://my-cms.com",
  accessToken: "DELIVERY_API_ACCESS_TOKEN",
  projectId: "website",
  language: "en-GB",
  versionStatus: "published",
};

async function loadMovies() {
  const client = Client.create(contensisConfig);
  const movieList = await client.entries.list({
    contentTypeId: "movie",
    pageOptions: { pageIndex: 0, pageSize: 10 },
    order: ["-releaseDate"],
  });
  console.log(movieList.items);
}

loadMovies();
```

```typescript
// Using Promises and callbacks

import { Client } from "contensis-delivery-api";

const contensisConfig = {
  rootUrl: "https://my-cms.com",
  accessToken: "DELIVERY_API_ACCESS_TOKEN",
  projectId: "website",
  language: "en-GB",
  versionStatus: "published",
};

function loadMovies() {
  const client = Client.create(contensisConfig);
  client.entries
    .list({
      contentTypeId: "movie",
      pageOptions: { pageIndex: 0, pageSize: 10 },
      order: ["-releaseDate"],
    })
    .then((movieList) => {
      console.log(movieList.items);
    });
}

loadMovies();
```

# Fetch API

This library uses the `fetch` API and relies on it being available at runtime.

## Browser support

In modern browsers `fetch` is available natively, a polyfill is provided for older browsers.

The build of the library that targets browsers can be found in the `bundle` folder.

## Node.js support

When using this library in Node.js the `fetch` API is already polyfilled with [`cross-fetch`](https://www.npmjs.com/package/cross-fetch) package (which uses [`node-fetch`](https://www.npmjs.com/package/node-fetch) when used with a Node.js runtime).

Node.js [version 16](https://nodejs.org/docs/latest-v16.x/api/globals.html#fetch) introduced experimental support for a native global `fetch` API and shipped as standard with Node.js versions [18](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch) and [20](https://nodejs.org/docs/latest-v20.x/api/globals.html#fetch). The global `fetch` support in Node.js [version 21](https://nodejs.org/docs/latest-v21.x/api/globals.html#fetch) and greater is marked as stable.

## Use your own fetch

You can override the built-in fetch API by providing your own `fetchFn` method when creating the Client.

Method calls that require fetch invoked from this client instance will be made using your chosen API.

```typescript
import { Client } from "contensis-delivery-api";
import enterpriseFetch from "enterprise-fetch";

const client = Client.create({
  rootUrl: "https://my-cms.com",
  accessToken: "DELIVERY_API_ACCESS_TOKEN",
  projectId: "website",
  language: "en-GB",
  versionStatus: "published",
  fetchFn: enterpriseFetch,
});
```

