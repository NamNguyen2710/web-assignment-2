const form = document.querySelector('form');
const errorText = document.querySelector('p#error-text');

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }).then(async res => {
    if (res.status === 200) return window.location.replace('/my-account');

    const data = await res.json();
    errorText.textContent = data.error;
  });
});
