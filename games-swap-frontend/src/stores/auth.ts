import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export const useAuthStore = defineStore('auth', () => {

    const token: Ref<string> = ref(localStorage.getItem("token") ?? "");

    const userIsLoggedIn = computed(() => token.value !== "" ? true : false)

    function setToken(tokenValue: string) {
        token.value = tokenValue
        localStorage.setItem("token", JSON.stringify(tokenValue));
    }

    function getToken() {
        return token.value;
    }

    function deleteToken() {
        token.value = '';
        localStorage.removeItem('token');
    }

    return { token, userIsLoggedIn, setToken, getToken, deleteToken }
})