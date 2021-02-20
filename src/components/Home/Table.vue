<template>
  <v-row class="package-list">
    <v-col>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        :loading="isSearchRunning"
        no-data-text="No packages found"
        hide-default-footer
        class="elevation-1 package-list__table"
        @click:row="showPackage"
      >
        <template v-slot:item.basicInfo="{ item }">
          <div class="package-list__basic-cell-inner">
            <span class="mb-1 package-list__name">
              {{ item.name }}
            </span>
            <v-img
              :src="item.owner.avatar"
              :alt="`${item.owner.name} avatar`"
              max-height="30" 
              max-width="30"
              class="mr-2 package-list__avatar"
            />
            <span
              class="my-1 package-list__author"
              @click="addFacetFilter('owner.name', item.owner.name)"
            >
              {{ item.owner.name }}
            </span>
            <span v-if="item.license" class="mb-1">
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
                @click="addFacetFilter('keywords', keyword)"
              >
                {{ keyword }}
              </v-chip>
            </div>
          </div>
        </template>
      </v-data-table>
      <v-pagination
        v-if="totalPages"
        v-model="currentPage"
        :length="totalPages"
        :total-visible="6"
        class="package-list__pagination mt-2"
        @input="search"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import tableHeaders from '../../assets/js/tableHeaders';

export default {
  name: 'Table',
  props: {},
  components: {},
  data: () => ({
    headers: tableHeaders.packagesTable,
  }),
  computed: {
    ...mapGetters({
      tableData: 'getFilteredSearchResult',
      isSearchRunning: 'getSearchRunning',
      page: 'getPage',
      totalPages: 'getTotalPages',
      itemsPerPage: 'getPerPage',
    }),
    currentPage: {
      get() {
        return Number(this.page) + 1;
      },
      set(value) {
        this.setPage(Number(value) - 1);
      }
    },
  },
  methods: {
    ...mapMutations([
      'setPage',
      'addFacetFilters',
    ]),
    ...mapActions([
      'search',
      'clearSearchQuery',
    ]),
    addFacetFilter(filter, value) {
      this.clearSearchQuery();
      this.addFacetFilters(`${filter}:${value}`);

      this.search();
    },
    showPackage(item) {
      this.$router.push(`/${item.objectID}`);
    },
  },
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
    line-height: 1;
    font-weight: bold;
    width: max-content;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    transition: border-color 0.3s;

    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }
  }

  &__keywords {
    display: flex;
    flex-wrap: wrap;
  }

  &__pagination {
    .v-pagination {
      justify-content: flex-end;
    }
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