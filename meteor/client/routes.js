
// Public Routes
Router.route('/', function () {

  var userLoggedIn = false;
  
  if (userLoggedIn) {
    tthis.redirect('/home');
  } else {

    this.layout('PublicLayout',{});
    this.render('HeaderGeneral', {to: 'header'});

    this.render('Landing', {
      data: function () { 
      }
    });

  }
});

Router.route('/signup', function () {

  this.layout('PublicLayout', {});
  this.render('HeaderGeneral', {to: 'header'});

  this.render('SignupForm', {
    data: function () { 
    }
  });
});

Router.route('/signup/success', function () {
  this.render('SignupSuccess', {
    data: function () { 
      //return Items.findOne({_id: this.params._id}) 
    }
  });
}, { name:'signup-success' });

Router.route('/marketplace', function () {
  this.render('Marketplace', {
    data: function () { 
    }
  });
});

Router.route('/produce/:id', function () {
  this.render('Marketplace', {
    data: function () { 
    }
  });
});

Router.route('/farmers/:id', function () {
  this.render('Farmer', {
    data: function () { 
    }
  });
});

Router.route('/venues/:id', function () {
  this.render('Venue', {
    data: function () { 
    }
  });
});


// Private Routes - General
Router.route('/home', function () {
  this.layout('ApplicationLayout', {});
  this.render('HeaderUser', {
    to: 'header',
    data: function () { 
      
      var templateData = {};
      templateData.navigation = [
        { title: 'Marketplace', route: '/marketplace' },
        { title: 'Account', route: '/account' },
        { title: 'Orders', route: '/orders' }
      ];

      var accountType = 'farmer';

      switch (accountType) {
        case 'farmer':

        break;
        case 'buyer':

        break;
      }

      return templateData;
    }
  });

  this.render('Dashboard', {
    data: function () { 
    }
  });
});

Router.route('/account', function () {
  this.render('Account', {
    data: function () { 
    }
  });
});

// Private Routes - Buyer
Router.route('/orders', function () {
  this.render('Orders', {
    data: function () { 
    }
  });
});

Router.route('/orders/:id', function () {
  this.render('OrderDetail', {
    data: function () { 
    }
  });
});

Router.route('/checkout', function () {
  this.render('Checkout', {
    data: function () { 
    }
  });
});

// Private Routes - Farmer
Router.route('/inventory', function () {
  this.render('Inventory', {
    data: function () { 
    }
  });
});

Router.route('/inventory/:id', function () {
  this.render('InventoryDetail', {
    data: function () { 
    }
  });
});



