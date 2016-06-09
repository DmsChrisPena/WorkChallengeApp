import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { createHistory, useBasename } from 'history';

import routes from '../../router/routes.js';
import MainLayout from '../../modules/shared/MainLayout.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const rootRoute = {
  component: MainLayout,
  childRoutes: routes,
};

Meteor.startup(() => {
  ReactDOM.render(
    <Router history={browserHistory} routes={rootRoute} />,
    document.getElementById('app')
  );
});
