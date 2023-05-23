// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
const logoutBtn = document.querySelector('button.logout');
logoutBtn.addEventListener('click', async function () {
  fetch('/api/users/logout', { method: 'GET' }).then(res => {
    if (res.status === 200) {
      localStorage.clear();
      window.location.assign('/login');
    }
  });
});
