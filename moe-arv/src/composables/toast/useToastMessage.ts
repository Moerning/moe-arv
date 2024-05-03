import { reactive, toRefs } from "vue";
import { useToast } from "vue-toastification";
import BasicError from "@/components/common/toast/BasicError.vue";
import BasicSuccess from "@/components/common/toast/BasicSuccess.vue";

const toast = useToast()

const toastState = reactive({
    title:"",
    message:""
})

export const useToasMessage = () => {
    
    const setMessage = (title:string, message:string) => {
        toastState.title = title
        toastState.message = message
    }
    const showErrorToast = (message:string, title= "An Error Has Occured") => {
        setMessage(title, message)
        toast(BasicError, {
                toastClassName: "error-toast-class",
                bodyClassName: ["error-toast-body-class"]
        });
    }

    const showSuccessToast = (message:string, title= "Operation Successful!") => {
        setMessage(title, message)
        toast(BasicSuccess, {
                toastClassName: "success-toast-class",
                bodyClassName: ["success-toast-body-class"]
        });
    }

    return {
        showErrorToast,
        showSuccessToast,
        ...toRefs(toastState)
    }
}