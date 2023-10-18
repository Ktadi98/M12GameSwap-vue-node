<template>
    <div class="suggestion-modal" v-if="showSuggestionBox">
      <button class="close-button" @click="toggleSuggestionBox">X</button>
      <h2>Deja tus sugerencias</h2>
      <form @submit="submitSuggestion">
        <textarea v-model="suggestion" placeholder="Escribe tu sugerencia aquí"></textarea>
        <button type="submit" class="rounded-button">Enviar Sugerencia</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        suggestion: "",
        showSuggestionBox: false,
      };
    },
    methods: {
      submitSuggestion() {
        console.log("Sugerencia enviada:", this.suggestion);
        this.suggestion = "";
      },
      toggleSuggestionBox() {
        this.showSuggestionBox = !this.showSuggestionBox;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilo del modal */
  .suggestion-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  /* Estilos del contenido del modal */
  .suggestion-modal h2 {
    color: #9f87f5;
  }
  
  .suggestion-modal textarea {
    width: 100%;
    height: 100px;
    margin: 10px 0;
    padding: 10px;
    border-radius: 29px;
    border: 3px solid #9f87f5;
    background: #f6f6f6;
  }
  
  .suggestion-modal button {
    background-color: #9f87f5;
    color: white;
    width: 70%;
    margin: 0 auto;
  }
  
  .suggestion-modal button:hover {
    background-color: #8a6cf6;
  }
  
  .suggestion-modal .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #9f87f5;
  }
  
  .suggestion-modal .close-button:hover {
    color: #8a6cf6;
  }
  </style>
  