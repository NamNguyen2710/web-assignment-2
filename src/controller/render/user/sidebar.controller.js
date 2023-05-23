// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
function sidebarController(userType) {
  const customerSidebar = [
    { title: 'My account', url: '/my-account' },
    { title: 'Search products', url: '/' },
    { title: 'Shopping cart', url: '/shopping-cart' },
    { title: 'My orders', url: '/orders' }
  ];
  const vendorSidebar = [
    { title: 'My account', url: '/my-account' },
    { title: 'My products', url: '/products' },
    { title: 'Add new product', url: '/products/new' }
  ];
  const shipperSidebar = [
    { title: 'My account', url: '/my-account' },
    { title: 'Distribution hub orders', url: '/orders' }
  ];

  switch (userType) {
    case 'customer':
      return customerSidebar;
    case 'vendor':
      return vendorSidebar;
    case 'shipper':
      return shipperSidebar;
    default:
      return [];
  }
}

export default sidebarController;
