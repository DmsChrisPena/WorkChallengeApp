import React, {Component} from 'react';
import { browserHistory } from 'react-router';

class Chat extends Component {

	componentWillMount() {
		if(!Meteor.userId()) {
			browserHistory.push('/');
		}     
	}

	render() {
		return (
			<div>
				Chat Page
			</div>
		);
	}
}

export default Chat;