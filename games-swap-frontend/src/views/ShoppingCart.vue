<!-- <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { usePostsHistoryStore } from '@/stores/postsHistory';
  import { useUserReservationsStore } from '@/views/UserReservations.vue';

  const { history } = usePostsHistoryStore();
  const { reservations } = useUserReservationsStore();

  const productDetails = ref({
    productName: '',
    productType: '',
    productPrice: '',
    productImage: '',
  });

  onMounted(async () => {
    await reservations.getReservedProducts();
    if (reservations.reservations.length > 0) {
      const reservation = reservations.reservations[0]; // You may need to adjust this logic
      const product = history.history.find(p => p.post_id === reservation.post.post_id);
      if (product) {
        productDetails.value.productName = product.productName;
        productDetails.value.productType = product.productType;
        productDetails.value.productPrice = product.productPrice;
        productDetails.value.productImage = product.productImage;
      }
    }
  });
</script> -->



<template>
  <div class="purchase-ticket">
    <div class="details-wrapper">
      <div class="details-container">
        <h2 class="title">Mi Carro</h2>
        <p class="detail-description">DETALLE DE LA COMPRA</p>
        <img class="product-image" :src="productDetails.productImage" alt="Product Image" />
        
        <p class="product-info">
          <span class="label">Nombre:</span> {{ productDetails.productName }}
        </p>
        <p class="product-info">
          <span class="label">Tipo:</span> {{ productDetails.productType }}
        </p>
        <p class="product-info">
          <span class="label">Precio:</span> {{ productDetails.productPrice }}€
        </p>
            <div class="shipping-details">
              <h3>Dirección de envío</h3>
              <div class="address">
                <img class="address-icon" src="../../public/imgs/home.svg" alt="Home Icon" />
                <div class="address-info">
                  <p class="street">{{ reservation.shippingDetails?.street }}</p>
                  <p class="zip-city">{{ reservation.shippingDetails?.zipCode }}, {{ reservation.shippingDetails?.city }}</p>
                </div>
              </div>
            </div>
            <div class="payment-details">
              <h3>Método de pago</h3>
              <div class="payment-info">
                <p class="method">{{ reservation.paymentDetails?.paymentMethod }}</p>
                <img class="card-image" :src="reservation.paymentDetails?.cardImage" alt="Card Image" />
                <p class="card-number">{{ reservation.paymentDetails?.cardNumber }}</p>
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          No has realizado la reserva de ningún producto todavía
        </template>
      </div>
    </div>
  </div>
</template>




<style scoped>
.tiquet-de-compra {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.tiquet-de-compra .overlap-group-wrapper {
  background-color: #ffffff;
  width: 709px;
  height: 1805px;
}

.tiquet-de-compra .overlap-group {
  position: relative;
  width: 607px;
  height: 1652px;
  top: 77px;
  left: 51px;
  background-color: #f1f1f1;
  border-radius: 27px;
  border: 1px solid;
  border-color: #000000;
}

.tiquet-de-compra .text-wrapper {
  position: absolute;
  width: 156px;
  height: 46px;
  top: 201px;
  left: 30px;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 700;
  color: #000000;
  font-size: 24px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .div {
  position: absolute;
  width: 432px;
  height: 85px;
  top: 51px;
  left: 79px;
  font-family: "Inter-Medium", Helvetica;
  font-weight: 500;
  color: #9f87f5;
  font-size: 30px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .rectangle {
  position: absolute;
  width: 107px;
  height: 127px;
  top: 264px;
  left: 54px;
  object-fit: cover;
}

.tiquet-de-compra .nombre-resident-evil {
  position: absolute;
  width: 188px;
  height: 29px;
  top: 273px;
  left: 246px;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 700;
  color: transparent;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .span {
  color: #9f87f5;
}

.tiquet-de-compra .text-wrapper-2 {
  color: #000000;
}

.tiquet-de-compra .tipo-videojuego {
  position: absolute;
  width: 178px;
  height: 26px;
  top: 302px;
  left: 247px;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 400;
  color: transparent;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .text-wrapper-3 {
  font-weight: 700;
  color: #9f87f5;
}

.tiquet-de-compra .text-wrapper-4 {
  font-family: "Inter-Regular", Helvetica;
  color: #000000;
}

.tiquet-de-compra .precio {
  position: absolute;
  width: 160px;
  height: 30px;
  top: 335px;
  left: 246px;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 400;
  color: transparent;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .text-wrapper-5 {
  position: absolute;
  width: 201px;
  height: 40px;
  top: 543px;
  left: 30px;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 700;
  color: #000000;
  font-size: 20px;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .overlap {
  position: absolute;
  width: 548px;
  height: 108px;
  top: 607px;
  left: 30px;
  background-color: #f1f1f1;
  border-top-width: 1px;
  border-top-style: solid;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #878787;
}

.tiquet-de-compra .layer-wrapper {
  position: absolute;
  width: 87px;
  height: 82px;
  top: 13px;
  left: 15px;
  border-radius: 20px;
  border: 1px solid;
  border-color: #878787;
}

.tiquet-de-compra .layer {
  position: absolute;
  width: 56px;
  height: 55px;
  top: 12px;
  left: 15px;
}

.tiquet-de-compra .overlap-2 {
  position: absolute;
  width: 198px;
  height: 49px;
  top: 18px;
  left: 149px;
}

.tiquet-de-compra .text-wrapper-6 {
  position: absolute;
  width: 186px;
  height: 35px;
  top: 0;
  left: 0;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 700;
  color: #000000;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .text-wrapper-7 {
  position: absolute;
  width: 198px;
  height: 18px;
  top: 31px;
  left: 0;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.tiquet-de-compra .text-wrapper-8 {
  width: 52px;
  height: 73px;
  top: 20px;
  left: 494px;
  font-size: 36px;
  position: absolute;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .overlap-3 {
  position: absolute;
  width: 548px;
  height: 108px;
  top: 804px;
  left: 30px;
  background-color: #f1f1f1;
  border-top-width: 1px;
  border-top-style: solid;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #878787;
}

.tiquet-de-compra .text-wrapper-9 {
  position: absolute;
  width: 186px;
  height: 35px;
  top: 11px;
  left: 149px;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 700;
  color: #000000;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .frame-wrapper {
  position: absolute;
  width: 87px;
  height: 82px;
  top: 13px;
  left: 18px;
  border-radius: 20px;
  border: 1px solid;
  border-color: #878787;
}

.tiquet-de-compra .frame {
  position: absolute;
  width: 66px;
  height: 58px;
  top: 11px;
  left: 10px;
}

.tiquet-de-compra .text-wrapper-10 {
  width: 154px;
  height: 18px;
  top: 52px;
  left: 149px;
  font-size: 16px;
  white-space: nowrap;
  position: absolute;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .text-wrapper-11 {
  width: 52px;
  height: 73px;
  top: 9px;
  left: 491px;
  font-size: 36px;
  position: absolute;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .text-wrapper-12 {
  position: absolute;
  width: 182px;
  height: 35px;
  top: 753px;
  left: 32px;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 700;
  color: #000000;
  font-size: 20px;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .text-wrapper-13 {
  top: 1250px;
  left: 444px;
  position: absolute;
  width: 109px;
  height: 27px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.tiquet-de-compra .text-wrapper-14 {
  top: 1105px;
  left: 439px;
  position: absolute;
  width: 109px;
  height: 27px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.tiquet-de-compra .text-wrapper-15 {
  width: 109px;
  height: 27px;
  top: 1143px;
  left: 444px;
  font-size: 24px;
  white-space: nowrap;
  position: absolute;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .text-wrapper-16 {
  position: absolute;
  width: 309px;
  height: 41px;
  top: 1012px;
  left: 30px;
  font-family: "Inter-Bold", Helvetica;
  font-weight: 700;
  color: #000000;
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
}

.tiquet-de-compra .text-wrapper-17 {
  position: absolute;
  width: 109px;
  height: 27px;
  top: 1105px;
  left: 30px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.tiquet-de-compra .text-wrapper-18 {
  position: absolute;
  width: 76px;
  height: 27px;
  top: 1250px;
  left: 34px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.tiquet-de-compra .text-wrapper-19 {
  position: absolute;
  width: 218px;
  height: 27px;
  top: 1156px;
  left: 30px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #000000;
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.tiquet-de-compra .div-wrapper {
  position: absolute;
  width: 320px;
  height: 61px;
  top: 1464px;
  left: 144px;
  background-color: #9f87f5;
  border-radius: 19px;
}

.tiquet-de-compra .text-wrapper-20 {
  position: absolute;
  width: 216px;
  height: 31px;
  top: 14px;
  left: 53px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #ffffff;
  font-size: 30px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

</style>
