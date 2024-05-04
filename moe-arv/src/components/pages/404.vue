<template>
    404 Not Found!
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router"

const router = useRouter()
router.push({name:"ArticlesListView"})
</script>