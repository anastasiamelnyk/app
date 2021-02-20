<template>
  <v-row class="search">
    <v-col>
      <v-text-field
        v-model="query"
        outlined
        placeholder="Search for a package"
        :loading="isSearchRunning"
        @keyup.enter="search"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Search',
  props: {},
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters({
      isSearchRunning: 'getSearchRunning',
      searchQuery: 'getSearchQuery',
    }),
    query: {
      get() {
        return this.searchQuery;
      },
      set(value) {
        this.setSearchQuery(value);
        this.setPage(0);
      },
    },
  },
  methods: {
    ...mapMutations([
      'setSearchQuery',
      'setPage',
    ]),
    ...mapActions([
      'search',
    ]),
  },
};
</script>

<style lang="scss">
</style>
