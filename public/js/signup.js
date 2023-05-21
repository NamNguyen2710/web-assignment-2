const form = document.querySelector('form');
const typeSelect = document.querySelector('select#type');

typeSelect.addEventListener('change', e => {
  switch (e.target.value) {
    case 'customer':
      form.className = 'show-customer';
      break;

    case 'vendor':
      form.className = 'show-vendor';
      break;

    case 'shipper':
      form.className = 'show-shipper';
      break;

    default:
      break;
  }
});

form.addEventListener('submit', e => {
  console.log('onSubmit');

  e.preventDefault();
  const data = new FormData(form);
  const usernameValidate = /^[A-Za-z\d]{8,15}$/.test(e.target.value);
  const passwordValidate =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
      e.target.value
    );

  switch (data.type) {
    case 'customer':
      data.delete('businessName');
      data.delete('businessAddress');
      data.delete('distributionHub');
      break;

    case 'vendor':
      data.delete('name');
      data.delete('address');
      data.delete('distributionHub');
      break;

    case 'shipper':
      data.delete('name');
      data.delete('address');
      data.delete('businessName');
      data.delete('businessAddress');
      break;

    default:
      break;
  }
});
