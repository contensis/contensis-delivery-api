import { VersionStatus } from 'contensis-core-api';
import { Config } from './models';

const defaultRootUrl = 'http://my-website.com/';


export function getDefaultAuthenticateUrl(isRelative: boolean = false): string {
    let authenticatePath = 'authenticate/connect/token';
    if (isRelative) {
        return '/' + authenticatePath;
    }
    return defaultRootUrl + authenticatePath;
}

export function setDefaultSpyForAccessToken(global: any, returnValueForApi?: any): void {
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

export function setDefaultSpyForClientCredentials(global: any, returnValueForApi: any, rejectRequest?: boolean): void {
    spyOn(global, 'fetch').and.returnValues(
        new Promise((resolve, reject) => {
            const returnValueForAuthenticate = {
                access_token: 'ZZZZZZ'
            };
            resolve({
                ok: true,
                json: () => Promise.resolve(returnValueForAuthenticate),
                text: () => Promise.resolve(JSON.stringify(returnValueForAuthenticate))
            } as any);
        }),
        new Promise((resolve, reject) => {
            if (rejectRequest === true) {
                reject();
            } else {

                resolve({
                    ok: true,
                    json: () => Promise.resolve(returnValueForApi),
                    text: () => Promise.resolve(JSON.stringify(returnValueForApi))
                } as any);
            }
        })
    );
}


export function getDefaultFetchRequestForAccessToken(method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE', contentType?: string, isRelativeUrl?: boolean, body?: string): Object {
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

export function getDefaultFetchRequestForClientCredentials(method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE', isRelativeUrl?: boolean, body?: string): Object {
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


export function getDefaultConfigForAccessToken(versionStatus?: VersionStatus): Config {
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

export function getDefaultConfigForClientCredentials(): Config {
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
