<template>
  <div class="p-4">
    <LibraryList />
  </div>
</template>

<script>
import LibraryList from "@/components/library/LibraryList.vue";

export default {
  name: "LibraryView",
  components: {
    LibraryList,
  },
};
</script>
