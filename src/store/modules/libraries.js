export const libraryStore = {
  namespaced: true,
  state: {
    libraries: [],
    currentLibrary: null,
    loading: false,
    error: null,
  },
  mutations: {
    SET_LIBRARIES(state, libraries) {
      state.libraries = libraries;
    },
    SET_CURRENT_LIBRARY(state, library) {
      state.currentLibrary = library;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchLibraries({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await fetch("http://localhost:8080/api/libraries");
        const data = await response.json();
        commit("SET_LIBRARIES", data.content);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async scanLibrary({ commit }, id) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/libraries/${id}/scan`,
          {
            method: "POST",
          },
        );
        if (!response.ok) throw new Error("Errore durante la scansione");
        return await response.json();
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      }
    },

    async deleteLibrary({ commit, dispatch }, id) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/libraries/${id}`,
          {
            method: "DELETE",
          },
        );
        if (!response.ok) throw new Error("Errore durante l'eliminazione");
        // Ricarica la lista dopo l'eliminazione
        await dispatch("fetchLibraries");
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      }
    },
  },
  getters: {
    getLibraries: (state) => state.libraries,
    getCurrentLibrary: (state) => state.currentLibrary,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
};
