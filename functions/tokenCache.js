'use strict';
const axios = require('axios');
const tokenBeforeTime = 5 * 60 * 1000;     // 5 min in ms

module.exports = class tokenCache {
    constructor(id, secret) {
        this.url = "https://id.twitch.tv/oauth2/token?client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>&grant_type=client_credentials"
        .replace('<CLIENT_ID>', id)
        .replace('<CLIENT_SECRET>', secret);
        this.tokenPromise = null;
        this.timer = null;
        // go get the first token
        this._getNewToken().catch(err => {
            //TODO: log this to the server
            throw err;
        });
    }
    getToken() {
        if (this.tokenPromise) {
            return this.tokenPromise.then(tokenData => {
                if (tokenData.expires < Date.now()) {
                    return this._getNewToken();
                } else {
                    return tokenData;
                }
            });
        } else {
            return this._getNewToken();
        }
    }

    // non-public method for getting a new token
    _getNewToken() {
        this.tokenPromise = axios.post(this.url).then(response => {
            const token = response.data;
            const tokenExpiration = token['expires_in']; // Usually 7 days
            // make resolve value be an object that contains the token and the expiration
            // set timer to get a new token automatically right before expiration
            this._scheduleTokenRefresh(tokenExpiration - tokenBeforeTime);
            return {
                token: token['access_token'],
                expires: Date.now() + tokenExpiration,
            }
        }).catch(err => {
            // clear the cached promise, log the error, keep the promise rejected
            this.tokenPromise = null;
            throw err;
        });
        
        return this.tokenPromise;
    }
    // schedule a call to refresh the token before it expires
    _scheduleTokenRefresh(t) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this._getNewToken().catch(err => {
                //TODO: log this to the server
                throw err;
            });
            this.timer = null;
        }, t);
    }
}