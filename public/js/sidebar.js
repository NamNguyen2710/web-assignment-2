/* Set the width of the side navigation to 250px */
function openCloseNav() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.left = sidebar.style.left === '-200px' ? '0' : '-200px';
}

function openCloseLoginName() {
  const signout = document.getElementById('signoutBtn');
  if (!signout.style.height || signout.style.height === '0px')
    signout.style.height = '50px';
  else signout.style.height = '0px';
}
