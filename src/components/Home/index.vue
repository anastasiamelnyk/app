<template>
  <v-container class="home">
    <Header />
    <Search />
    <Table v-if="didSearchHappen" />
    <Footer class="home__footer" />
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Search from './Search';
import Table from './Table';
import Header from '../Header';
import Footer from '../Footer';

export default {
  name: 'Home',
  props: {},
  components: {
    Search,
    Table,
    Header,
    Footer,
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
.home {
  min-height: 100vh;
  display: flex;
  flex-flow: column;

  &__footer {
    margin-top: auto !important;
  }

  .row {
    flex-grow: 0;
  }
}
</style>