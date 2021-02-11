// product-item.js
// @author: Yichen Han
// @data:   Feb 10 2020
// @url :   http://127.0.0.1:5500/index.html

class ProductItem extends HTMLElement {
  
  /* Constructor */
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    let shadow = this.shadowRoot;

    //list (li)
    var list = shadow.appendChild (document.createElement ('li'));
        list.setAttribute('class', 'product');

    //image (img)
    var image = list.appendChild (document.createElement ('img'));

    //title (p)
    var title = list.appendChild (document.createElement ('p'));
        title.setAttribute('class', 'title');

    //price (p)
    var price = list.appendChild (document.createElement ('p'));
        price.setAttribute('class', 'price');

    //button (b)
    var button = list.appendChild (document.createElement ('button'));
        button.innerHTML = "Add to Cart";
        button.onclick = 
          function() {
            let cartid = button.parentElement.dataset.cartid;
            if (button.innerHTML == 'Add to Cart') {
              alert('Added to Cart!');
              cart.add(cartid);
              button.innerHTML = 'Remove from Cart';
            }
            else {
              alert('Removed from Cart!');
              cart.delete(cartid);
              button.innerHTML = 'Add to Cart';
            }
            cartCount.innerHTML = cart.size;
            localStorage.setItem('Cart', JSON.stringify(Array.from(cart)));
          }

    //style (style)
    let style = shadow.appendChild (document.createElement('style'));
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
  }



  /* Resume cart */
  static get observedAttributes(){
    return ['src', 'title', 'price', 'id'];
  }

  attributeChangedCallback(attr, oldVal, newVal){
    let currProd = this.shadowRoot.firstChild;
    // image
    let currImg = currProd.getElementsByTagName ('img') [0];
        currImg.src = this.getAttribute ('src');
        currImg.alt = this.getAttribute ('title');
    // title
    let currTit = currProd.getElementsByClassName ('title') [0];
        currTit.innerHTML = this.getAttribute ('title');
    // price
    let currPri = currProd.getElementsByClassName ('price') [0];
        currPri.innerHTML = '$' + this.getAttribute ('price');
    // id
    currProd.dataset.cartid = this.getAttribute ('id');
  }



  /* Change buttom text of product in cart */
  cartButton () {
    this.shadowRoot.firstChild.getElementsByTagName ('button')[0]
      .innerHTML = 'Remove from Cart';
  }
}

customElements.define('product-item', ProductItem);