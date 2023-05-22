const searchForm = document.querySelector('form.search-bar');
searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const searchText = document.querySelector('input#search');

  const parsedUrl = new URL(window.location.href);
  const minPrice = parsedUrl.searchParams.get('minPrice');
  const maxPrice = parsedUrl.searchParams.get('maxPrice');

  window.location.assign(
    `/products?search=${searchText.value}${
      minPrice ? `&minPrice=${minPrice}` : ''
    }${maxPrice ? `&maxPrice=${maxPrice}` : ''}`
  );
});
