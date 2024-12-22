<template>
  <div class="library-list">
    <div class="controls mb-4">
      <button
        class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        @click="createNew"
      >
        Aggiungi Libreria
      </button>
    </div>

    <div class="libraries-grid">
      <div v-if="loading" class="text-center">Caricamento...</div>

      <div v-else-if="error" class="text-red-500">{{ error }}</div>

      <div v-else-if="!libraries.length" class="text-center">
        Nessuna libreria trovata. Aggiungine una!
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="library in libraries"
          :key="library.id"
          class="bg-white rounded-lg shadow p-4"
        >
          <div class="card-body">
            <h5 class="text-xl font-bold mb-2">{{ library.name }}</h5>
            <p class="text-gray-600 mb-2">
              {{ library.description || "Nessuna descrizione" }}
            </p>
            <p class="text-gray-500">Path: {{ library.path }}</p>

            <div class="flex gap-2 mt-4">
              <button
                class="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                @click="editLibrary(library)"
              >
                Modifica
              </button>
              <button
                class="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
                @click="scanLibrary(library.id)"
                :disabled="!library.enabled"
              >
                Scansiona
              </button>
              <button
                class="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                @click="confirmDelete(library)"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LibraryList",

  data() {
    return {
      selectedLibrary: null,
    };
  },

  computed: {
    ...mapState({
      libraries: (state) => state.libraries.libraries,
      loading: (state) => state.libraries.loading,
      error: (state) => state.libraries.error,
    }),
  },

  methods: {
    createNew() {
      this.$router.push("/libraries/new");
    },

    editLibrary(library) {
      this.$router.push(`/libraries/${library.id}`);
    },

    async scanLibrary(id) {
      try {
        await this.$store.dispatch("libraries/scanLibrary", id);
      } catch (error) {
        console.error("Errore durante la scansione:", error);
      }
    },

    async confirmDelete(library) {
      if (
        confirm(`Sei sicuro di voler eliminare la libreria "${library.name}"?`)
      ) {
        try {
          await this.$store.dispatch("libraries/deleteLibrary", library.id);
        } catch (error) {
          console.error("Errore durante l'eliminazione:", error);
        }
      }
    },
  },

  created() {
    this.$store.dispatch("libraries/fetchLibraries");
  },
};
</script>

<style scoped>
/* Stili aggiuntivi se necessari */
</style>
