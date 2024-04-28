import { reactive, toRefs } from "vue";
import { useToast } from "vue-toastification";
import BasicError from "@/components/common/toast/BasicError.vue";
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
                // For the actual toast, including different toast types:
                toastClassName: "error-toast-class",
            
                // For the toast body when using strings or a custom component as content
                bodyClassName: ["error-toast-body-class"]
        });
    }

    return {
        showErrorToast,
        ...toRefs(toastState)
    }
}