// Render shopping cart table
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function renderCartPrice() {
  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const cartSubtotalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
  const subTotalPriceElem = document.querySelector('#subtotal-price');
  subTotalPriceElem.textContent = `$${cartSubtotalPrice}`;

  const cartTotalPrice = (Math.round((totalPrice + 35) * 100) / 100).toFixed(2);
  const totalPriceElem = document.querySelector('#total-price');
  totalPriceElem.textContent = `$${cartTotalPrice}`;
}

function removeItemFromCart(e) {
  const table = document.querySelector('table#shopping-cart');
  const row = e.target.parentElement.parentElement.parentElement.parentElement;
  const index = Array.from(table.children).indexOf(row);

  cartItems.splice(index - 1, 1);
  table.removeChild(row);
  renderCartPrice();
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function renderProducts(productList) {
  const table = document.querySelector('table#shopping-cart');

  productList.forEach(product => {
    const row = document.createElement('tr');

    const cell1 = document.createElement('td');
    const cartInfo = document.createElement('div');
    cartInfo.className = 'cart-info';

    const productImage = document.createElement('img');
    productImage.src = `/public/image/${product.url}`;
    productImage.height = '250px';

    const productDetails = document.createElement('div');

    const productName = document.createElement('p');
    productName.textContent = product.name;

    const productPrice = document.createElement('small');
    productPrice.textContent = 'Price: $' + product.price + '   ';

    const removeLink = document.createElement('small');
    removeLink.className = 'clickable-text';
    removeLink.textContent = 'Remove';
    removeLink.addEventListener('click', removeItemFromCart);

    productDetails.appendChild(productName);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(removeLink);

    cartInfo.appendChild(productImage);
    cartInfo.appendChild(productDetails);

    cell1.appendChild(cartInfo);
    row.appendChild(cell1);

    const cell2 = document.createElement('td');
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.value = product.amount;
    cell2.appendChild(amountInput);
    row.appendChild(cell2);

    const cell3 = document.createElement('td');
    cell3.textContent = product.totalPrice;
    row.appendChild(cell3);

    table.appendChild(row);
  });
}

renderProducts(cartItems);
renderCartPrice();

// Add create order submitting event
const orderButton = document.querySelector('button#order');
const errorText = document.querySelector('p#error-text');
orderButton.addEventListener('click', e => {
  const products = cartItems.map(item => ({
    name: item.name,
    amount: item.amount,
    price: item.totalPrice
  }));
  const totalPrice =
    cartItems.reduce((acc, cur) => acc + cur.totalPrice, 0) + 35;

  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products, totalPrice })
  }).then(async res => {
    if (res.status === 201) {
      localStorage.removeItem('cartItems');
      window.location.assign('/orders');
    }

    const data = await res.json();
    errorText.textContent = data.error;
  });
});
