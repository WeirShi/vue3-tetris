<template>
  <div class="decorate">
    <!-- 面板左右装饰 -->
    <div class="topBorder">
      <span class="l mr" style="width:40px;" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="r ml" style="width:40px;" />
      <span class="r ml" />
      <span class="r ml" />
      <span class="r ml" />
      <span class="r ml" />
    </div>
    <h1>{{title}}</h1>
    <div class="view">
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <em/>
      <b class="c" />
      <p/>
      <em/>
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <em/>
      <b class="c" />
      <p/>
      <b class="c" />
      <b class="c" />
      <b class="c" />
      <b class="c" />
      <p/>
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <p/>
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <p/>
      <em/>
      <b class="c" />
      <div class="clear" />
      <em/>
      <b class="c" />
      <div class="clear" />
      <em/>
      <b class="c" />
      <div class="clear" />
      <em/>
      <b class="c" />
    </div>
    <div class="view l">
      <em/>
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <p/>
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <p/>
      <b class="c" />
      <b class="c" />
      <b class="c" />
      <b class="c" />
      <p/>
      <em/>
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <em/>
      <b class="c" />
      <p/>
      <b class="c" />
      <b class="c" />
      <div class="clear" />
      <em/>
      <b class="c" />
      <div class="clear" />
      <em/>
      <b class="c" />
      <p/>
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
      <div class="clear" />
      <b class="c" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { i18n, lan } from '@/utils/constant'
export default defineComponent({
  name: 'Decorate',
  setup() {
    const title = computed(() => i18n.title[lan])
    const github = computed(() => i18n.github[lan])
    const QRTitle = computed(() => i18n.QRNotice[lan])
    const QRCode = computed(() => i18n.QRCode[lan])

    return {
      title,
      github,
      QRTitle,
      QRCode
    }
  }
})
</script>

<style lang="less" scoped>
@import './index.less';
</style>