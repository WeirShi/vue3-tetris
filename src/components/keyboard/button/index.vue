<template>
  <div class="button" :class="color+' '+size" :style="{ top: top+'px', left: left+'px' }">
    <i :class="{'active': active}" />
    <em :style="{transform: arrow + ' scale(1,2)'}" v-show="size === 's1'" />
    <span :class="position ? 'position' :''">
      {{label}}
    </span>
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'vButton',
  props: [
    'active',
    'color',
    'size',
    'top',
    'left',
    'label',
    'position',
    'arrow'
  ]
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>