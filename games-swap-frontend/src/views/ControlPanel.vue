<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import BackArrow from '@/components/Icons/BackArrow.vue';
import UserInfo from "@/components/Icons/UserIcon.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ModifyUser from '@/components/Icons/ModifyUser.vue';
import DeleteUser from '@/components/Icons/DeleteUser.vue';
import { ref, onMounted } from "vue"
import type { User } from "@/interfaces/User";

const users = ref<User[]>([]);
const columns = [
  { field: "user_name", header: "Usuario" },
  { field: "user_email", header: "Email" },
];

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const fetchUsers = async () => {
  const res = await fetch(`${apiEndpoint}/users/type/client`);
  if (!res.ok) {
    return;
  }
  const usersResult: User[] = await res.json();
  users.value = usersResult;

}

onMounted(async () => {
  await fetchUsers();
})

const modifyUser = (data: any) => {
  alert(`Modificar usuario: ${data.user_name}`);
}

const deleteUser = async (data: any) => {
  if (confirm(`¿Quieres borrar el usuario ${data.user_email}`)) {
    await fetch(`${apiEndpoint}/users/delete`, {
      method: "DELETE", headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, body: JSON.stringify({ userId: data.user_id })
    })
    await fetchUsers();
  }

}

</script>

<template>
  <header>
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" />
    </div>
    <div class="profile-name">Admin</div>
  </header>

  <body>
    <aside class="left-menu">
      <h2>
        <UserInfo /> Usuarios
      </h2>
    </aside>

    <main>
      <div class="heading" style="color: #8a6cf6">
        <BackArrow />
        <h1>Bienvenido al panel de control</h1>
      </div>
      <h2>Listado de usuarios</h2>
      <DataTable :value="users" table-class="display">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        <Column key="modify" header="Modificar">
          <template #body="slotProps">
            <button class="table-options select-modify" @click="modifyUser(slotProps.data)">
              <ModifyUser />
            </button>
          </template>
        </Column>
        <Column key="delete" header="Eliminar">
          <template #body="slotProps">
            <button class="table-options select-delete" @click="deleteUser(slotProps.data)">
              <DeleteUser />
            </button>
          </template>
        </Column>
      </DataTable>
    </main>
  </body>

  <Footer></Footer>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 0;
  align-items: center;
  border-bottom: 1px solid #8a6cf6;
}

.logo img {
  width: 100px;
  height: 100px;
}

body {
  display: flex;
  flex-direction: row;
}

aside.left-menu {
  background-color: rgba(159, 135, 245, 0.5);
  height: 900px;
  padding: 30px 10px;

}

.left-menu h2 {
  font-size: 18px;
  align-items: center;
  display: flex;
  gap: 0.5rem;
}

main {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

main .heading {
  display: flex;
  align-items: center;
  margin-bottom: 60px;
}

main h1 {
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0 auto;
  text-align: center;
  width: 30%;
}


main h2 {
  color: #8a6cf6;
  font-size: 25px;

}

.table-options {
  background-color: white;
  border-color: white;
  color: black;
}

.select-modify:hover {
  color: #FFC125;
}

.select-delete:hover {
  color: #FF1493;
}
</style>
