import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Search from './components/Search';
import Categories from './components/Categories';
import Series from './components/Series';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/search' component={Search} />
        <Route path='/categories' component={Categories}/>
        <Route path='/series' component={Series}/>
      </Layout>
    );
  }
}
