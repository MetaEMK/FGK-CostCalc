<template>
  <v-dialog v-model="isOpen">
    <div v-if="dialogOptions">
      <component :is="dialogOptions.component" v-bind="dialogOptions.props" />
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useDialog } from '@/composables/useDialog';

const { isOpen, dialogOptions } = useDialog();
</script>
