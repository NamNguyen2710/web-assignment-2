// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
const saveBtn = document.querySelector('button#status-change');
saveBtn.addEventListener('click', e => {
  const statusSelect = document.querySelector('select#status-select');
  const parsedUrl = new URL(window.location.href);
  const urlPath = parsedUrl.pathname;
  const orderId = /\d+/.exec(urlPath)[0];

  fetch(`/api/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: statusSelect.value })
  }).then(res => {
    if (res.status === 200) window.location.assign('/orders');
  });
});
