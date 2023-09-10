<template>
    <div>
        <!-- 轮播图组件 -->
        <Carousel />
        <!-- 搜索框组件 -->
        <Search />
        <!-- 底部展示医院的结构 -->
        <el-row :gutter="20">
            <el-col :span="20">
                <!-- 等级子组件 -->
                <Level @getLevel="getLevel" />
                <!--地区 -->
                <Region @getRegion="getRegion" />
                <!-- 展示医院的结构 -->
                <div class="hospital" v-if="hasHospitalArr.length > 0">
                    <Card v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
                </div>
                <el-empty v-else description="暂无数据" />
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                    :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
                    @current-change="currentChange" @size-change="sizeChange" />
                
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import Carousel from './Carousel/index.vue'
import Search from './Search/index.vue'
import { reqHospital } from "@/api/home";
// 引入首页等级的组件
import Level from "./level/index.vue";
// 引入首页地区选择的组件
import Region from "./region/index.vue";
//展示医院新的的卡片组件
import Card from "./card/index.vue";
/* //引入右侧组件
import Tip from './tip/index.vue'; */

import type { Content, HospitalResponseData } from "@/api/home/type";
import { ref, onMounted } from 'vue'
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
let total = ref<number>(100);
//存储已有的医院的数据
let hasHospitalArr = ref<Content>([]);
let hostype = ref<string>('')
let districtCode = ref<string>('')


onMounted(() => {
    getHospitalInfo()
})

//获取已有的医院的数据
const getHospitalInfo = async () => {
    //获取医院的数据:默认获取第一页、一页十个医院的数据
    let result: HospitalResponseData = await reqHospital(
        pageNo.value,
        pageSize.value,
        hostype.value,
        districtCode.value
    );
    if (result.code == 200) {
        //存储已有的医院的数据
        hasHospitalArr.value = result.data.content;
        //存储医院的总个数
        total.value = result.data.totalElements;
        //console.log(result)
    }
};
//分页器页码发生变化时候回调
const currentChange = () => {
    getHospitalInfo();
};
//分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
    //当前页码归第一页
    pageNo.value = 1;
    //再次发请求获取医院的数据
    getHospitalInfo();
};

const getLevel = (level: string) => {
    //收集参数:等级参数
    hostype.value = level;
    //再次发请求
    getHospitalInfo();
}

const getRegion = (region: string) => {
    //收集参数:等级参数
    districtCode.value = region;
    //再次发请求
    getHospitalInfo();
}
</script>

<style lang="scss" scoped>
.hospital {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0px;
    padding: 1px;

}
</style>
  