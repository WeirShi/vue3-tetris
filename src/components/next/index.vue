<template>
  <div class="next">
    <div v-for="(item, index) in block" :key="index">
      <b :class="e ? 'c' : ''" v-for="(e, k2) in item" :key="k2" />
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue';
import { blockShape } from '@/utils/constant'
const xy = {
  // 方块在下一个中的坐标
  I: [1, 0],
  L: [0, 0],
  J: [0, 0],
  Z: [0, 0],
  S: [0, 0],
  O: [0, 1],
  T: [0, 0]
}
const empty = [[0, 0, 0, 0], [0, 0, 0, 0]]
export default {
  props: {
    data: {
      type: String,
      default: 'I'
    }
  },
  setup (props) {
    const block = ref(empty)

    watch(props, (newVal, _) => {
      build(newVal.data)
    })

    const build = (type) => {
      const shape = blockShape[type]
      const block = empty.map(e => [...e])
      shape.forEach((m, k1) => {
        m.forEach((n, k2) => {
          if (n) {
            block[k1 + xy[type][0]][k2 + xy[type][1]] = 1
          }
        })
      })
      block.value = block
    }

    return {
      block
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>