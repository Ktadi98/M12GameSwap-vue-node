import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export const useAuthStore = defineStore('auth', () => {

    const token: Ref<string> = ref(localStorage.getItem('token') || "");

    const username: Ref<string | null> = useStorage("username", "");
    const userEmail: Ref<string | null> = useStorage("userEmail", "");
    const userPhoto: Ref<string | null> = useStorage("userPhoto", "");

    const userIsLoggedIn = computed(() => token.value !== "" ? true : false)

    const isAdmin: Ref<boolean> = useStorage('admin', false);

    function setToken(tokenValue: string) {
        token.value = tokenValue;
        localStorage.setItem("token", tokenValue);
    }

    function getToken() {
        return token.value;
    }

    function deleteToken() {
        token.value = '';
        username.value = null;
        userEmail.value = null;
        userPhoto.value = null;
        localStorage.removeItem('token');
    }
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

    async function fetchUserData() {
        try {
            const response: Response = await fetch(`${apiEndpoint}/users/getData`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token.value}`
                }
            });

            if (!response.ok) return;

            const userData: { email: string, name: string, photo: string } = await response.json();

            username.value = userData.name;
            userEmail.value = userData.email;
            userPhoto.value = userData.photo === "" ? "/imgs/avatar-profile.svg" : userData.photo;
        } catch (error) {
            console.error(error);
        }
    }

    return { token, userIsLoggedIn, isAdmin, setToken, getToken, deleteToken, fetchUserData, userPhoto, username, userEmail }
})