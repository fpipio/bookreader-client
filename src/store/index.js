import { createStore } from "vuex";
import { libraryStore } from "./modules/libraries";

export default createStore({
  modules: {
    libraries: libraryStore,
  },
});
