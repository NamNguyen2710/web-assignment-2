const logoutBtn = document.querySelector('button.logout');
logoutBtn.addEventListener('click', async function () {
  fetch('/api/users/logout', { method: 'GET' }).then(res => {
    if (res.status === 200) window.location.assign('/login');
  });
});
