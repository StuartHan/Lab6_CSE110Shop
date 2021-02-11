// script.js
// @author: Yichen Han
// @data:   Feb 10 2020
// @url :   http://127.0.0.1:5500/index.html

var localStorage = window.localStorage;
var cart = new Set();
var cartCount = document.getElementById('cart-count');



window.addEventListener('DOMContentLoaded', () => {
  // If items are not fetched, fetch and load
  if (localStorage.getItem('items') == null){
    fetch('https://fakestoreapi.com/products')
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem('items', JSON.stringify(data));
        loadProds ();
      });
  }
  // Otherwise, directly load
  else {
    loadProds ();
  }
  cartCount.innerHTML = cart.size;
});



function loadProds() {
  var items = JSON.parse (localStorage.getItem('items'));
      cart  = new Set(JSON.parse(localStorage.getItem("Cart")));
  var prods = document.getElementById ('product-list');

  for (let i = 0; i < items.length; i++){
    let product = prods.appendChild (document.createElement('product-item'));//alert("Construct");
        product.setAttribute('src'  , items[i].image);
        product.setAttribute('title', items[i].title);
        product.setAttribute('price', items[i].price);
        product.setAttribute('id'   , items[i].id   );
    
    if(cart.has(''+(items[i].id))) {product.cartButton();}
  }
}