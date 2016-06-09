import Login from '../modules/accounts/Login.jsx';
import Fatty from '../modules/dashboard/Fatty.jsx';
import Chat from '../modules/chat/Chat.jsx';
import Log from '../modules/log/Log.jsx';
import Profile from '../modules/profile/Profile.jsx';
import NotFound from '../modules/shared/NotFound.jsx';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/fatty',
    component: Fatty
  },
  {
    path: '/chat',
    component: Chat
  },
  {
    path: '/log',
    component: Log
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
