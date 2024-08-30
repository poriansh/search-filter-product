
const searchinput = document.querySelector("#search");
// http://localhost:3000/
let allProduct = [];
const filter = {
  title: "",
};
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
        allProduct = res.data;
        console.log(allProduct)
      generateProduct(allProduct, filter);
    })
    .catch((err) => console.log(err));
});
searchinput.addEventListener('input', (e) => {
    console.log(e.target.value)
    filter.title = e.target.value
    generateProduct(allProduct, filter);
})
function generateProduct(_prosuct, _filter) {
 const filterProduct =  _prosuct.filter((p) => {
    return p.title.toLowerCase().trim().includes(_filter.title.toLowerCase().trim());
 });
}
