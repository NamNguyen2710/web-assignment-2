const form = document.querySelector('form');
const typeSelect = document.querySelector('select#type');
const errorText = document.querySelector('small.error-text');

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
  e.preventDefault();
  const formData = new FormData(form);

  const validationList = [
    { test: /^[A-Za-z\d]{8,15}$/, field: 'username' },
    {
      test: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      field: 'password'
    },
    { test: /^.{5,}$/, field: 'name', type: 'customer' },
    { test: /^.{5,}$/, field: 'address', type: 'customer' },
    { test: /^.{5,}$/, field: 'businessName', type: 'vendor' },
    { test: /^.{5,}$/, field: 'businessAddress', type: 'vendor' }
  ];

  const deleteData = {
    customer: ['businessName', 'businessAddress', 'distributionHub'],
    vendor: ['name', 'address', 'distributionHub'],
    shipper: ['name', 'address', 'businessName', 'businessAddress']
  };

  deleteData[formData.get('type')].forEach(field => formData.delete(field));
  for (let validate of validationList) {
    const fieldValue = formData.get(validate.field);
    const type = formData.get('type');
    if (
      (!validate.type || type === validate.type) &&
      !validate.test.test(fieldValue)
    ) {
      errorText.textContent = 'Invalid input fields';
      const inputField = document.querySelector(`input#${validate.field}`);
      inputField.className = 'invalid';
    }
  }

  fetch('/api/users/signup', {
    method: 'POST',
    body: formData
  }).then(async res => {
    if (res.status === 201) return window.location.replace('/login');

    const data = await res.json();
    errorText.textContent = data.error;
  });
});

const usernameValidations = [/^[A-Za-z\d]+$/, /^.{8,15}$/];
const passwordValidations = [
  /^(?=.*[A-Z]).*$/,
  /^(?=.*[a-z]).*$/,
  /^(?=.*\d).*$/,
  /^(?=.*[@$!%*?&]).*$/,
  /^[A-Za-z\d@$!%*?&]+$/,
  /^.{8,15}$/
];

const usernameInput = document.querySelector('input#username');
usernameInput.addEventListener('input', e => {
  const value = e.target.value;
  const validationList = document.querySelector('ul#username-validation');

  Array.from(validationList.children).forEach((elem, idx) => {
    elem.className = usernameValidations[idx].test(value)
      ? 'correct'
      : 'incorrect';
  });
});

const passwordInput = document.querySelector('input#password');
passwordInput.addEventListener('input', e => {
  const value = e.target.value;
  const validationList = document.querySelector('ul#password-validation');

  Array.from(validationList.children).forEach((elem, idx) => {
    elem.className = passwordValidations[idx].test(value)
      ? 'correct'
      : 'incorrect';
  });
});
