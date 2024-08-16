import {products} from '../data/products.js';
import {cart} from '../data/cart.js'
import {saveToStorage} from '../data/cart.js';



  let pageHTML = '';
  products.forEach((product) => {
  
  pageHTML +=
  `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
      ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
      </div>

      <div class="product-price">
        N${product.priceCents}
      </div>
    
      <button class="buy-button js-add-to-cart"
      data-product-id="${product.id}">
        Buy Now 
      </button>
    </div>
   
`;

});

document.querySelector('.js-products-grid').innerHTML = pageHTML;


  

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  saveToStorage();

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}


export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity +=1;
  }else{
    cart.push({
      productId: productId,
      quantity: 1
    })
  }
  
  saveToStorage();
}


 const buttonElement = document.querySelectorAll('.js-add-to-cart');
  buttonElement.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();

      displayMessage();
    });
  });//add to cart button.. collects each product id


  function displayMessage() {
    const popUp = document.querySelector('#pop-up');
    console.log(popUp)
    popUp.style.display = "block";
    const messageElement = document.querySelector('#pop-up');
    messageElement.innerHTML = 'added to cart successfully!';

    setTimeout(() => {
      popUp.style.display ='none';
    },1000);
  }// displays a pop up message when products are added to cart




  