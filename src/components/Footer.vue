<template>
  <v-row>
    <v-col>
      <footer class="footer">
        <v-img
          src="../assets/img/photo.jpg"
          alt="Photo"
          max-height="80"
          max-width="80"
          class="mr-4"
        />
        <div>
          <span class="footer__author">
            Anastasiia Shlapachenko
          </span>
          <div class="footer__links">
            <a
              href="https://github.com/anastasiamelnyk"
              target="_blank"
              class="mr-2"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/anastasiia-shlapachenko-60a11918b/"
              target="_blank"
              class="mr-2"
            >
              Linkedin
            </a>
            <a
              href="https://drive.google.com/file/d/1WFyXVKxW7ZaRNbTO4K_4Yh1MD783nRyV/view?usp=sharing"
              target="_blank"
              class="mr-2"
            >
              CV
            </a>
          </div>
        </div>
      </footer>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.footer {
  display: flex;
  align-items: center;

  &__author {
    font-size: 1.25em;
    font-weight: bold;
  }

  &__links {
    display: flex;
  }
}
</style>