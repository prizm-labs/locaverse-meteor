Meteor.users.attachSchema(Schema.User);

Companies = new Meteor.Collection("companies");
Companies.attachSchema(Schema.Company);

Buyers = new Meteor.Collection("buyers");
Buyers.attachSchema(Schema.Buyer);

Farmers = new Meteor.Collection("farmers");
Farmers.attachSchema(Schema.Farmer);