const searchinput = document.querySelector("#search");
const productsWerraper = document.querySelector(".products-werraper");
const btns = document.querySelectorAll(".btn");
let allProduct = [];
const filters = {
  title: "",
};
const instance = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/b/678b9538acd3cb34a8ce5474',
  headers: {'X-Master-Key': '$2a$10$ru99PfuQgeJlpnCprfrIpuy18ZNVDfz3/1XlOlo.i65Ol/TKEJwy.'}
});
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await instance.get();
    allProduct = response.data.record.items;
    generateProduct(allProduct, filters);
  }  catch (error) {
    console.error("خطا در دریافت داده‌ها:", error);
  }
});
searchinput.addEventListener("input", (e) => {
  filters.title = e.target.value;
  generateProduct(allProduct, filters);
});
function generateProduct(_prosuct, _filter) {
  const filterProduct = _prosuct.filter((p) => {
    return p.title
      .toLowerCase()
      .trim()
      .includes(_filter.title.toLowerCase().trim());
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
    filters.title = filter;
    generateProduct(allProduct, filters);
  });
});
