import { Mongo } from 'meteor/mongo';

export const Chat = new Mongo.Collection('chat');

Chat.allow({
	insert: () => {
		if(Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	}
});