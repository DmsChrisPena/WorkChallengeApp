import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Api from '../../api/api.js';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
	}

	componentWillMount() {
		if(!Meteor.userId()) {
			browserHistory.push('/');
		}     
	}

	sendMessage(event) {
		event.preventDefault();

		let { message } = this.state;
		let { user } = this.props;


		let chatMessage = {
			userId: user._id,
			username: user.username,
			createdAt: Date.now(),
			message: message
		};

		this.setState({message: ''});

		Api.Chat.insert(chatMessage);

		message.value = '';
	}

	handleChange(property, event, value) {
		let obj = {};
		obj[property] = value;
		this.setState(obj);
	}

	render() {
		const { chat } = this.props;
		return (
			<section id='chat'>
				<Paper zDepth={1}>
					<form className='flex-row' onSubmit={this.sendMessage.bind(this)}>
						<TextField value={this.state.message} onChange={this.handleChange.bind(this, 'message')} style={{flex: 3, paddingLeft: 8, paddingRight: 8}} hintText="Message..." underlineShow={false} />
						<RaisedButton type='submit' style={{flex: 1, height: 48}} label="Send" primary={true} />
					</form>
				</Paper>
				<List>
					{chat ? chat.map((message, i) => {
						return (
							<div key={i}>
								<ListItem
								  leftAvatar={message.userId === Meteor.userId() ? <Avatar src="http://www.fillmurray.com/70/70" /> : null}
								  rightAvatar={message.userId !== Meteor.userId() ? <Avatar src="http://www.fillmurray.com/69/69" /> : null}
								  insetChildren={message.userId === Meteor.userId() ? false : true}
								  primaryText={message.message}
								  secondaryText={
								    <p>
								      - {message.username}
								    </p>
								  }
								/>
								<Divider inset={false} />
							</div>
						);
					}) : null}
				</List>
			</section>
		);
	}
}

export default Chat;

export default createContainer(() => {
	const userId = Meteor.userId()
	Meteor.subscribe('user.self', userId);
	Meteor.subscribe('chat.all');
	return {
		user: Meteor.user(),
		chat: Api.Chat.find({}, { sort: { createdAt: -1 }}).fetch()
	}
}, Chat);