if (Meteor.isClient) {

  AutoForm.debug();

  // // counter starts at 0
  // Session.setDefault("counter", 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get("counter");
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set("counter", Session.get("counter") + 1);
  //   }
  // });

  Template.userSignupForm.helpers({
    accountTypeIsSelected: function(){
      var selection = AutoForm.getFieldValue("userSignupForm","account_type");
      console.log(selection);
      return !(typeof selection==='undefined');
    }
  });

  Template.afFancyFormGroup.helpers({
    isRequiredField: function(){
      //console.log(this);
      var schema = AutoForm.getSchemaForField(this.name);
      return (typeof schema.optional==='undefined');
    }
  });

  Template.afFancyFormGroup.fieldConfiguration = function(){
      //console.log('fieldConfiguration',this);
      return _.clone(this)
    }

  Template.afFancyFormGroup.rendered = function(){
    var schema = AutoForm.getSchemaForField(this.data.name);
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });


  Meteor.methods({
    registerUser: function(doc){

      console.log('registerUser',doc);

    }
  });
}

