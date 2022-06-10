<template>
    <div v-if="isAuthenticated">
        <h1>crud</h1>
        <Cargando v-if="cargando" />
        <div v-else>
            <Error v-if="pintarError"></Error>
            <TodoForm></TodoForm>
            <Todo v-for="todo in todos" :key="todo.id" :todo="todo"></Todo>
            <p v-if="todos.length === 0">
                Sin Todos
            </p>
        </div>
    </div>
</template>

<script>
import TodoForm from '../components/TodoForm'
import Todo from '../components/Todo'
import Error from '../components/Error'
import Cargando from '../components/Cargando'
import { useAuth } from '@vueuse/firebase';
import { useDb } from '../composables/useDb';
import { computed, onMounted, provide, ref } from 'vue-demi';
export default {
  components: {
    TodoForm,
    Error, 
    Cargando,
    Todo
},
    setup() {
        const { isAuthenticated } = useAuth();
        const { getTodos, cargando } = useDb();

        const error = ref( null );
        const todos = ref( [] );

        provide( 'error', error );
        provide( 'todos', todos );

        const pintarError = computed( () => error.value ? true : false )

        onMounted ( async() => {
            todos.value = await getTodos();
            if ( todos.value.res ) {
                console.log( todos.value.error );
                error.value = todos.value.error;
            }
        })

        return { isAuthenticated, todos, pintarError }
    }

}
</script>

<style>

</style>