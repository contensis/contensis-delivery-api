"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultRootUrl = 'http://my-website.com/';
function getDefaultAuthenticateUrl(isRelative = false) {
    let authenticatePath = 'authenticate/connect/token';
    if (isRelative) {
        return '/' + authenticatePath;
    }
    return defaultRootUrl + authenticatePath;
}
exports.getDefaultAuthenticateUrl = getDefaultAuthenticateUrl;
function setDefaultSpyForAccessToken(global, returnValueForApi) {
    if (!returnValueForApi) {
        returnValueForApi = {
            items: []
        };
    }
    spyOn(global, 'fetch').and.callFake((...args) => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: true,
                json: () => Promise.resolve(returnValueForApi),
                text: () => Promise.resolve(JSON.stringify(returnValueForApi))
            });
        });
    });
}
exports.setDefaultSpyForAccessToken = setDefaultSpyForAccessToken;
function setDefaultSpyForClientCredentials(global, returnValueForApi, rejectRequest) {
    spyOn(global, 'fetch').and.returnValues(new Promise((resolve, reject) => {
        const returnValueForAuthenticate = {
            access_token: 'ZZZZZZ'
        };
        resolve({
            ok: true,
            json: () => Promise.resolve(returnValueForAuthenticate),
            text: () => Promise.resolve(JSON.stringify(returnValueForAuthenticate))
        });
    }), new Promise((resolve, reject) => {
        if (rejectRequest === true) {
            reject();
        }
        else {
            resolve({
                ok: true,
                json: () => Promise.resolve(returnValueForApi),
                text: () => Promise.resolve(JSON.stringify(returnValueForApi))
            });
        }
    }));
}
exports.setDefaultSpyForClientCredentials = setDefaultSpyForClientCredentials;
function getDefaultFetchRequestForAccessToken(method, contentType, isRelativeUrl, body) {
    if (!contentType) {
        contentType = 'application/json';
    }
    let request = Object({
        method: !method ? 'GET' : method,
        mode: 'cors',
        headers: {
            accessToken: 'XXXXXX',
            Accept: 'application/json',
            'Content-Type': method === 'PATCH' ? 'application/merge-patch+json; charset=utf-8' : contentType
        }
    });
    if (!!isRelativeUrl) {
        delete request.mode;
    }
    if (!!body) {
        request.body = body;
    }
    return request;
}
exports.getDefaultFetchRequestForAccessToken = getDefaultFetchRequestForAccessToken;
function getDefaultFetchRequestForClientCredentials(method, isRelativeUrl, body) {
    let request = Object({
        method: !method ? 'GET' : method,
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ZZZZZZ',
            Accept: 'application/json',
            'Content-Type': method === 'PATCH' ? 'application/merge-patch+json; charset=utf-8' : 'application/json'
        }
    });
    if (!!isRelativeUrl) {
        delete request.mode;
    }
    if (!!body) {
        request.body = body;
    }
    return request;
}
exports.getDefaultFetchRequestForClientCredentials = getDefaultFetchRequestForClientCredentials;
function getDefaultConfigForAccessToken(versionStatus) {
    if (!versionStatus) {
        versionStatus = 'published';
    }
    return {
        projectId: 'myProject',
        rootUrl: defaultRootUrl,
        language: 'en-US',
        versionStatus,
        accessToken: 'XXXXXX'
    };
}
exports.getDefaultConfigForAccessToken = getDefaultConfigForAccessToken;
function getDefaultConfigForClientCredentials() {
    return {
        projectId: 'myProject',
        rootUrl: defaultRootUrl,
        language: 'en-US',
        versionStatus: 'published',
        clientType: 'client_credentials',
        clientDetails: {
            clientId: 'XXXXXX',
            clientSecret: 'YYYYYY'
        }
    };
}
exports.getDefaultConfigForClientCredentials = getDefaultConfigForClientCredentials;
