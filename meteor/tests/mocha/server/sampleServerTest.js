if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
      it("should have a Meteor version defined", function(){
        chai.assert(Meteor.release);
      });
    });

    describe("User Signup",function(){
      // Meteor.users.remove({});
      // Companies.remove({});

      var doc = { email: 'michael.a.garrido@gmail.com',
        firstName: 'Michael',lastName: 'Garrido', 
        password: 'password', password_confirmation: 'password', 
        company_name: 'Olaunch', street: '3 Heath Court',
        city: 'Daly City', state: 'CA', zip: '94015',
        phone_number: '14153505920', 
        account_type: 'buyer',
        buyer_type: 'retail', buyer_budget: 1
      };

      var userDocFarmer = {
        email: 'michael.a.garrido@gmail.com',
        firstName: 'Michael',lastName: 'Garrido', 
        password: 'password', password_confirmation: 'password', 
        company_name: 'Olaunch', street: '3 Heath Court',
        city: 'Daly City', state: 'CA', zip: '94015',
        phone_number: '14153505920', 
        account_type: 'farmer', growing_practices: [ 'usda_organic', 'rainforest_alliance' ]
      }

      var company = null;

      it("should create a valid company",function(){

        var expected = {
          name: 'Olaunch',
          shippingAddress: {
            street: '3 Heath Court',
            city: 'Daly City',
            state: 'CA',
            zip: '94015'
          },
          phone_number: '14153505920'
        };
        company = Companies.findOne(SignUpService.createCompany(doc));

        chai.assert.deepEqual(company.shippingAddress, expected.shippingAddress);
      });

      it("should create a valid user",function(){

        var user = Meteor.users.findOne(SignUpService.createUser(doc));
        console.log(user);

        chai.assert.equal(user.profile.firstName, doc.firstName);
        chai.assert.equal(user.profile.lastName, doc.lastName);
        chai.assert.equal(user.emails[0].address, doc.email);
      });

      it("should create valid buyer account",function(){

        var buyer = Buyers.findOne(SignUpService.createBuyerAccount(doc,company._id));
        console.log('new buyer',buyer);

        chai.assert.equal(buyer.company_id,company._id);
        chai.assert.equal(buyer.buyer_type,doc.buyer_type);
      });

      it("should create valid farmer account",function(){

        var farmer = Farmers.findOne(SignUpService.createFarmerAccount(userDocFarmer,company._id));
        console.log('new farmer',farmer);

        chai.assert.equal(farmer.company_id,company._id);
      });

    });

    Companies.remove({});
    Meteor.users.remove({});
  });
}
