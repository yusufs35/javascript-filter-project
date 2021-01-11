
var itemsContainer = document.getElementById('store-items');
var items = document.querySelectorAll('#store-items .store-item');
var buttons = document.querySelectorAll('.sortBtn a');
var txtSearch = document.getElementById('search-item');
var cart = [
     {id: "6", image: "cupcake-2.jpeg", price: 10, quantity: 1, subtotal: 10, title: "cupcake item"},
     {id: "4", image: "doughnut-1.jpeg", price: 5, quantity: 1, subtotal: 5, title: "dougnut item"}
];

buttons.forEach(function(button){
	button.addEventListener('click', function(e){
		e.preventDefault();
		var keyword = e.target.getAttribute("data-filter");
		filterItems(keyword);
	});
});


txtSearch.addEventListener('input', function(e){
	filterItems(e.target.value);
});

function filterItems(keyword){
	itemsContainer.innerText='';
	
	items.forEach(function(item){
		if(!keyword || keyword == 'all' || item.getAttribute("data-item").toLowerCase().includes(keyword.toLowerCase())){
			itemsContainer.appendChild(item);
		}
		
	});
}



document.getElementById('cart-info').addEventListener('click', function(e){
     cartEl = document.getElementById('cart').classList.toggle('show-cart');
});


document.querySelectorAll('.store-item-icon').forEach(function(item){
     item.addEventListener('click', function(e){
          e.preventDefault();
          var cardEl = e.target.closest('.card');

          cardEl.classList.add('loading');
          setTimeout(function(){
               var arr = cart.filter(function(item){
                    return item.id == e.target.dataset.id
               });
     
               if(arr.length>0){
                    arr[0].quantity++;
                    arr[0].subtotal += parseInt(e.target.dataset.price);
               }
               else{
                    cart.push({
                         id:e.target.dataset.id, 
                         quantity:1, 
                         title: e.target.dataset.title, 
                         price: parseInt(e.target.dataset.price), 
                         subtotal: parseInt(e.target.dataset.price), 
                         image: e.target.dataset.image});
               }
               
               fillCart();
               cardEl.classList.remove('loading');
               
          },1000);

          
     });
});


function fillCart(){
     var cartEl = document.querySelector('.cart-items');
     var cartTotalEl = document.querySelector('#cart-total');
     var itemCountEl = document.querySelector('#item-count');
     var itemTotalEl = document.querySelector('.item-total');
     var cartButtonsEl = document.querySelector('.cart-buttons-container');

     
     
     cartEl.innerText='';

     cart.forEach(function(item){
          var cartHtml = '<div class="cart-item d-flex justify-content-between text-capitalize my-3">'+
          '<img src="img/' + item.image + '" class="img-fluid rounded-circle cart-image" id="item-img" alt="">'+
          '<div class="item-text">'+

          '<p id="cart-item-title" class="font-weight-bold mb-0">' + item.title + '</p>'+
          '  <p id="cart-item-price" class="mb-0">$ ' + item.price + '  (' + item.quantity + ' qty)</p>'+
          '</div>'+
          '<a href="#" class="cart-item-remove" onclick="removeCartItem(' + item.id + ')">'+
          '  <i class="fas fa-trash"></i>'+
          '</a>'+
          '</div>';
          cartEl.insertAdjacentHTML('beforeend', cartHtml);
     });
     var totalPrice = getTotalPrice();
     cartTotalEl.innerText = totalPrice;
     itemCountEl.innerText = cart.length;
     itemTotalEl.innerText = totalPrice;

     if(cart.length<=0){
          cartButtonsEl.classList.replace('d-flex','d-none');
     } 
     else {
          cartButtonsEl.classList.replace('d-none','d-flex');
     }
}

function getTotalPrice(){
     var total = 0;
     cart.forEach(function(item){
          total += item.subtotal
     });
     return total;
}

function removeCartItem(id){
     cart = cart.filter(function(item){
          return item.id != id;
     });
     fillCart();
}

function clearCart(){
     cart = [];
     fillCart();
}

fillCart();
