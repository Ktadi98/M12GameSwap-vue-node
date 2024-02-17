<template>
    <div class>
        <h1>404 | Not Found</h1>
        <input type="button" @click="$router.push('/')" value="Volver a la página de inicio">
    </div>
</template>

<style scoped>
div {
    height: 100vh;
    background-image: url(/imgs/404.gif);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    width: max-content;
    height: max-content;
}


h1 {
    margin: 4rem;
}
</style>