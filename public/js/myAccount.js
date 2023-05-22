const form = document.querySelector('form#avatar-form');
const avatar = document.querySelector('img#avatar');

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch('/api/users/account-info', {
    method: 'PUT',
    body: formData
  }).then(async res => {
    if (res.status === 200) {
      const data = await res.json();
      avatar.src = `/public/image/${data.avatar}`;
    }
  });
});
