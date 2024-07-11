<template>
  <v-app>
    <GlobalDialog />
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import GlobalDialog from '@/components/GlobalDialog.vue';
</script>
