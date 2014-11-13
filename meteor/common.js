var Schemas = {};

AddressSchema = new SimpleSchema({
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

LocationSchema = new SimpleSchema({
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

Schemas.Company = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    }, 
    billingAddress: {
        type: AddressSchema
    },
    shippingAddresses: {
        type: [AddressSchema],
        minCount: 1
    },
    phone_number: {
        type: String,
        label: "Phone Number"
        // regex: xxx-xxx-xxxx
    }
});

Schemas.Buyer = new SimpleSchema({
    
    buyer_type: {
        type: String,
        label: "Buyer Type"
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

Schemas.Farmer = new SimpleSchema({
    
    growing_practices: {
        type: [String]
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

Schemas.Image = new SimpleSchema({
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

Schemas.InventoryItem = new SimpleSchema({
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

Schemas.ShipDate = new SimpleSchema({
    date: {
        type: Date
    },
    inventory_item_id: {
        type: String
    }
});

Schemas.Variety = new SimpleSchema({
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
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    default_image_id: {
        type: String,
        label: "Profile Image"
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
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
