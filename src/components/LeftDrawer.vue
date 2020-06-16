<template>
  <v-navigation-drawer width="300px" color="grey lighten-5" floating clipped app permanent>
    <v-container>
      <v-card dark color="blue darken-1" rounded outlined>
        <v-list-item class="pt-1">
          <v-list-item-avatar>
            <img
              src="https://scontent.fmaa1-3.fna.fbcdn.net/v/t1.0-9/45661507_487273478345029_2713214914868019200_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=A_vrimTGtYgAX85SjDR&_nc_ht=scontent.fmaa1-3.fna&oh=dd93ec9a57f634d2615e1f272d199ecf&oe=5EF496F3"
              alt="Siva"
            />
          </v-list-item-avatar>
          <v-list-item-content class="mt-2">
            <v-list-item-title class="questrial subtitle">Sivasankaran T</v-list-item-title>
            <v-list-item-subtitle class="questrial caption">131654646546</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-container>
          <v-divider style="opacity:0.2" color="white"></v-divider>
        </v-container>

        <v-list dense>
          <v-list-item-group v-model="item" active-class="active-list-item">
            <v-list-item
              @click="item"
              v-for="item in items"
              v-bind:key="item"
              dense
              style="height:20px"
            >
              <v-list-item-action>
                <v-icon color="grey lighten-3">{{item.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <!-- <div v-if="n">
                                    <v-list-item-title class="questrial body1 font-weight-bold">{{item.text}}</v-list-item-title>
                </div>-->

                <v-list-item-title class="questrial body1">{{item.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-container>
          <v-divider style="opacity:0.2" color="white"></v-divider>
        </v-container>
      </v-card>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "LeftDrawer",
  data() {
    return {
      item: 1,
      items: [
        { text: "Home", icon: "mdi-home-variant" },
        { text: "Create", icon: "mdi-pencil-plus" },
        { text: "Logout", icon: "mdi-logout-variant" }
      ]
    };
  }
};
</script>

<style>
.active-list-item .v-list-item--dense .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list--dense .v-list-item .v-list-item__subtitle {
  font-family: "Questrial";
  font-weight: "bold";
}
</style>