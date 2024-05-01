<template>
  <json-editor-vue ref="editorRef" class="editor" v-model="jsonData" :options="options" @change="jsonChange"
    @textSelectionChange="textchange" />


  <el-button @click="test">测试</el-button>
</template>

<script lang="ts" setup>
import JsonEditorVue from 'json-editor-vue3'
import { onMounted, ref } from 'vue';
import data from '../../data.js'


const jsonData = ref(data)

const options = ref({
  height: "800px",
  mode: "tree",
  language: 'zh-CN',
  highlight: {
    path: 'your.path.to.highlight', // 替换为你想要高亮的JSON路径
    background: 'red', // 替换为你想要的背景颜色
  },
  onTextSelectionChange(start, end, text) {
    console.log(start, end, text);
  },
  onChange() {
    console.log('change--------');
  }
})
const emits = defineEmits(['change'])
const editorRef: any = ref(null)

const textchange = (start, end, text, t) => {
  console.log(start, end, text, t);
}

let editor = ''
onMounted(() => {
  console.log('editor', editorRef.value);
  editor = editorRef.value.editor
  // editorRef.value.editor.setTextSelection(2, 2)
  // editorRef.value.editor.focus()
  // function highlightMatchingLines(editor, searchData, highlightClass) {
  //   var session = editor.getSession();
  //   var lines = session.doc.getAllLines();

  //   // 遍历所有行
  //   for (var i = 0; i < lines.length; i++) {
  //     // 检查是否存在匹配的数据
  //     if (lines[i].includes(searchData)) {
  //       // 创建一个范围，以便将其标记为高亮
  //       var range = new (window.ace.require("ace/range").Range)(i, 0, i, lines[i].length);

  //       // 将范围标记为高亮
  //       session.addMarker(range, highlightClass, "fullLine");
  //     }
  //   }
  // }

  // // 使用方法
  // var editor = editorRef.value.editor;
  // // editor.setTheme("ace/theme/monokai");
  // // editor.getSession().setMode("ace/mode/javascript");

  // // 要匹配的数据
  // var searchData = "yourSearchData";

  // // 高亮样式
  // var highlightClass = "ace_active-line"; // 你可以自定义样式

  // // 调用方法进行高亮
  // highlightMatchingLines(editor, searchData, highlightClass);

})

const test = () => {
  editor.setTextSelection({
    column: 14, row: 7
  },
    {
      column: 7, row: 14
    })
}

const reset = () => {
  jsonData.value = data
}
const jsonChange = (data: JSON) => {
  emits('change', data)
}

defineExpose({
  reset
})
</script>


<style scoped>
:deep(.jsoneditor-outer) {
  height: 600px !important;
}
</style>