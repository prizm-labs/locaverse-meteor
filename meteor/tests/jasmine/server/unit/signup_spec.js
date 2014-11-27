// describe("User Signup",function(){

//   var doc = { email: 'michael.a.garrido@gmail.com',
//     firstName: 'Michae',lastName: 'Garrido', 
//     password: 'password', password_confirmation: 'password', 
//     company_name: 'Olaunch', street: '3 Heath Court',
//     city: 'Daly City', state: 'CA', zip: '94015',
//     phone_number: '14153505920', account_type: 'buyer',
//     buyer_type: 'retail', buyer_budget: 1
//   };

//   it("should create valid company",function(){

//     var expected = {
//       name: 'Olaunch',
//       shippingAddress: {
//         street: '3 Heath Court',
//         city: 'Daly City',
//         state: 'CA',
//         zip: '94015'
//       },
//       phone_number: '14153505920'
//     };

//     expect(SignUpService.createCompany(doc)).toEqual(expected);
//   });
// });