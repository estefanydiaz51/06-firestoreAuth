<template>
    <Cargando v-if="loading"></Cargando>
    <div v-else>
        <Navbar />
        <div class="container">
            <router-view/>
        </div>
    </div>

</template>
<script>
import Cargando from './components/Cargando';
import Navbar from '@/components/Navbar.vue';
import { firebase } from './firebase'
import { onMounted, ref } from 'vue-demi';
export default {
    components: {
        Cargando, 
        Navbar
    },
    setup() {
        const loading = ref(false)

        onMounted( async () => {
            loading.value = true;
            await firebase.getCurrentUser();
            loading.value = false;
        })


        return { loading }
    }
}
</script>
<style>
</style>
