import React, { Component } from 'react';

export class Footer extends Component {
    render() {
        return (
            <footer className="container">
                <hr className="my-4"></hr>
                <p>Emote and badge images are property of Twitch Interactive or their respective owners. Do not reuse without obtaining their permission.</p>
                <p>This is my personal project created for fun and is not affiliated with Twitch.</p>
            </footer>
        );
    }
}