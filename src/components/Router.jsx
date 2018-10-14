import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LectureContainer from './Lecture/LectureContainer';
import IndexContainer from './Index/IndexContainer';
import AccountContainer from './Account/AccountContainer';

const Router = () => (
  <Switch>
    <Route exact path="/" component={IndexContainer} />
    <Route exact path="/slides/:id" component={LectureContainer} />
    <Route exact path="/account" component={AccountContainer} />
    {/* TODO <Route component={404}/> */}
  </Switch>
);


export default Router;
