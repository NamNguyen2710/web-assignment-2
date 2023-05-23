// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
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
