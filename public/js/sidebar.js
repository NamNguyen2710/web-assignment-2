// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
/* Set the width of the side navigation to 250px */
const toggleBtn = document.querySelector('button.sidebar-toggle');
toggleBtn.addEventListener('click', function () {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.left =
    !sidebar.style.left || sidebar.style.left === '-200px' ? '0' : '-200px';
});
