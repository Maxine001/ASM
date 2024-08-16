import{getProduct} from '../data/products.js';
import{cart, saveToStorage, removeFromCart} from '../data/cart.js';



function renderOrder() {
 let orderSummary = '';
  cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);

  orderSummary +=`
  <div class="cart-item-container js-container-${matchingProduct.id}">
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">
      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          N${matchingProduct.priceCents}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity">${cartItem.quantity}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="quantity-container ">
      <span class="material-symbols-outlined decrease-quantity js-decrease"
      data-product-id="${matchingProduct.id}">remove</span>
      <span class="material-symbols-outlined increase-quantity js-increase"
      data-product-id="${matchingProduct.id}">add</span>
    </div>

    <div class="delete-container">
      <button class="js-delete-button"
      data-product-id="${matchingProduct.id}">
        <span class="material-symbols-outlined">delete</span>
        delete
      </button>
    </div>
  </div>
 `;

 
 document.querySelector('.js-cartSummary').innerHTML = orderSummary;

 });
 increaseQty();
 decreaseQty();
 deleteContainer();
}

 renderOrder();
  

  function deleteContainer() {
    const deleteButton = document.querySelectorAll('.js-delete-button');
    deleteButton.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const container = document.querySelector(`.js-container-${productId}`);
        container.remove();
        removeFromCart(productId);
        saveToStorage();
        renderOrder();
        renderPaymentSummary();
      });
    });
  }

  


  //Increase Cart-Quantity

 function increaseQty() {
  let increaseButton = document.querySelectorAll('.js-increase');
  increaseButton.forEach((addButton) => {
    addButton.addEventListener('click',() => {
      const productId =  addButton.dataset.productId;
      //console.log(productId)
      console.log(cart)
      let matchingItem;
      cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
    
      if(matchingItem) {
        matchingItem.quantity +=1;
      }
      addQuantity();
      renderOrder();
      renderPaymentSummary();
    });
  })
 }

 
  function decreaseQty() {
    let decreaseButton = document.querySelectorAll('.js-decrease');
    decreaseButton.forEach((reduceButton) => {
      reduceButton.addEventListener('click',() => {
        const productId =  reduceButton.dataset.productId;
        //console.log(productId)
        console.log(cart)
        let matchingItem;
        cart.forEach((cartItem) => {
          if(cartItem.productId === productId) {
            matchingItem = cartItem;
          }
        });
      
        if(matchingItem && matchingItem.quantity > 1) {
          matchingItem.quantity -=1;
        }
        addQuantity();
        renderOrder();
        renderPaymentSummary();
      });
    })
  }


 
  

  function addQuantity() {
    let cartQuantity;
    cart.forEach((cartItem) => {
    cartQuantity = cartItem.quantity;
    
    })
    document.querySelector('.js-quantity').innerHTML = cartQuantity;
    saveToStorage();
  }


/*--------------- order section-------------------------- */


export function renderPaymentSummary() {
  let productPriceCents = 0;
  
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
  })
  console.log(productPriceCents)

  const deliveryFee = 2000;
  const totalPrice = productPriceCents + deliveryFee;
  console.log(totalPrice);


  const paymentSummaryHTML = `
  <div class="payment-summary-title">
    Cart Summary
  </div>

  <div class="payment-summary-row">
    <div class ="js-checkout-quantity"></div>
    <div class="payment-summary-money">N${productPriceCents}</div>
  </div>

  <div class="payment-summary-row">
    <div>Delivery fee:</div>
    <div class="payment-summary-money">N${deliveryFee}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">N${totalPrice}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  updateCheckoutQuantity();
}


renderPaymentSummary();


function updateCheckoutQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  saveToStorage();

  document.querySelector('.js-checkout-quantity').innerHTML = `Items:(${cartQuantity})`;
}

updateCheckoutQuantity();