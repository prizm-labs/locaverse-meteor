
  process.env.MAIL_URL="smtp://m4garrido%40gmail.com:L1v3Y0urL3g3nd@smtp.gmail.com:465/"; 

  Meteor.startup(function () {
    // code to run on server at startup
  });

  Accounts.emailTemplates.verifyEmail.subject = function(user){
    return "Welcome to Locaverse, " + user.profile.firstName + "!";
  }
  Accounts.emailTemplates.verifyEmail.text = function(user,url){
    return "Hello " + user.profile.firstName + ",\n"
      + "Please verify your email by clicking the link below:\n\n"
      + url
  }

  Meteor.methods({
    registerUser: function(doc){
      console.log('registerUser',doc);

      check(doc, Forms.userSignup);  
      
      var newUser = SignUpService.createUser(doc);

      var companyId = SignUpService.createCompany(doc);

      switch(doc.account_type){

        case 'buyer':
        SignUpService.createBuyerAccount(doc,companyId);
        break;

        case 'farmer':
        SignUpService.createFarmerAccount(doc,companyId);
        break;
      }

      // Send verification email
      Accounts.sendVerificationEmail(newUser);
      console.log('registerUser exit');

      return true;
    }
  });

SignUpService = {
  createCompany: function(doc){

    // Create company
    var shippingAddress = {
      street: doc.street,
      city: doc.city,
      state: doc.state,
      zip: doc.zip
    };

    var companyDoc = {
      name: doc.company_name,
      shippingAddress: shippingAddress,
      phone_number: doc.phone_number
    };

    check(companyDoc, Schema.Company);
    console.log(companyDoc);

    return Companies.insert(companyDoc);
  },
  createUser: function(doc){
    check(doc, Forms.userSignup);  
      
      // Set default profile image

      var userOptions = {
        email: doc.email,
        password: doc.password,
        profile: {
          firstName: doc.firstName,
          lastName: doc.lastName,
          default_image_id: "avatar.jpg"
        }
      };

      return Accounts.createUser(userOptions);
  },
  createBuyerAccount: function(doc, companyId){
    // Set default profile image

    var buyerDoc = {
      company_id: companyId,
      default_image_id: "buyer.jpg",
      description: doc.company_description || '',

      buyer_type: doc.buyer_type,
      buyer_type_custom: doc.buyer_type_custom || '',
      budget_monthly: doc.buyer_budget
    }

    console.log('createBuyerAccount',buyerDoc);

    check(buyerDoc, Schema.Buyer);

    return Buyers.insert(buyerDoc);
  },
  createFarmerAccount: function(doc, companyId){
    // Set default profile image

    var farmerDoc = {
      company_id: companyId,
      default_image_id: "farmer.jpg",
      growing_practices: {
        usda_organic: doc.growing_practices.indexOf('usda_organic')!=-1,
        rainforest_alliance: doc.growing_practices.indexOf('rainforest_alliance')!=-1
      },
      description: doc.company_description || ''
    };

    console.log('createFarmerAccount',farmerDoc);

    check(farmerDoc, Schema.Farmer);

    return Farmers.insert(farmerDoc);
  }

};
