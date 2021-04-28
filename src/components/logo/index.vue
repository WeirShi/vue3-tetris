<template>
  <div class="logo" :style="{ display: display }">
    <div class="bg dragon" :class="className" />
    <p v-html="titleCenter" />
  </div>
</template>

<script>
import { ref, watch, computed, onBeforeMount } from 'vue'
import { i18n, lan } from '@/utils/constant'
let Logo = {
  timeout: null
}
export default {
  props: {
    cur: {
      default: false,
      type: Boolean
    },
    reset: {
      default: false,
      type: Boolean
    },
  },
  setup (props) {
    const className = ref('r1')
    const display = ref('none')
    const titleCenter = computed(() => i18n.titleCenter[lan])

    watch(props, (nextProps, oldProps) => {
      animate(nextProps)
      if (
        // 只有在游戏进入开始, 或结束时 触发改变
        ([oldProps.cur, nextProps.cur].includes(false) &&
          oldProps.cur !== nextProps.cur) ||
        oldProps.reset !== nextProps.reset
      ) {
        animate(nextProps)
      }
    }, {
      deep: true
    })

    const animate = async ({ cur, reset }) => {
      clearTimeout(Logo.timeout)
      className.value = 'r1'
      display.value = 'none'
      if (cur || reset) {
        display.value = 'none'
        return
      }

      let m = 'r' // 方向
      let count = 0

      const sleep = delay => {
        return new Promise((reslove) => {
          Logo.timeout = setTimeout(reslove, delay)
        })
      }

      const isShow = (func, value) => {
        display.value = value ? 'block' : 'none'
        func && func()
      }

      const eyes = (func, delay1, delay2) => {
        // 龙在眨眼睛
        return new Promise(async resolve => {
          await sleep(delay1)
          className.value = m + 2
          await sleep(delay2)
          className.value = m + 1
          func && func()
          return resolve()
        })
      }

      const run = async func => {
        // 开始跑步
        await sleep(100)
        className.value = m + 4
        await sleep(100)
        className.value = m + 3;
        count++
        if (count === 10 || count === 20 || count === 30) {
          m = m === 'r' ? 'l' : 'r'
        }
        if (count < 40) {
          run(func)
          return
        }
        className.value = m + 1
        await sleep(4000)
        func && func()
      }

      const dra = async () => {
        count = 0
        await eyes(null, 1000, 1500)
        await eyes(null, 150, 150)
        await eyes(() => {
            className.value = m + 2
            run(dra)
          }, 150, 150)
      }

      isShow(null, false)
      await sleep(150)
      isShow(null, true)
      await sleep(150)
      isShow(null, false)
      await sleep(150)
      isShow(dra, true)
    }

    onBeforeMount(() => {
      animate(props)
    })

    return {
      className,
      display,
      titleCenter
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
