import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/UI/Layout';

import { Home } from './components/Routes/Home';
import { Channels } from './components/Routes/Channels';
import { About } from './components/Routes/About';

// import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Routes>        
          <Route exact path='/' element={<Home />} />
          <Route exact path='/channels' element={<Channels />} />
          <Route exact path='/about' element={<About />} />    
        </Routes>
    </Layout>
    );
  }
}