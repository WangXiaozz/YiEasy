<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <ul>
        <li :class="{active:activeFlag==''}" @click="changeRegion('')">全部</li>
        <li v-for="item in regionArr" :key="item.value"
        :class="{active:activeFlag == item.value}" @click="changeRegion(item.value)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/home'
import { onMounted, ref } from "vue";
import type {
  HospitalLevelAndRegionResponseData,
  HospitalLevelAndRegionArr,
} from "@/api/home/type";

let regionArr = ref<HospitalLevelAndRegionArr>([]);
//控制医院等级高亮响应式数据
let activeFlag = ref<string>('');

let $emit = defineEmits(['getRegion'])
onMounted(() => {
  getRegion();
});

const getRegion = async () => {
  let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion(
    "Beijin"
  );

  //存储数据
  if (result.code == 200) {
    regionArr.value = result.data;
  }
}

//点击等级的按钮回调
const changeRegion = (region:string)=>{
   //高亮响应式数据存储leve数值
   activeFlag.value = region;
   //将地区传回给父组件
   $emit('getRegion',region);
}
</script>



<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 20px;
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 50px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 10px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
      }
    }
  }
}
</style>
