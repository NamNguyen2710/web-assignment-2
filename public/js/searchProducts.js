// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Authors: Nguyen Ngo Hoang Nam, Tran Tuan Bao, Nguyen Huy Anh, Duong Quang Nhat Bao
// IDs: s3980297, s3970254, s3956092s, s3987239
// Acknowledgement: Acknowledge the resources that you use here.
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
