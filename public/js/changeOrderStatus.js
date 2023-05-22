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
