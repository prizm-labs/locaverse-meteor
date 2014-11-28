  AutoForm.debug();

  AutoForm.hooks({
    userSignupForm: {
      beginSubmit: function(formId, template) {
        // Loading spinner
        console.log('beginSubmit');
      },
      endSubmit: function(formId, template) {
        console.log('endSubmit');
      },
      onSuccess: function(operation, result, template) {
        console.log('onSuccess',result);
        // Transition to email confirmation
        Session.set('confirmation_email',result.email);

        // Route to registration successful page
        Router.go('signup-success');
      }, 
      onError: function(operation, error, template) {
        console.log('onError',error);
      }
    }
  });

  UserService = {
    login: function(email,password){
      Meteor.loginWithPassword({email:email},password, 
        function(error){
          if (error){
            console.log(error);
            Session.set('loginValidationMessage',error.reason);
          } else {
            // if successful redirect to user dashboard
            Router.go('dashboard');
          }
        });
    },
    logout: function(){
      Meteor.logout(function(error){
        if (!error){
          Router.go('landing');
        } else {
         
        }
      })
    }
  }

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
  Template.LoginFullPage.helpers({
    validationMessage: function(){
      return Session.get('loginValidationMessage');
    }
  });

  Template.LoginFullPage.events({
    "click #login": function(){

      // Validate login
      var email = $('#email').val(), password = $('#password').val();
      UserService.login(email,password);
      
    }
  });

  Template.Dashboard.events({
    'click .logout': function(){
      UserService.logout();
    }
  })

  Template.userSignupForm.helpers({
    accountTypeIsSelected: function(){
      var selection = AutoForm.getFieldValue("userSignupForm","account_type");
      console.log(selection);
      return !(typeof selection==='undefined');
    }
  });

  Template.SignupSuccess.helpers({
    confirmationEmail: function(){
      return Session.get('confirmation_email');
    }
  });

  Template.afFancyFormGroup.helpers({
    isRequiredField: function(){
      //console.log(this);
      var schema = AutoForm.getSchemaForField(this.name);
      return (typeof schema.optional==='undefined');
    },
    fieldConfiguration: function(){
      //console.log('fieldConfiguration',this);
      return _.clone(this)
    }
  });

  // Template.afFancyFormGroup.fieldConfiguration = function(){
  //     //console.log('fieldConfiguration',this);
  //     return _.clone(this)
  //   }

  Template.afFancyFormGroup.rendered = function(){
    var schema = AutoForm.getSchemaForField(this.data.name);
  }