<template>
    <div class="card shadow-sm mb-2">
        <div class="card-body">
            <p
                class="m-0"
                :class="{'text-decoration-line-through' : todo.estado}"
            >
                {{todo.texto}}
            </p>
            <div class="mt-2">
                <button
                    class="btn me-1"
                    :class="todo.estado ? 'btn-success' : 'btn-warning'"
                    @click="modificar( todo )"
                >
                    {{ todo.estado ? 'Finalizar' : 'Pendiente' }}
                </button>
                <button
                    class="btn btn-danger"
                    :disabled="bloquear"
                    @click="eliminar( todo.id )"
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, ref } from 'vue-demi';
import { useDb } from '../composables/useDb'
export default {
    props: { todo: Object },
    setup(props) {

        const { eliminarTodo, modificarTodo } = useDb();
        const error = inject('error');
        const todos = inject('todos');
        const bloquear = ref( false );

        const modificar = async ( todo ) => {
            bloquear.value = true;
            const respuesta = await modificarTodo( todo );
            if ( respuesta.res ){
                error.value = respuesta.error;
                bloquear.value = false;
                return;
            }

            todos.value = todos.value.map( item => (
                item.id === todo.id ? { ...item, estado: !todo.estado } : item
            ))
            bloquear.value = false;
        }


        const eliminar = async( id ) => {
            bloquear.value = true;
            const resp = await eliminarTodo( id );
            if ( resp.res ) {
                error.value = resp.error;
                bloquear.value = false;
                return;
            }

            todos.value = todos.value.filter( todo => todo.id !== id );
            bloquear.value = false;
        }

        return { eliminar, bloquear, modificar }
    }

}
</script>