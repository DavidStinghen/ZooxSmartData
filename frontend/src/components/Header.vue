<template>
  <v-app-bar app dense flat color="#FFFFFF">
    <router-link class="link" to="/estados">Estados</router-link>
    <v-divider class="mx-4" inset vertical />
    <router-link class="link" to="/cidades">Cidades</router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.link {
  color: #504b46;
  text-decoration: none;
  padding: 1%;
}
.link.router-link-exact-active {
  color: #000000;
}
</style>
