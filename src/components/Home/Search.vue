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
      facetFilters: 'getFacetFilters',
    }),
    query: {
      get() {
        return this.facetFilters.length
        ? this.getFacetFiltersString(this.facetFilters)
        : this.searchQuery;
      },
      set(value) {
        if (value.includes(':')) {
          this.clearSearchQuery();
          this.setFacetFilters(this.getFacetFiltersArray(value));
        } else {
          this.clearSearchFilters();
          this.setSearchQuery(value);
        }
      },
    },
  },
  methods: {
    ...mapMutations([
      'setSearchQuery',
      'setPage',
      'setFacetFilters',
    ]),
    ...mapActions([
      'search',
      'clearSearchQuery',
      'clearSearchFilters',
    ]),
    getFacetFiltersString(filters) {
      return filters.map(cur => {
          let [filter, value] = cur.split(':');

          if (filter === 'owner.name') filter = 'author';

          return `${filter}: ${value}`;
        }).join(', ');
    },
    getFacetFiltersArray(queryString) {
      const queryArr = queryString.split(', ');

      return queryArr.map(cur => {
        let [filter, value] = cur.split(': ');

        if (filter === 'author') filter = 'owner.name';

        return `${filter}:${value}`;
      });
    },
  },
};
</script>

<style lang="scss">
</style>
