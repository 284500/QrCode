<template>
    <div>
        adada
    </div>
    <div ref="qr" style="width: 200px;height: 200px;">

    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'

import {rendererRandRect,rendererResImage, rendererLine, rendererLine2,rendererFuncA, rendererFuncB, encodeData} from "./index.js";
const qrcode = encodeData({
    text: "https://www.baidu.com",
    correctLevel: 0,
});
const A1 =  rendererRandRect(qrcode, {
  // backgroundImage:"../../public/vite.svg",
  icon:"../public/favicon.ico",
  iconSize:30,
  iconPos:"center",
  type:1,
  // posType:2,
  // posColor:"red");
});
const qr = ref();

onMounted(() => {
    console.log(qr.value)
    qr.value.innerHTML = A1;
});
</script>