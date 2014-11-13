Meteor.users.attachSchema(Schema.User);

Companies = new Mongo.Collection("companies");
Companies.attachSchema(Schema.Company);

