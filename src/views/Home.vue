<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h3 align="center">ROC曲线图</h3>
        <div id="d3El"></div>
      </el-col>

      <el-col :span="12" style="padding-right:20px;">
        <el-button type="success" @click="updateLine">更新数据</el-button>
        <el-button type="info" @click="reset">复原</el-button>
        <el-button type="primary" @click="onSavePng">导出图片</el-button>

        <span style="padding: 0 20px">颜色选择器</span>
        <el-color-picker v-model="color" />

        <el-form :inline="true" :model="formInline" style="padding-top: 20px;">
          <el-form-item label="X轴标签">
            <el-input v-model="formInline.x" clearable />
          </el-form-item>
          <el-form-item label="Y轴标签">
            <el-input v-model="formInline.y" clearable />
          </el-form-item>
        </el-form>
        <JsonEditorVue ref="jsonEditEl" @change="jsonDataChange" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup >
// import * as d3 from "d3";
import JsonEditorVue from '@/components/JsonEditor.vue'
import { onMounted, ref } from "vue";
import { useD3 } from "@/hooks/useD3";
// import { onSavePng } from "@/hooks/useExportPng";
import { generateRandomData } from "@/hooks//utils";
import { saveSvgAsPng } from "save-svg-as-png";

const onSavePng = () => {
  saveSvgAsPng(document.querySelector("#d3El > svg"), "diagram.png", {
    scale: 2,
    backgroundColor: "#fff",
    encoderOptions: 1
  });
}

const formInline = ref({ x: "特异度", y: "灵敏度" })
const color = ref('#409EFF')
let newData = null
const jsonDataChange = (data) => {
  if (Array.isArray(data)) {
    newData = data
  }
}
const { svg, line, updateChart } = useD3()

const updateLine = () => {
  updateChart(newData, formInline.value.x, formInline.value.y)
}

const jsonEditEl = ref(null)

const orginData = [{
  label: "类目 1", color: "#409EFF", data: [
    {
      "fpr": 0,
      "tpr": 0.06275834854939855
    },
    {
      "fpr": 0.1,
      "tpr": 0.7428371825761059
    },
    {
      "fpr": 0.2,
      "tpr": 0.8072437340423017
    },
    {
      "fpr": 0.3,
      "tpr": 0.9966083976178586
    },
    {
      "fpr": 0.4,
      "tpr": 0.9985890833462117
    },
    {
      "fpr": 0.5,
      "tpr": 0.999512416926374
    },
    {
      "fpr": 0.6,
      "tpr": 0.9997096447096644
    },
    {
      "fpr": 0.7,
      "tpr": 0.9998621367590246
    },
    {
      "fpr": 0.8,
      "tpr": 0.999959672178087
    },
    {
      "fpr": 0.9,
      "tpr": 0.9999971600073096
    },
    {
      "fpr": 1,
      "tpr": 0.9999973261728723
    }
  ]
},
{
  label: "类目 2", color: "#E3217F", data: [
    {
      "fpr": 0,
      "tpr": 0.14277045895207552
    },
    {
      "fpr": 0.1,
      "tpr": 0.5664923346131494
    },
    {
      "fpr": 0.2,
      "tpr": 0.9178753509757285
    },
    {
      "fpr": 0.3,
      "tpr": 0.9677842632219796
    },
    {
      "fpr": 0.4,
      "tpr": 0.9804865482496974
    },
    {
      "fpr": 0.5,
      "tpr": 0.9888722454338207
    },
    {
      "fpr": 0.6,
      "tpr": 0.9962043478868577
    },
    {
      "fpr": 0.7,
      "tpr": 0.9993953776252839
    },
    {
      "fpr": 0.8,
      "tpr": 0.9995596496637523
    },
    {
      "fpr": 0.9,
      "tpr": 0.999699673743636
    },
    {
      "fpr": 1,
      "tpr": 0.9998290071853592
    }
  ]
},
{
  label: "类目 3", color: "#2ca02c", data: [
    {
      "fpr": 0,
      "tpr": 0.37506908319168675
    },
    {
      "fpr": 0.1,
      "tpr": 0.9228621279874211
    },
    {
      "fpr": 0.2,
      "tpr": 0.9407795553285635
    },
    {
      "fpr": 0.3,
      "tpr": 0.9921698923616024
    },
    {
      "fpr": 0.4,
      "tpr": 0.9965732427277876
    },
    {
      "fpr": 0.5,
      "tpr": 0.9966302843518492
    },
    {
      "fpr": 0.6,
      "tpr": 0.9991111955513327
    },
    {
      "fpr": 0.7,
      "tpr": 0.9995593441119117
    },
    {
      "fpr": 0.8,
      "tpr": 0.9996893592993884
    },
    {
      "fpr": 0.9,
      "tpr": 0.999915541642988
    },
    {
      "fpr": 1,
      "tpr": 0.9999358221385402
    }
  ]
},
{
  label: "类目 4", color: "#d62728", data: [
    {
      "fpr": 0,
      "tpr": 0.5695998774826934
    },
    {
      "fpr": 0.1,
      "tpr": 0.901812130163985
    },
    {
      "fpr": 0.2,
      "tpr": 0.9242269603579498
    },
    {
      "fpr": 0.3,
      "tpr": 0.9487336581910423
    },
    {
      "fpr": 0.4,
      "tpr": 0.991964612378505
    },
    {
      "fpr": 0.5,
      "tpr": 0.9951899744767777
    },
    {
      "fpr": 0.6,
      "tpr": 0.9978810438856575
    },
    {
      "fpr": 0.7,
      "tpr": 0.9990952130892019
    },
    {
      "fpr": 0.8,
      "tpr": 0.9993065690811131
    },
    {
      "fpr": 0.9,
      "tpr": 0.9999986679072845
    },
    {
      "fpr": 1,
      "tpr": 0.9999992888389734
    }
  ]
},
{
  label: "类目 5", color: "#9467bd", data: [
    {
      "fpr": 0,
      "tpr": 0.7331428188132647
    },
    {
      "fpr": 0.1,
      "tpr": 0.7684103421125243
    },
    {
      "fpr": 0.2,
      "tpr": 0.9190620575647908
    },
    {
      "fpr": 0.3,
      "tpr": 0.9456690934160131
    },
    {
      "fpr": 0.4,
      "tpr": 0.9794352114161039
    },
    {
      "fpr": 0.5,
      "tpr": 0.9966667602723966
    },
    {
      "fpr": 0.6,
      "tpr": 0.9996985010057324
    },
    {
      "fpr": 0.7,
      "tpr": 0.9999429674810388
    },
    {
      "fpr": 0.8,
      "tpr": 0.9999911055231353
    },
    {
      "fpr": 0.9,
      "tpr": 0.9999989560105942
    },
    {
      "fpr": 1,
      "tpr": 0.9999991157890242
    }
  ]
}]
const reset = () => {
  jsonEditEl.value.reset()
  updateChart(orginData, formInline.value.x, formInline.value.y)
}
</script>


<style>
#d3El {
  box-sizing: border-box;
  padding-top: 50px;
  padding-left: 50px;
}

/* 添加一些样式，使图表看起来漂亮些 */
path {
  fill: none;
  stroke-width: 1;
}

.line1 {
  stroke: #1f77b4;
}

.line2 {
  stroke: #ff7f0e;
}

.line3 {
  stroke: #2ca02c;
}

.line4 {
  stroke: #d62728;
}

.line5 {
  stroke: #9467bd;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: sans-serif;
  font-size: 11px;
}

.grid line {
  stroke: #ccc;
  stroke-dasharray: 3 3;
}

.grid path {
  display: none;
  /* Hide the end-of-axis lines */
}

.grid .tick:first-of-type {
  display: none;
}
</style>