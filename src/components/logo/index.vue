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
      console.log(nextProps, oldProps)
      animate(nextProps)
      if (
        // 只有在游戏进入开始, 或结束时 触发改变
        ([oldProps.cur, nextProps.cur].indexOf(false) !== -1 &&
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
        return new Promise((resolve) => {
          sleep(delay1).then(() => {
            className.value = m + 2
            return sleep(delay2)
          }).then(() => {
            className.value = m + 1
            func && func()
            return resolve()
          })
        })
      }

      const run = func => {
        // 开始跑步
        sleep(100).then(() => {
          className.value = m + 4
          return sleep(100)
        }).then(() => {
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
            sleep(4000).then(func)
        })
      }

      const dra = () => {
        count = 0
        eyes(null, 1000, 1500).then(() => {
          return eyes(null, 150, 150)
        }).then(() => {
          return eyes(() => {
            className.value = m + 2
            run(dra)
          }, 150, 150)
        })
      }

      isShow(null, false)
      await sleep(150)
        .then(() => {
          isShow(null, true)
          return sleep(150)
        })
        .then(() => {
          isShow(null, false)
          return sleep(150)
        })
        .then(() => {
          return isShow(dra(), true)
        })
    }

    onBeforeMount(() => {
      console.log('onBeforeMount', props)
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
