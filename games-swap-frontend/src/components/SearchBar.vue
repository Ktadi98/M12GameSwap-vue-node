<template>
  <form class="d-flex mb-5 w-75">
    <div class="search d-flex flex-colum align-items-center justify-content-center me-2">
      <img src="/imgs/search-icon.svg" alt="magnifying glass" />
    </div>

    <input
      class="form-control me-2 rounded-5"
      type="search"
      placeholder="Busca un producto"
      aria-label="Search"
    />

    <button class="button" type="submit">Buscar</button>
  </form>
</template>

<style scoped>
.search {
  width: 50px;
  height: 50px;
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
