<template>
  <div class="bottom">
    <div class="content">
      <div class="left">京ICP备 13018369号 电话挂号010-56253825</div>
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>

<style lang='scss' scoped>
.bottom {
  display: flex;
  width: 100%;
  height: 50px;
  background: #f0f2f5;
  justify-content: center;

  .content {
    width: 1200px;
    height: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;

    .right {
      span {
        margin: 0px 5px;
      }
    }
  }

}
</style>
