<template>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <div class="cart-container">
      <div class="cart-header">
        <h2>Carrito de Compra</h2>
      </div>
      <hr class="divider" />
      <div class="cart-items">
        <div class="cart-item">
          <img class="product-image" src="https://via.placeholder.com/150" alt="Imagen del producto" />
          <div class="product-details">
            <p><strong>Nombre:</strong> Resident Evil 7</p>
            <p><strong>Tipo:</strong> PS4, Videojuego</p>
            <p><strong>Precio:</strong> 10€</p>
          </div>
        </div>
        <!-- Puedes agregar más elementos de la lista aquí -->
      </div>
      <hr class="divider" />
      <div class="payment-method">
        <h3>Método de Pago</h3>
        <div class="payment-info">
          <img src="../../public/imgs/visa.png" alt="Visa" class="payment-icon" />
          <p>VISA</p>
          <button class="edit-button">Editar</button>
        </div>
      </div>
      <hr class="divider" />
      <div class="shipping-address">
        <h3>Dirección de Envío</h3>
        <div class="address-info">
          <img src="../../public/imgs/home.svg" alt="Dirección" class="address-icon" />
          <div>
            <p>Carrer Major, 44</p>
            <p>08211, Castellar del Vallès</p>
          </div>
          <button class="edit-button">Editar</button>
        </div>
      </div>
      <hr class="divider" />
      <div class="cart-total">
        <p><strong>Subtotal:</strong> 10€</p>
        <p><strong>Total:</strong> 13€</p>
        <p><strong>Gastos de Envío:</strong> 3€</p>
      </div>
      <hr class="divider" />
      <button class="checkout-button">Continuar con el Pago</button>
    </div>
  </body>
</template>

<style scoped>
.cart-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cart-header h2 {
  text-align: center;
  color: #333;
}

.divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ccc;
}

.cart-items {
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 5px;
}

.product-details p {
  margin: 5px 0;
}

.payment-method,
.shipping-address {
  margin-bottom: 20px;
}

.payment-method h3,
.shipping-address h3 {
  margin-bottom: 10px;
}

.payment-info,
.address-info {
  display: flex;
  align-items: center;
}

.payment-icon,
.address-icon {
  width: 40px;
  margin-right: 10px;
}

.cart-total p {
  margin: 5px 0;
}

.edit-button {
  margin-left: auto;
  padding: 5px 10px;
  background-color: #9f87f5;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #7f67e5;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #9f87f5;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #7f67e5;
}
</style>
