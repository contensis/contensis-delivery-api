# contensis-delivery-api [![NPM version](https://img.shields.io/npm/v/contensis-delivery-api.svg?style=flat)](https://www.npmjs.com/package/contensis-delivery-api)
Contensis JavaScript Delivery API implementation written in TypeScript.

This allows the querying and retrieval of entries, content types and projects in JavaScript.

It can be used in any ES5 compatible project.
* JavaScript/TypeScript code running in a browser
* JavaScript/TypeScript code running in Node.js
* Angular
* React
* React Native
* NativeScript
* Express

The *examples* folder contains Express, React and Angular test applications.

## Installation

The Contensis JavaScript Delivery API can be installed using npm.

**npm install contensis-delivery-api**

## Contensis support
This version supports the current Contensis beta release ( > 11.3). For Contensis 11.3 support use [this version](https://github.com/contensis/contensis-delivery-api/tree/release/1.0) .

## Examples

Using ES2015 async/await

```js
import { Client } from 'contensis-delivery-api';

let contensisConfig = { 
	rootUrl: 'https://my-cms.com',
	accessToken: 'MY_DELIVERY_API_ACCESS_TOKEN',
	projectId: 'MY_PROJECT_ID',
	language: 'en-GB',
	versionStatus: 'published',
	pageSize: 50
};

async function loadMovies() {
	let client = Client.create(contensisConfig);
	let movieList = await client.entries.list({
		contentTypeId: 'movie',
		pageOptions: { pageIndex: 0, pageSize: 10 },
		orderBy: ['-releaseDate']
	});
	console.log(movieList.items);
}

loadMovies();
```

Using Promises
```js
import { Client } from 'contensis-delivery-api';

let contensisConfig = { 
	rootUrl: 'https://my-cms.com',
	accessToken: 'MY_DELIVERY_API_ACCESS_TOKEN',
	projectId: 'MY_PROJECT_ID',
	language: 'en-GB',
	versionStatus: 'published',
	pageSize: 50
};

function loadMovies() {
	let client = Client.create(contensisConfig);
	client.entries.list({
		contentTypeId: 'movie',
		pageOptions: { pageIndex: 0, pageSize: 10 },
		orderBy: ['-releaseDate']
	}).then(movieList => {
		console.log(movieList.items);
	});
}

loadMovies();
```

## Documentation

Read our [documentation on the Contensis Javascript Delivery API](https://developer.zengenti.com/contensis/api/delivery/js/) to learn of all it's features.

## Browser support
This library relies on the *fetch API* being available at runtime. In modern browsers *fetch* is available natively, and a polyfill is provided for older browsers. 
The library build that targets browsers can be found in the *bundle* folder.

## Node.js support
The library supports Node.js 8 and above.  
When using this library in Node.js you need to add the *node-fetch* npm package as a dependecy and ensure *fetch* is registered as a global function:
```js
global.fetch = require("node-fetch");
```
