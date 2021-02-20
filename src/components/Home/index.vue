<template>
  <v-container class="home">
    <Search />
    <Table v-if="didSearchHappen" />
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Search from './Search';
import Table from './Table';

export default {
  name: 'Home',
  props: {},
  components: {
    Search,
    Table,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      didSearchHappen: 'getSearchHappen',
    }),
  },
  methods: {},
};
</script>

<style lang="scss">
</style>