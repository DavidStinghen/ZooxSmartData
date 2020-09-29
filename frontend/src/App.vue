<template>
  <v-app>
    <Header />
    <v-container id="container" fluid>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
#container {
  margin-top: 50px;
}
</style>
