import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import Api from '../../api/api.js';

class Profile extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	userId: Meteor.userId(),
	  	profileState: 'viewing'
	  };
	}

	componentWillMount() {
		if(!Meteor.userId()) {
			browserHistory.push('/');
		}
	}

	render() {
		const { user, weightLog } = this.props;
		let loading = true;
		if(user !== undefined) {
			loading = false;
		}
		console.log(this);
		return (
			<div>
				{loading ? 
				<div>
					<p>Profile Page</p>
					<p>Username: {user ? user.username : 'loading...'}</p>
					{this.state.profileState === 'viewing' ? <p onClick={()=>{this.setState({profileState: 'editing'})}}>Start Weight: { user ? `${user.profile.startWeight} lbs` : null }</p> :

					<form onSubmit={this.changeStartWeight.bind(this)}>
						<input ref='startWeight' placeholder='enter start weight...' />
						<button type='submit'>Add Start Weight</button>
					</form> }				
					<form onSubmit={this.addWeightLog.bind(this)}>
						<input ref='weight' placeholder='enter weight...' />
						<button type='submit'>Add Weight</button>
					</form>
					<div>
						{weightLog.length > 0 ? weightLog.map((entry, i) => {
							return (
								<div key={i} style={{border: '1px solid black'}}>
									<p>{entry.username} - {entry.weight}lbs</p>
									<p>{moment(entry.createdAt).format('MMM Do YYYY, h:mm:ss a')}</p>
								</div>
							);
						}) : null}
					</div>
				</div>
				:
					<form onSubmit={this.setUpProfile.bind(this)}>
						<input ref='picture' placeholder='enter weight...' />
						<input ref='bio' placeholder='enter weight...' />
						<input ref='startWeight' placeholder='enter weight...' />
						<input ref='goalWeight' placeholder='enter weight...' />
						<button type='submit'>Create Profile</button>
					</form> 
				}
			</div>
		);
	}

	setUpProfile(event) {
		event.preventDefault();
		const { bio, goalWeight, picture, startWeight } = this.refs;

		let profile = {
			bio: bio.value,
			goalWeight: goalWeight.value,
			picture: picture.value,
			startWeight: startWeight.value,
			isCompleted: true
		};

		Meteor.users.update({_id: Meteor.userId()}, { $set: { profile } } );
	}

	changeStartWeight(event) {
		event.preventDefault();
		let { startWeight } = this.refs;
		Meteor.users.update({_id: Meteor.userId()}, { $set: { profile: { startWeight: startWeight.value } } } );

		startWeight.value = '';
		this.setState({profileState: 'viewing'});
	}

	addWeightLog(event) {
		event.preventDefault();
		let { weight } = this.refs;

		Api.WeightLog.insert({
			userId: Meteor.userId(),
			username: Meteor.user().username,
			weight: weight.value,
			createdAt: Date.now()
		});

		weight.value = '';
	}
}

export default createContainer(() => {
	const userId = Meteor.userId()
	Meteor.subscribe('weightLog.self', userId);
	Meteor.subscribe('user.self', userId);
	return {
		user: Meteor.user(),
		weightLog: Api.WeightLog.find({}).fetch()
	}
}, Profile);