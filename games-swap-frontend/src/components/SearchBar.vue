<template>
  <form class="d-flex mb-5 w-75">
    <div class="search w-100 d-flex gap-2 flex-column flex-md-row align-items-center justify-content-center me-2">
      <div class="d-flex justify-content-center align-items-center">
        <img src="/imgs/search-icon.svg" alt="magnifying glass" />
      </div>
      <input class=" rounded-5 flex-grow-1" type="search" placeholder="Busca un producto" aria-label="Search" />
      <button class="button" type="submit">Buscar</button>
    </div>
  </form>
</template>

<style scoped>
button {
  width: fit-content;
}

.search {
  width: 50px;
  height: 50px;
}

input {
  margin-bottom: 0;
}

input::placeholder {
  font-size: 1.2rem;
}

input:focus,
input[type]:focus,
.uneditable-input:focus {
  border: 2px solid black;
  outline: none !important;
  box-shadow: none;
}
</style>
