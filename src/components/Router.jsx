import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LectureContainer from './Lecture/LectureContainer';
import IndexContainer from './Index/IndexContainer';

const Router = () => (
  <Switch>
    <Route exact path="/" component={IndexContainer} />
    <Route exact path="/slides/:title" component={LectureContainer} />
    {/* TODO <Route component={404}/> */}
  </Switch>
);


export default Router;
