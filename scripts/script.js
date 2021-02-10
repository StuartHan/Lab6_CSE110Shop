// Script.js
// @author Yichen Han
// @date  : Feb 10 2020

/* Gloval Vars */
var localStorage = window.localStorage;
var productList = document.getElementById('product-list');

/* Functions:
     addEventListener
   Vars:
     rawProdArr = raw product array: an array of fetched JS objs
     product    = HTMLElement, represent a product
*/
window.addEventListener('DOMContentLoaded', () => {
  // PART 1,2: If storagy is empty, fetch and construct. Otherwise, directly construct.
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then
    (rawProdArr => {
      if (localStorage.getItem('products') != null) { // fetch array
          localStorage.setItem('products', JSON.stringify(rawProdArr))}

      // construct elements
      for (let i = 0; i < rawProdArr.length; i++ ) {
        let title = rawProdArr[i].title;
        let image = rawProdArr[i].image;
        let price = rawProdArr[i].price;
        let id    = rawProdArr[i].id;
        // call product constructor to construct a raw element
        let product = productList.appendChild(new ProductItem(title, image, price));
        // update values in element
        //product.title               = title;
        //product.setAttribute('src'  , image);
        //product.setAttribute('price', price);
        product.setAttribute('id'   , id);
      }
    })
});