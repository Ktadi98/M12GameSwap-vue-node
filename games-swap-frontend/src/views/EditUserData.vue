<template>
  <NavBar></NavBar>
  <div>
    <h1>Editar Datos de Usuario</h1>
    <div class="form-group">
      <label for="username">Nombre de usuario:</label>
      <div class="input-container">
        <input v-model="userData.username" :readonly="!editMode.username" type="text" id="username">
        <button @click="toggleEditMode('username')">{{ editMode.username ? 'Guardar' : 'Editar' }}</button>
      </div>
    </div>
    <div class="form-group">
      <label for="email">Correo electrónico:</label>
      <div class="input-container">
        <input v-model="userData.email" :readonly="!editMode.email" type="email" id="email">
        <button @click="toggleEditMode('email')">{{ editMode.email ? 'Guardar' : 'Editar' }}</button>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import NavBar from '@/components/NavBar.vue';

  interface EditMode {
    username: boolean;
    email: boolean;
  }
  
  const userData = ref({
    username: 'usuarioEjemplo',
    email: 'ejemplo@correo.com',
    // Otros campos de datos de usuario
  });
  
  const editMode = ref<EditMode>({
    username: false,
    email: false,
    // Otros campos de edición
  });
  
  const toggleEditMode = (field: keyof EditMode) => {
    editMode.value[field] = !editMode.value[field];
    if (!editMode.value[field]) {
      // Aquí podrías realizar la lógica para guardar los cambios en el campo correspondiente
      console.log(`Guardando cambios en ${field}: ${userData.value[field]}`);
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para el formulario */
  .form-group {
    margin-bottom: 1rem;
  }
  
  .input-container {
    position: relative;
    display: inline-block;
  }
  
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
  }
  
  button {
    position: absolute;
    top: 0;
    right: -60px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #9f87f5;
    color: #fff;
    cursor: pointer;
  }
  </style>
  