/* Set the width of the side navigation to 250px */
const toggleBtn = document.querySelector('button.sidebar-toggle');
toggleBtn.addEventListener('click', function () {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.left =
    !sidebar.style.left || sidebar.style.left === '-200px' ? '0' : '-200px';
});
