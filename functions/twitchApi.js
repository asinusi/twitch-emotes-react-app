'use strict';
const axios = require('axios');
const tokenCache = require('./tokenCache.js');

module.exports = class twitchApi {
    constructor(id, secret) {
        this.clientId = id;
        this.tokenCache = new tokenCache(id, secret);
    }
    getChannelEmotes(channel) {
        return this.tokenCache.getToken().then(tokenData => {
            const { token } = tokenData;
            return this.getChannel(channel, token).then(channelData => {
                //Check if the channel exists
                if (channelData === undefined) {
                    return {
                        "error": "Bad Request",
                        "status": 400,
                        "message": "Invalid login names, emails or IDs in request"
                    };
                }
                //Pull out the channel id so we can query the emotes
                const { id } = channelData;
                return axios.get(`https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${id}`,
                {
                    headers: this.#getHeaders(token)
                }).then(response => {
                    return {
                        display_name: channelData['display_name'],
                        profile_image_url: channelData['profile_image_url'],
                        emote_data: response.data
                    };
                }).catch(error => {
                    throw error;
                })
            });
        });
    }
    getGlobalEmotes() {
        return this.tokenCache.getToken().then(tokenData => {
            const { token } = tokenData;
            return axios.get('https://api.twitch.tv/helix/chat/emotes/global',
            {
                headers: this.#getHeaders(token)
            }).then(response => {
                return {
                    emote_data: response.data
                };
            }).catch(error => {
                throw error
            })
        });
    }
    getChannel(channel, token) {
        return axios.get(`https://api.twitch.tv/helix/users?login=${channel}`,
        {
            headers: this.#getHeaders(token)
        }).then(response => {
            return response.data.data[0];
        }).catch((error) => {
            throw error;
        });
    }
    #getHeaders(token) {
        return {            
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Client-Id': this.clientId,
        };
    }
}