const filterForm = document.querySelector('form#filter-product');
filterForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(filterForm);

  const parsedUrl = new URL(window.location.href);
  const search = parsedUrl.searchParams.get('search');
  const minPrice = formData.get('minPrice');
  const maxPrice = formData.get('maxPrice');
  console.log('lol', minPrice, maxPrice, search);

  window.location.assign(
    `/products?search=${search}${minPrice ? `&minPrice=${minPrice}` : ''}${
      maxPrice ? `&maxPrice=${maxPrice}` : ''
    }`
  );
});
