// script.js
// @author: Yichen Han
// @data:   Feb 10 2020

var localStorage = window.localStorage;
var cart = new Set();
var cartCount = document.getElementById('cart-count');

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem("itmes")){
    fetch('https://fakestoreapi.com/products')
      .then(resp => resp.json())
      .then(data => localStorage.setItem('items', JSON.stringify(data)));
  }
  let items = JSON.parse (localStorage.getItem('items'));
      cart = new Set(JSON.parse(localStorage.getItem("Cart")));
  let prods = document.getElementById ('product-list');

  for (let i = 0; i < (items? items.length : 0); i++){
    let product = prods.appendChild (document.createElement('product-item'));
        product.setAttribute('src'  , items[i].image);
        product.setAttribute('title', items[i].title);
        product.setAttribute('price', items[i].price);
        product.setAttribute('id'   , items[i].id   );

    if(cart.has(''+(items[i].id))) {product.cartButton();}
  }
  cartCount.innerHTML = cart.size;
});