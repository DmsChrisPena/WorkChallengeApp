import React from 'react';
import Footer from './Footer.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
  },
});

export default class MainLayout extends React.Component {
  render() {
  	const isLoggedIn = Meteor.userId();
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
        	<main>{this.props.children}</main>
        </MuiThemeProvider>

        {isLoggedIn ? 
        	<MuiThemeProvider muiTheme={muiTheme}>
        		<Footer />
        	</MuiThemeProvider> 
        : null}
      </div>
    );
  }
}
