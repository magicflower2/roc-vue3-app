<template>
  <JsonEditorVue @change="jsonChange" />
</template>

<script lang="ts" setup>
import JsonEditorVue from '@/components/JsonEditor.vue'

const jsonChange = (a) => {
  console.log('a----', a);
}
</script>