const addToCartBtn = document.querySelector('button#add-to-cart');
const amountInput = document.querySelector('input#amount');

addToCartBtn.addEventListener('click', e => {
  let cartItems = localStorage.getItem('cartItems');
  if (!cartItems) cartItems = [];
  else cartItems = JSON.parse(cartItems);

  const amount = Number(amountInput.value);
  const totalPrice = amount * product.price;
  cartItems = [
    ...cartItems,
    { name: product.name, amount, price: product.price, totalPrice }
  ];
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
});
