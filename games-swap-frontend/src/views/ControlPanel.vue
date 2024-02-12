<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import BackArrow from '@/components/Icons/BackArrow.vue';
import UserInfo from "@/components/Icons/UserIcon.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ModifyUser from '@/components/Icons/ModifyUser.vue';
import DeleteUser from '@/components/Icons/DeleteUser.vue';
import ActivateUser from '@/components/Icons/ActivateUser.vue';

import { ref, onMounted } from "vue";
import type { User } from "@/interfaces/User";
import type { Reservation } from "@/interfaces/Reservation";
import { storeToRefs } from "pinia";
import type { Complaint } from "@/interfaces/Complaint";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const users = ref<User[]>([]);
const columns = [
  { field: "user_name", header: "Usuario" },
  { field: "user_email", header: "Email" },
];

const userSelected = ref<null | string>(null);

const complaints = ref<Complaint[]>([]);

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const fetchUsers = async () => {
  const res = await fetch(`${apiEndpoint}/users/type/client`);
  if (!res.ok) {
    return;
  }
  const usersResult: User[] = await res.json();
  // To drop admin from the user list!
  users.value = usersResult.filter(user => user.user_email !== "admin@gmail.com");

}

onMounted(async () => {
  await fetchUsers();
})

const modifyUser = (data: any) => {
  alert(`Modificar usuario: ${data.user_name}`);
}

const deleteUser = async (data: any) => {
  if (confirm(`¿Quieres desactivar el usuario ${data.user_name}`)) {
    await fetch(`${apiEndpoint}/users/delete`, {
      method: "DELETE", headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, body: JSON.stringify({ userId: data.user_id })
    })
    await fetchUsers();
  }

}

//TODO
const activateUser = async (data: any) => {
  if (confirm(`¿Quieres activar el usuario ${data.user_name}`)) {
    await fetch(`${apiEndpoint}/users/activate`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, body: JSON.stringify({ userId: data.user_id })
    })
    await fetchUsers();
  }

}

const getReports = async (userData: any) => {
  //console.log(userData.user_id);
  try {
    const response: Response = await fetch(`${apiEndpoint}/complaints/${userData.user_id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token.value}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const complaintsData: { complaints: Complaint[] } = await response.json();
    complaints.value = complaintsData.complaints;
    console.log(complaints.value);

    //Set Current User to show his reports
    userSelected.value = userData.user_name;

  } catch (error) {
    console.error(error);
  }
}

const dropPost = async (data: any) => {
  if (confirm(`¿Quieres dar de baja el anuncio "${data.post.post_title}"`)) {
    await fetch(`${apiEndpoint}/posts/drop/${data.post.post_id}`, {
      method: "PATCH", headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token.value}`
      }
    })
    await getReports(data);
  }
};

const authStore = useAuthStore();
const router = useRouter();

const logOut = () => {
  authStore.deleteToken();
  authStore.isAdmin = false;
  router.push("/");
};

</script>

<template>
  <!-- <aside class="left-menu">
      <h2>
        <UserInfo /> Usuarios
      </h2>
    </aside> -->

  <main class="px-5">
    <header class="d-flex flex-row-reverse">
      <ul>
        <li><button class="logOut-btn p-2" @click="logOut()">Cerrar Sesión</button></li>
      </ul>
    </header>
    <div class="heading display-6 px-3 py-3">
      <p>Bienvenido al panel de control</p>
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
          <button v-if="slotProps.data.user_active" class="table-options select-delete"
            @click="deleteUser(slotProps.data)">
            <DeleteUser />
          </button>
          <button v-else class="table-options select-activate" @click="activateUser(slotProps.data)">
            <ActivateUser />
          </button>
        </template>
      </Column>
      <Column class="report" key="delete" header="Denuncias">
        <template #body="slotProps">
          <button class="table-options select-delete" @click="getReports(slotProps.data)">
            Mostrar Denuncias
          </button>
        </template>
      </Column>
      <Column class="report" key="state" header="Estado">
        <template #body="slotProps">
          <div class="table-options select-delete" @click="getReports(slotProps.data)">
            <span v-if="slotProps.data.user_active">
              Dado de alta
            </span>
            <span v-else>
              Dado de baja
            </span>
          </div>
        </template>
      </Column>
    </DataTable>
    <template v-if="userSelected && complaints.length">
      <h2>Listado de denuncias de {{ userSelected }}</h2>
      <DataTable :value="complaints" table-class="display">
        <Column key="delete" header="Foto del anuncio">
          <template #body="slotProps">
            <img :src="slotProps.data.post.post_photos[0]" alt="photo of product">
          </template>
        </Column>
        <Column field="post.post_title" header="Nombre del producto">
        </Column>
        <Column class="report" field="complaint_motive" header="Motivo">
        </Column>
        <Column class="report" field="complaint_text" header="Detalle">
        </Column>
        <Column class="report" header="">
          <template #body="slotProps">
            <button class="table-options select-delete" @click="dropPost(slotProps.data)">
              Dar de baja
            </button>
          </template>
        </Column>
      </DataTable>
    </template>
    <div v-else-if="userSelected && complaints.length === 0">
      Este usuario no ha enviado ninguna denuncia.
    </div>
  </main>


  <Footer></Footer>
</template>

<style scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 6px;
}

.p-datatable {
  margin-bottom: 35px;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 0;
  align-items: center;
}

td.report,
button {
  padding: 0;
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
  height: 1200px;
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
  font-weight: 700;
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

.select-activate:hover {
  color: rgb(53, 162, 14);
}

main .heading {
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  background-color: #8a6cf6;
  color: white !important;
  border-radius: 10px;
  font-weight: bold;
}
</style>
