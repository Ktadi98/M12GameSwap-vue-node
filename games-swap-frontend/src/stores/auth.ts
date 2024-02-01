import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export const useAuthStore = defineStore('auth', () => {

    const token: Ref<string> = ref(localStorage.getItem('token') || "");

    const userIsLoggedIn = computed(() => token.value !== "" ? true : false)

    const isAdmin: Ref<boolean> = useStorage('admin', false);

    function setToken(tokenValue: string) {
        token.value = tokenValue
        localStorage.setItem("token", tokenValue);
    }

    function getToken() {
        return token.value;
    }

    function deleteToken() {
        token.value = '';
        localStorage.removeItem('token');
    }

    return { token, userIsLoggedIn, isAdmin, setToken, getToken, deleteToken }
})