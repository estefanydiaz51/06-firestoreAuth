<template>
    <form @submit.prevent="procesarFormulario">
        <input
            v-model="texto"
            type="text"
            placeholder="Enter para agregar todo"
            class="form-control my-3"
        >
    </form>
</template>

<script>
import { inject, ref } from 'vue-demi';
import { useDb } from '../composables/useDb';
export default {
    setup() {

        const { agregarTodo } = useDb();
        const texto = ref('');
        const todos = inject( 'todos' );
        const error = inject ( 'error' );
        const procesarFormulario = async () => {
            if ( !texto.value.trim() ){
                console.log( 'Texto vacio' );
                return;
            }

            const todo = await agregarTodo( texto.value );

            if ( todo.res ) {
                error.value = todo.error;
                texto.value = '';
                return;
            }

            todos.value = [ ...todos.value, todo ];
            texto.value = '';
             
        }

        return {
            texto,
            procesarFormulario
        }

    }
}
</script>