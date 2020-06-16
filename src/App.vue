<template>
  <v-app>
    <Toolbar />
    <LeftDrawer />

    <v-content>
      <Create />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
import LeftDrawer from "./components/LeftDrawer";
import Create from "./components/Create";
LeftDrawer.vue;

export default {
  name: "App",

  components: {
    Toolbar,
    LeftDrawer,
    Create
  },

  data: () => ({
    //
  })
};
</script>
