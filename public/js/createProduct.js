const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch('/api/products', {
    method: 'POST',
    body: formData
  }).then(async res => {
    if (res.status === 201) return window.location.assign('/products');

    const data = await res.json();
    const errorText = document.querySelector('.error-text');
    errorText.textContent = data.error;
  });
});
