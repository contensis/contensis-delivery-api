export function setDefaultSpyForAccessToken(global, returnValueForApi) {
    if (!returnValueForApi) {
        returnValueForApi = {
            items: []
        };
    }
    spyOn(global, 'fetch').and.callFake((...args) => {
        return new Promise((resolve, reject) => {
            resolve({
                ok: true,
                json: () => {
                    return returnValueForApi;
                },
                text: () => {
                    return JSON.stringify(returnValueForApi);
                }
            });
        });
    });
}
export function setDefaultSpyForClientCredentials(global, returnValueForApi, rejectRequest) {
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
