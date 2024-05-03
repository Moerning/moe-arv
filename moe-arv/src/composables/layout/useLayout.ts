import { reactive, toRefs } from 'vue'

const layoutState = reactive({
    displayMenu: false
})

export const useLayout = () => {
    const toggleMenu = () =>
        (layoutState.displayMenu = !layoutState.displayMenu)

    return {
        toggleMenu,
        ...toRefs(layoutState)
    }
}
