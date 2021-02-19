<template>
  <v-row class="package-list">
    <v-col>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :items-per-page="itemsPerPage"
        :loading="isSearchRunning"
        hide-default-footer
        class="elevation-1 package-list__table"
      >
        <template v-slot:item.basicInfo="{ item }">
          <div class="package-list__basic-cell-inner">
            <span class="mb-1 package-list__name">
              {{ item.name }}
            </span>
            <v-img
              :src="item.owner.avatar"
              :alt="`${item.name} avatar`"
              max-height="30" 
              max-width="30"
              class="mr-2 package-list__avatar"
            />
            <span class="package-list__author">
              {{ item.owner.name }}
            </span>
            <span class="mb-1">
              License: {{ item.license }}
            </span>
            <div
              v-if="item.keywords.length"
              class="package-list__keywords"
            >
              <v-chip
                v-for="(keyword, index) in item.keywords"
                :key="`${keyword}${index}`"
                pill
                small
                color="accent"
                class="mr-1 mb-1"
              >
                {{ keyword }}
              </v-chip>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { RESULTS_PER_PAGE } from '../../assets/js/constants';
import tableHeades from '../../assets/js/tableHeaders';

export default {
  name: 'Table',
  props: {},
  components: {},
  data: () => ({
    itemsPerPage: RESULTS_PER_PAGE,
    headers: tableHeades.packagesTable,
  }),
  computed: {
    ...mapGetters({
      tableData: 'getFilteredSearchResult',
      isSearchRunning: 'getSearchRunning',
    }),
  },
  methods: {},
};
</script>

<style lang="scss">
.package-list {

  &__table {
    overflow-x: auto;
  }
  
  &__basic-header,
  &__basic-cell {
    max-width: 400px;
  }

  &__desc-header,
  &__desc-cell {
    max-width: 350px;
  }

  &__basic-cell-inner {
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-flow: column;
  }

  &__name {
    font-size: 1.75em;
    font-weight: bold;
  }

  &__author {
    font-size: 1.1em;
    font-weight: bold;
  }

  &__keywords {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 599px) {
    &__basic-cell {
      align-items: flex-end;
    }

    &__avatar {
      align-self: flex-end;
    }

    &__keywords {
      justify-content: flex-end;
    }
  }
}
</style>