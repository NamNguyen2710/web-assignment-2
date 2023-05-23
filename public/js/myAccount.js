// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
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
