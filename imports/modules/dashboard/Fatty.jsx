import React, {Component} from 'react';
import { browserHistory } from 'react-router';
class Fatty extends Component {

	componentWillMount() {
		if(!Meteor.userId()) {
			browserHistory.push('/');
		}     
	}

	render() {
		return (
			<div>
				Fatty Page
			</div>
		);
	}
}

export default Fatty;