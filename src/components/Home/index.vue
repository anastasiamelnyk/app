<template>
  <v-container class="home">
    <Search />
    <Table />
    <router-view></router-view>
  </v-container>
</template>

<script>
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
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
</style>