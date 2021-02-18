<template>
  <div class="home">
    <Search />
    <Table />
    <router-view></router-view>
  </div>
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