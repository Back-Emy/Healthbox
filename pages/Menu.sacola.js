// Adiciona um listener de evento a todos os botões "Adicionar à Sacola"
var addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var product = this.parentNode;
    var productName = product.querySelector('h3').innerText;
    
    var cartItem = document.createElement('li');
    cartItem.innerText = productName;
    document.querySelector('.cart-items').appendChild(cartItem);
  });
});

// Mostra ou oculta a sacola quando o ícone de sacola é clicado
document.querySelector('.cart-icon').addEventListener('click', function() {
  var dropdown = document.querySelector('.cart-dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});

// Listener de evento para calcular frete
document.querySelector('.calculate-shipping').addEventListener('click', function() {
  // Lógica para calcular frete
  // ...
  
  var totalPrice = 100; // Exemplo: preço total das compras
  document.querySelector('.total-price').innerText = 'R$ ' + totalPrice.toFixed(2);
});

// Listener de evento para finalizar compra
document.querySelector('.checkout').addEventListener('click', function() {
  // Lógica para finalizar a compra
  // ...
});