  export let cart = JSON.parse(localStorage.getItem('cart'));
  if(!cart)  {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      priceCent: 90000,
      quantity: 2
    },
    {
      productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
      image: 'images/products/backpack.jpg',
      priceCent: 10000,
      quantity: 1
    }
  ];
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

saveToStorage();


export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}








