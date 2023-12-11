<script setup lang="ts"></script>
<template>
    <section
        class="d-flex flex-column flex-md-row justify-content-around align-items-center gap-4 vendor-box py-2 mb-4 px-1 px-md-3">
        <div class="profile-image d-flex gap-2 align-items-center flex-row">
            <img src="@/assets/avatar-profile.svg" alt="Profile Image">
            <div>
                <h2>UserName</h2>
                <p>Valoración : 5</p>
            </div>
        </div>
        <div>
            <p>3 Ventas</p>
            <p>6 Compras</p>
        </div>
    </section>
</template>
<style scoped>
.vendor-box {
    width: 90%;
    border-radius: 10px;
    border: 2px solid rgb(229, 229, 229);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}



.profile-image img {
    width: 50px;
    height: 50px;
    border-radius: 50%;

}
</style>