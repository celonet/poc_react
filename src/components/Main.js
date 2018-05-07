import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CardBox from './Cards/CardBox';
import DetailBox from './Details/DetailBox';

const Main = () => (
  <main style={{padding: 10}}>
    <Switch>
      <Route exact path='/' component={CardBox}/>
      <Route path='/Pokemon/:number' component={DetailBox} />
    </Switch>
  </main>
)

export default Main
