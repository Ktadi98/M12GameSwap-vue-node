import { useToast, POSITION } from "vue-toastification";
const toast = useToast();
export default function useCustomToast(message: string) {

    const toast = useToast();
    const triggerToast = () => {
        toast.success(message, {
            position: POSITION.BOTTOM_RIGHT,
            timeout: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            draggablePercent: 0.6,
            showCloseButtonOnHover: true,
            hideProgressBar: false,
            closeButton: false,
            icon: "fas fa-rocket",
            rtl: false
        });
    }

    return { triggerToast }
}