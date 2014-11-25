SimpleSchema.messages({
  "required": "Please complete this field",
  "passwordMismatch": "Passwords do not match",
  "required buyer_budget": "Please choose an estimate"
});

Schema = {}

Schema.Address = new SimpleSchema({
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  }
});

Schema.Location = new SimpleSchema({
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    geohash: {
        type: String
    }
});

Schema.Company = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    }, 
    billingAddress: {
        type: Schema.Address,
        optional: true
    },
    shippingAddresses: {
        type: [Schema.Address],
        minCount: 1
    },
    phone_number: {
        type: String,
        label: "Phone Number"
        // regex: xxx-xxx-xxxx
    }
});

Schema.Buyer = new SimpleSchema({
    
    buyer_type: {
        type: String,
        label: "Buyer Type",
        allowedValues: [
        ]
        // regex: enum?
    },
    purchases_per_month: {
        type: String,
        label: "Purchases per month"
    },
    company_id: {
        type: String
    },
    default_image_id: {
        type: String,
        label: "Profile Image"
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    }
});

Schema.Farmer = new SimpleSchema({
    
    growing_practices: {
        type: Object
    },
    "growing_practices.usda_organic": {
        type: Boolean
    },
    "growing_practices.rainforest_alliance": {
        type: Boolean
    },

    company_id: {
        type: String
    },
    default_image_id: {
        type: String,
        label: "Profile Image"
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    }
});

Schema.Image = new SimpleSchema({
    file_name: {
        type: String
    },
    file_size: {
        type: Number
    },
    content_type: {
        type: String
    },
    updated_file_at: {
        type: Date
    }
});

Schema.InventoryItem = new SimpleSchema({
    quantity_available: {
        type: Number
    },
    price: {
        type: Number
    },
    case_weight: {
        type: Number
    },
    variety_id: {
        type: String
    },
    farmer_id: {
        type: String
    },
    comments: {
        type: String
    }
});

Schema.ShipDate = new SimpleSchema({
    date: {
        type: Date
    },
    inventory_item_id: {
        type: String
    }
});

Schema.Variety = new SimpleSchema({
    name: {
        type: String
    },
    full_name: {
        type: String
    },
    parent_id: {
        type: String
    },
    depth: {
        type: Number
    },
    default_image_id: {
        type: String
    },

});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        label: "First Name",
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/
    },
    lastName: {
        label: "Last Name",
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/
    },
    default_image_id: {
        type: String,
        autoform: {
            omit: true
        }
    }
});

Schema.User = new SimpleSchema({
    emails: {
        type: [Object]
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        // optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

//AutoForm.debug()

Forms = {};

Forms.userSignup = new SimpleSchema(
    [
    Schema.Address, // Company Address
    {   
        firstName: {
            label: "First Name",
            type: String,
            regEx: /^[a-zA-Z-]{2,25}$/
        },
        lastName: {
            label: "Last Name",
            type: String,
            regEx: /^[a-zA-Z]{2,25}$/
        },
        password: {
            type: String, 
            minCount: 7,
            label: "Password",
            autoform: {
              type: "password"
            }
        },
        password_confirmation: {
            type: String, 
            minCount: 7,
            label: "Confirm Password",
            autoform: {
              type: "password"
            },
            custom: function () {
              if (this.value !== this.field('password').value) {
                return "passwordMismatch";
              }
            }
        },
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        },

        
        account_type: {
            type: String,
            label: "I am a...",
            autoform: {
              type: "select-radio-inline",
              options: function () {
                return [
                  {label: "Buyer", value: "buyer"},
                  {label: "Farmer", value: "farmer"}
                ];
              }
            }
          },
        company_name: {
            type: String,
            label: "Company Name"
        },
        company_description: {
            type: String,
            label: "Description",
            optional: true
        },
        phone_number: {
            type: String
        },

        // if Farmer
        growing_practices: {
            type: [String],
            optional: true,
            label: "Growing Practices",
            autoform: {
              type: "select-checkbox-inline",
              options: function () {
                return [
                  {label: "USDA Organic", value: "usda_organic"},
                  {label: "Rainforest Alliance", value: "rainforest_alliance"}
                ];
              }
            }
        },

        // if Buyer
        buyer_type: {
            label: "Buyer Type",
            type: String,
            autoform: {
              type: "select",
              options: function () {
                return [
                  {label: "Retail", value: "retail"},
                  {label: "Restaurant", value: "restaurant"},
                  {label: "Food Service", value: "food_service"},
                  {label: "Other", value: "other"}
                ];
              }
            }
        },
        buyer_type_custom: {
            label: "How would you describe your business?",
            type: String,
            optional: true
        },
        buyer_budget: {
            type: Number,
            label: "What is your current monthly expense for fresh produce?",
            autoform: {
              type: "select",
              options: function () {
                return [
                    {label: "Less than $1000", value: 1},
                    {label: "$1,000 - $5,000", value: 2},
                    {label: "$5,000 - $10,000", value: 3},
                    {label: "$10,000 - $20,000", value: 4},
                    {label: "More than $20,000", value: 5}
                ]
              }
            }
        }
    }
]);
