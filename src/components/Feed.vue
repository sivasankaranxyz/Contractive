<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-layout wrap column>
          <v-flex xs12>
            <v-card rounded outlined size="100" class="algin-center pa-5">
              <v-card-title>
                <v-layout>
                  <p class="questrial font-weight-bold text-none">Your Contracts</p>
                  <!-- Posts Interface -->
                  <ul class="home-list">
                    <li v-for="item in this.$root.$data.currentPosts" :key="item.key" :item="item">
                      <!-- Card UI for post's image & caption text -->
                      <p class="home-card-text">{{ item.title }}</p>
                      <p class="home-card-text">{{ item.caption }}</p>
                      <b-card border-variant="secondary" :img-src="item.src"></b-card>
                    </li>
                  </ul>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
.search {
  position: relative;
}
.search input {
  text-indent: 30px;
}
.search .fa-search {
  position: absolute;
  top: 24px;
  left: 7px;
  font-size: 15px;
}
.no-top-padding.p-field {
  padding-top: 0 !important;
}
.p-field .v-input__append-inner {
  padding-top: 5px;
}
</style>