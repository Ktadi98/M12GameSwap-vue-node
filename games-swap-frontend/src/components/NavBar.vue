<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid d-flex align-items-center">
            <router-link class="logo" to="/">GAMESWAP</router-link>
            <div class="navbar-nav mb-2">
                <button class="button access">ACCEDER</button>
            </div>
        </div>
    </nav>
</template>
<style scoped>
nav {
    border-bottom: 0.5px solid #ABABAB;
    padding: 5px 10px 5px 10px;
}

nav .logo {
    color: #9F87F5;
    font-size: 30px;
}

.access {
    margin-top: 5px;
}

.logo {
    font-size: 30px;
}


/* header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
} */
</style>
