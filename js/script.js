// ----------------- nav bar ---------------- //

const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');

menuBtn.addEventListener('click', () => {
  menu.setAttribute('data-visible', 'true');
  document.body.classList.add('nav-active')
});

closeBtn.addEventListener('click', () => {
  menu.setAttribute('data-visible', 'false');
  document.body.classList.remove('nav-active')
})


// ---------------- cart ---------------- //

// cart display

const cartContainer = document.querySelector('.cart')
const cart = document.querySelector('.cart-container');
const cartBtn = document.querySelector('.cart-btn');

cartContainer.addEventListener('mouseover', () => {
  cart.classList.add('cart-active');
})

cartContainer.addEventListener('mouseout', () => {
  cart.classList.remove('cart-active');
})

cartBtn.addEventListener('click', () => {
  cart.classList.toggle('cart-active');
});


// add to cart

// // product quantity

const minusBtn = document.querySelector('.minus-btn');
const plusBtn = document.querySelector('.plus-btn');
let itemsNumber = 0;

minusBtn.addEventListener('click', () => { itemsNumber--; productQuantity(itemsNumber)})
plusBtn.addEventListener('click', () => { itemsNumber++; productQuantity(itemsNumber)})

function productQuantity(number) {
  if (number < 0){
    itemsNumber = 0;
    number = 0;
  }
  document.querySelector('.number').innerHTML = number;
}

// // adding to the cart

const addBtn = document.querySelector('.add-to-cart-btn');
const cartItem = document.querySelector('.cart-items');

addBtn.addEventListener('click', () => {
  if (itemsNumber == 0) return
  cartItem.innerHTML = `
    <div>
      <img src="assets/images/image-product-1-thumbnail.jpg" alt="product">
      <div>
        <p>Autumn Limited Edition...</p>
        <p>$150.00 x ${itemsNumber} <span>$${150 * itemsNumber}.00</span></p>
      </div>
      <div class="delete-btn">
        <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use class="delete-btn" fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
      </div>
    </div>
    <button class="checkout-btn">Checkout</button> `;

    cart.classList.add('cart-active');
    setTimeout(() => {cart.classList.remove('cart-active');}, 4000);

    document.querySelector('.cart-indicator--inactive').innerHTML = itemsNumber;
    document.querySelector('.cart-indicator--inactive').classList.add('cart-indicator');
})


// deleting items

cartItem.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn') || e.target.parentELement.classList.contains('delete-btn')) {
    if (confirm('You want to delete all selected products')) 
    cartItem.innerHTML = '<p class="empty-statement">Your cart is empty.</p>';
    document.querySelector('.cart-indicator--inactive').innerHTML = '';
    document.querySelector('.cart-indicator--inactive').classList.remove('cart-indicator');
  };
})


// checkout 

cartItem.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkout-btn')) {
    location.reload();
  }
})


// ----------------------- image slider -------------------- //

// automatic slider

let imgNumber = 1;

setInterval(() => {  
  document.getElementById(`input-${imgNumber}`).checked = true;
  document.getElementById(`light-box-input-${imgNumber}`).checked = true;
  thumbnailSlider(imgNumber);
  imgNumber ++;

  if(imgNumber > 4){
    imgNumber = 1;
  }
}, 3000)  

function thumbnailSlider(number) {
  for (let x of lightboxThumbnails) {
    x.classList.remove('active');
  }
  for (let x of thumbnails) {
    x.classList.remove('active');
  }
  document.querySelector(`.thumbnails-container label:nth-child(${number})`).classList.add('active')
  document.querySelector(`.light-box-thumbnails label:nth-child(${number})`).classList.add('active')
}


// thumbnail

const thumbnails = document.querySelectorAll('.thumbnails-container label');
const lightboxThumbnails = document.querySelectorAll('.light-box-thumbnails label');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    for (let x of thumbnails) {
      x.classList.remove('active');
    }
    thumbnail.classList.add('active');
    imgNumber = parseInt(thumbnail.getAttribute('data-thumbnail'));
  });
})

lightboxThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () =>  {
    imgNumber = parseInt(thumbnail.getAttribute('data-thumbnail'));
    document.getElementById(`input-${imgNumber}`).checked = true;
    thumbnailSlider(imgNumber);
  })
});


// prev and next btn

const prevBtn = document.querySelectorAll('.prev-btn');
const nextBtn = document.querySelectorAll('.next-btn');
let btnNumber = 1;

prevBtn.forEach(btn => btn.addEventListener('click', () => {btnNumber--; imageSlider(btnNumber); }) )
nextBtn.forEach(btn => btn.addEventListener('click', () => {btnNumber++; imageSlider(btnNumber); }) )

function imageSlider(number) {
  if (number < 1) {
    btnNumber = 4;
  } else if (number > 4) {
    btnNumber = 1;
  }

  document.getElementById(`input-${btnNumber}`).checked = true;
  document.getElementById(`light-box-input-${btnNumber}`).checked = true;  
  thumbnailSlider(btnNumber);
}


// ----------------------- lightbox --------------------- //

const slidesContainer = document.querySelector('.slides-container');
const lightboxCloseBtn = document.querySelector('.light-box-close-btn');

slidesContainer.addEventListener('click', () => { 
  document.querySelector('.light-box-wrapper').classList.add('light-box--active');
  document.querySelector('.light-box').classList.add('enter-animation');
  setTimeout(() => document.querySelector('.light-box').classList.remove('enter-animation'), 2000);
})

lightboxCloseBtn.addEventListener('click', () => {  
  document.querySelector('.light-box').classList.add('exit-animation');
  setTimeout(() => {
    document.querySelector('.light-box').classList.remove('exit-animation')
    document.querySelector('.light-box-wrapper').classList.remove('light-box--active');
  }, 1000)
});