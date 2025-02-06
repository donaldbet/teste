<template>
    <div>
        <h1 class="text-xl font-bold mb-4">Editar Professor</h1>
        <form @submit.prevent="updateProfessor" class="space-y-4">
            <div class="form-group">
                <label for="nome" class="block text-sm font-medium text-gray-700">Nome:</label>
                <input type="text" id="nome" v-model="professor.nome" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                <input type="email" id="email" v-model="professor.email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <div class="form-group">
                <label for="senha" class="block text-sm font-medium text-gray-700">Senha:</label>
                <input type="password" id="senha" v-model="professor.senha" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <button type="submit" class="btn btn-success bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Salvar</button>
        </form>
    </div>
</template>

<script>
export default {
    props: ['professor'],
    methods: {
        updateProfessor() {
            axios.put(`/professor/${this.professor.id}`, this.professor)
                .then(response => {
                    alert('Professor atualizado com sucesso!');
                })
                .catch(error => {
                    console.error('Erro ao atualizar o professor:', error);
                });
        }
    }
}
</script>
