const searchinput = document.querySelector("#search");
const productsWerraper = document.querySelector(".products-werraper");
const btns = document.querySelectorAll(".btn");
// http://localhost:3000/
let allProduct = [];
const filters = {
  title: "",
};
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProduct = res.data;
      generateProduct(allProduct, filters);
    })
    .catch((err) => console.log(err));
});
searchinput.addEventListener("input", (e) => {
  filters.title = e.target.value;
  generateProduct(allProduct, filters);
});
function generateProduct(_prosuct, _filter) {
  const filterProduct = _prosuct.filter((p) => {
    return p.title.toLowerCase().trim().includes(_filter.title.toLowerCase().trim());
  });
  productsWerraper.innerHTML = "";
  filterProduct.forEach((item, index) => {
    const productElem = document.createElement("div");
    productElem.classList.add("product");
    productElem.innerHTML = ` <div class="product">
            <div class="img-container">
              <img src=${item.image} class="product-img" />
            </div>
            <div class="product-desc">
              <p class="product-price">${item.price}</p>
              <p class="product-title">${item.title}</p>
            </div>
          </div> `;

    productsWerraper.append(productElem);
  });
}

btns.forEach((item) => {
  item.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    console.log(filter);
    filters.title = filter;
    generateProduct(allProduct, filters);
  });
});
