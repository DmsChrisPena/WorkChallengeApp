import React, {Component} from 'react';
import { browserHistory } from 'react-router';

class Log extends Component {

	componentWillMount() {
		if(!Meteor.userId()) {
			browserHistory.push('/');
		}     
	}

	render() {
		return (
			<div>
				Log Page
			</div>
		);
	}
}

export default Log;