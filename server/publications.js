import Api from '../imports/api/api.js';

Meteor.publish('weightLog.self', (selfUserId) => {
	return Api.WeightLog.find({userId: selfUserId});
});

Meteor.publish('user.self', (selfUserId) => {
	return Meteor.users.find({_id: selfUserId});
});

Meteor.publish('chat.all', () => {
	return Api.Chat.find({});
});