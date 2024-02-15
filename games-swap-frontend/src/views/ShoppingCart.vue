<template>
  <div class="cart-container">
    <div class="cart-header">
      <h2>Carrito de Compra</h2>
    </div>
    <hr class="divider" />
    <div class="cart-items">
      <div class="cart-item" v-if="cartItems.length > 0">
        <img :src="$route.query.photo as string || '/public/static/images/default.jpg'" :alt="'Imagen del producto'" class="product-image" />
        <div class="product-details">
          <p><strong>Nombre:</strong> {{ $route.query.title }}</p>
          <p><strong>Precio:</strong> {{ $route.query.price }}€</p>
        </div>
      </div>
    </div>
    <hr class="divider" />
    <div class="payment-method">
      <h3>Método de Pago</h3>
      <div class="payment-info">
        <img src="/imgs/visa.png" alt="Visa" class="payment-icon" />
        <p>{{ maskedPaymentMethod || 'VISA' }}</p>
        <input type="button" class="edit-button" @click="openEditPopup('payment')" value="Editar">
      </div>
    </div>
    <hr class="divider" />
    <div class="shipping-address">
      <h3>Dirección de Envío</h3>
      <div class="address-info">
        <img src="/imgs/home.svg" alt="Dirección" class="address-icon" />
        <div>
          <p>{{ newAddress || 'Carrer Major, 44' }}</p>
          <p>{{ newPostalCode || '08211, Castellar del Vallès' }}</p>
        </div>
        <input type= "button" class="edit-button" @click="openEditPopup('shipping')" value="Editar">
      </div>
    </div>
    <hr class="divider" />
    <div class="cart-total">
      <p><strong>Subtotal:</strong> {{ $route.query.price }}€</p>
      <p><strong>Gastos de Envío:</strong> 3€ </p>
      <p><strong>Total:</strong>{{ totalPrice }}€</p>
    </div>
    <hr class="divider" />
    <button class="checkout-button" @click="makePurchase">Continuar con el Pago</button>
  </div>

  <!-- Popup de Edición -->
  <div v-if="showEditPopup" class="edit-popup">
    <div class="edit-popup-content">
      <form v-if="editType === 'shipping'" class="edit-form" id="shipping-form">
        <label for="edit-address">Nueva Dirección:</label>
        <input type="text" id="edit-address" v-model="newAddress" name="edit-address"
          placeholder="Introduce la nueva dirección" required>
        <label for="edit-postal-code">Nuevo Código Postal:</label>
        <input type="text" id="edit-postal-code" v-model="newPostalCode" name="edit-postal-code"
          placeholder="Introduce el nuevo código postal" required>
        <div class="divider"></div>
        <button type="submit" @click.prevent="saveShippingAddress">Guardar Cambios</button>
      </form>
      <button @click="closeEditPopup">Cerrar</button>
    </div>
  </div>

  <!-- Popup de Edición del Método de Pago -->
  <div v-if="editType === 'payment' && showEditPopup" class="edit-popup">
      <div class="edit-popup-content">
        <form id="edit-payment-form">
          <label for="edit-card">Número de Tarjeta:</label>
          <input type="text" id="edit-card" v-model="paymentPopupInput" name="edit-card"
                 placeholder="Introduce el número de tarjeta" required inputmode="numeric" @input="validateCreditCard">
          <p v-if="paymentInputError" class="error-message">Solo se admiten números</p>
          <div class="divider"></div>
          <button type="submit" @click.prevent="saveEditedPaymentMethod">Guardar Cambios</button>
        </form>
        <button @click="closeEditPopup">Cerrar</button>
      </div>
    </div>
</template>

<script setup lang="ts">
import useCustomToast from '@/composables/useCustomToast';
import router from '@/router';
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';


const showEditPopup = ref(false);
const editType = ref('');
const newAddress = ref('Carrer Major, 44');
const newPostalCode = ref('08211, Castellar del Vallès');
const shippingCost = 3;
const authStore = useAuthStore();

const cartItems = ref([
  { name: 'Resident Evil 7', type: 'PS4, Videojuego', price: 10, image: 'backend/public/static/images/r4-remake.jpg' },
]);
const maskedPaymentMethod = ref('');
const paymentPopupInput = ref('');
const paymentInputError = ref(false);
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const { triggerToast } = useCustomToast("¡La compra se ha finalizado con éxito!");


const openEditPopup = (type: string) => {
  showEditPopup.value = true;
  editType.value = type;
};

const closeEditPopup = () => {
  showEditPopup.value = false;
};

const saveShippingAddress = () => {
  console.log("Nueva dirección de envío:", newAddress.value);
  console.log("Nuevo código postal:", newPostalCode.value);
  // Aquí puedes agregar manejo de errores y confirmaciones visuales
};

const saveEditedPaymentMethod = () => {
  if (!/^\d+$/.test(paymentPopupInput.value)) {
    // Mostrar mensaje de error si no se ingresan solo números
    paymentInputError.value = true;
    return;
  }
  maskedPaymentMethod.value = paymentPopupInput.value.replace(/\d(?=\d{4})/g, '*');
  closeEditPopup();
};

const route = useRoute();

const productPrice = parseInt(route.query.price as string);

const totalPrice = computed(() => {
  return productPrice + shippingCost;
});


const validateCreditCard = () => {
  if (!/^\d+$/.test(paymentPopupInput.value)) {
    paymentInputError.value = true;
  } else {
    paymentInputError.value = false;
  }
};


const makePurchase = async () =>
{
  try{

    const response = await fetch(`${apiEndpoint}/posts/purchase/${route.query.id}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${authStore.getToken()}`
            },
        }
        );

        if (!response.ok) {
            return;
        }

        //Toast success trigger
        triggerToast();

        //We redirect to the user's posts list.
        router.push("/userProfile/purchases");

  } catch (error){
    console.error(error)
  }
}
</script>


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

.edit-popup {
  display: block;
  /* Cambiado de 'none' a 'block' */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.edit-popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  /* Cambiado de 5px a 10px */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.edit-form button {
  padding: 10px 20px;
}

.edit-form button:hover {
  background-color: #7f67e5;
  transform: scale(1.05);
}


.edit-form label {
  display: block;
  margin-bottom: 10px;
}

.edit-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}


.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
