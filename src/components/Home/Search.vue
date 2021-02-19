<template>
  <v-row class="search">
    <v-col>
      <v-text-field
        v-model="searchQuery"
        outlined
        placeholder="Search for a package"
        :loading="isSearchRunning"
        @keyup.enter="searchPackage"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Search',
  props: {},
  components: {},
  data: () => ({
    searchQuery: '',
  }),
  computed: {
    ...mapGetters({
      isSearchRunning: 'getSearchRunning',
    }),
  },
  methods: {
    ...mapActions([
      'search',
    ]),
    searchPackage() {
      this.search({query: this.searchQuery});
    },
  },
};
</script>

<style lang="scss">
</style>
