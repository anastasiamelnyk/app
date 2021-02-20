<template>
  <div class="package">
    <v-dialog
      v-model="dialog"
      min-width="300"
      max-width="800"
      min-height="200"
      @click:outside="returnToTable"
    >
      <v-card
        min-width="300"
        max-width="800"
        min-height="200"
        class="mx-auto package__card"
      >
        <div
          v-if="isAlgoliaRunning || isJsDelivrRunning"
          class="package__preloader"
        >
          <v-progress-circular
            color="accent"
            indeterminate
            size="40"
            width="2"
          />
        </div>
        <div v-else>
          <h1 class="package__heading">
            {{ pkg.name }}
            <span v-html="pkg.badge" />
          </h1>
          <p v-if="pkg.repository.url" class="mb-1">
            <a :href="pkg.repository.url" target="_blank">
              {{ pkg.repository.url }}
            </a>
          </p>
          <div>
            <v-img
              v-if="pkg.owner.avatar"
              :src="pkg.owner.avatar"
              :alt="`${pkg.owner.name} avatar`"
              max-height="50" 
              max-width="50"
            />
            <span class="my-1 package__author-name">
              {{ pkg.owner.name }}
            </span>
          </div>
          <div v-if="pkg.owners.length" class="mb-2">
            <span class="package__contributors">Contributors:</span>
            <v-tooltip
              v-for="(item, index) in pkg.owners"
              :key="index"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="item.avatar"
                  :alt="`${item.name} avatar`"
                  v-bind="attrs"
                  v-on="on"
                  max-height="30" 
                  max-width="30"
                  class="package__contributor mr-1"
                />
              </template>
              <span>{{ item.name }}</span>
            </v-tooltip>
          </div>
          <p v-if="pkg.version" class="mb-1">
            <span class="package__cur-version">Current version:</span> {{ pkg.version }}
          </p>
          <p v-if="pkg.license" class="mb-1">
            <span class="package__license">License:</span> {{ pkg.license }}
          </p>
          <p v-if="pkg.description">
            {{ pkg.description }}
          </p>
          <div
            v-if="pkg.keywords.length"
            class="package__keywords mb-3"
          >
            <v-chip
              v-for="(keyword, index) in pkg.keywords"
              :key="`${keyword}${index}`"
              pill
              small
              color="accent"
              class="mr-1 mb-1"
            >
              {{ keyword }}
            </v-chip>
          </div>
          <v-expansion-panels>
            <v-expansion-panel
              v-if="versionsArr.length"
              class="elevation-1"
            >
              <v-expansion-panel-header class="package__versions-header">
                All versions
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span
                  v-for="(version, index) in versionsArr"
                  :key="`${index}${version}`"
                  class="package__version"
                >
                  {{ version }}
                </span>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Package',
  props: {},
  components: {},
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      algoliaResult: 'getSelectedPkgAlgolia',
      jsDelivrResult: 'getSelectedPkgJsDelivr',
      isAlgoliaRunning: 'getLoadingPkg',
      isJsDelivrRunning: 'getLoadingJsDelivr',
    }),
    pkg() {
      return {
        ...this.algoliaResult,
        ...this.jsDelivrResult
      };
    },
    versionsArr() {
      return Object.keys(this.pkg.versions);
    },
  },
  created() {
    const currentPkg = this.$route.params.id;

    this.dialog = true;
    this.getPackage(currentPkg);
    this.getJsDelivrInfo(currentPkg);
  },
  methods: {
    ...mapActions([
      'getPackage',
      'getJsDelivrInfo',
    ]),
    returnToTable() {
      this.dialog = false;
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
.package {
  &__card {
    padding: 32px;
    padding-top: 40px;
  }
  
  &__preloader {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__cur-version,
  &__versions-header,
  &__license,
  &__author,
  &__author-name,
  &__contributors {
    font-weight: bold;
  }

  &__version,
  &__contributors {
    display: block;
  }

  &__contributor {
    display: inline-block;
  }

  &__keywords {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>