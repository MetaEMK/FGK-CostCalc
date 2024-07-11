<template>
  <v-dialog v-model="isOpen" max-width="500px">
    <v-card v-if="dialogOptions">
      <component :is="dialogOptions.component" v-bind="dialogOptions.props" />
      <v-card-actions>
        <v-btn @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useDialog } from '@/composables/useDialog';

const { isOpen, dialogOptions, closeDialog } = useDialog();
</script>
