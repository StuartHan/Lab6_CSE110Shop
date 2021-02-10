// product-item.js
// @author: Yichen Han
// @date  : Feb 10 2020

class ProductItem extends HTMLElement {
  // Constructor:
  constructor(thisTitle, thisImage, thisPrice) {
    super(); // HTMLElement constructor
    this.attachShadow({mode: 'open'}); // open shadow DOM


    var curr = this;
  
    var cont = document.createElement('ul');
        cont.setAttribute('class', 'flex-container');
        cont.setAttribute('id'   , 'product-list');

    var list = cont.appendChild(document.createElement('li'));
        list.setAttribute('class', 'product');

    var image = this.image = list.appendChild(document.createElement('img'));
        image.setAttribute('width', 200);
        image.src = thisImage;
        image.alt = thisTitle;
  
    var title = this.title = list.appendChild(document.createElement('p'));
        title.setAttribute('class', 'title');
        title.textContent = thisTitle;
  
    var price = this.price = list.appendChild(document.createElement('p'));
        price.setAttribute('class', 'price');
        price.textContent = "$" + thisPrice;
  
    var button = this.button = list.appendChild(document.createElement('button'));
    button.onclick = function() {
      let cart      = document.getElementById('cart-count');
      let cartProds = JSON.parse(localStorage.getItem('cart-items'));
      if (this.textContent == 'Add to Cart') {
        alert('Added to Cart!');
        this.textContent = 'Remove from Cart';
        cart.textContent = parseInt(cart.textContent) + 1;
        cartProds.push(curr.getAttribute('id'));
      }
      else {
        this.textContent = 'Add to Cart';
        alert('Removed from Cart!'); 
        cart.textContent = parseInt(cart.textContent) - 1;
        cartProds.splice(cartProds.indexOf(curr.getAttribute('id')), 1);
      }
      localStorage.setItem('cart-items', JSON.stringify(cartProds));
    }

    let style = document.createElement('style')
    style.textContent = 
    `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
      
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
        
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
        
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
        
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
        
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
        
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `

    button.textContent = 'Add to Cart';
    button.addEventListener;
    this.shadowRoot.append(style, cont);
  }
  
  

  /* LAST PART: Reserve cart when refreshing page */
  static get observedAttributes() {
    return ['id'];
  }

  attributeChangedCallback(attr, oriVal, newVal) {
    let cart      = document.getElementById('cart-count');
    let cartProds = JSON.parse(localStorage.getItem('cart-items'));

    if (cartProds && cartProds.includes(newVal)) {
      this.button.textContent = 'Remove from Cart';
      cart.textContent = parseInt(cart.textContent) + 1;
    }
    else {
      this.button.textContent = 'Add to Cart';
    }
  }

}
  
  
  
customElements.define('product-item', ProductItem);