// composables/useDialog.ts

import { ref } from 'vue';

interface DialogOptions {
  component: any;
  props?: Record<string, any>;
}

const isOpen = ref<boolean>(false);
const dialogOptions = ref<DialogOptions | null>(null);

const openDialog = (options: DialogOptions) => {
  dialogOptions.value = options;
  isOpen.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
  dialogOptions.value = null;
};

export function useDialog() {
  return {
    isOpen,
    dialogOptions,
    openDialog,
    closeDialog,
  };
}
