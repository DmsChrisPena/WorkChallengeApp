import { Mongo } from 'meteor/mongo';

export const WeightLog = new Mongo.Collection('weightLog');

WeightLog.allow({
	insert: () => {
		if(Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	}
});