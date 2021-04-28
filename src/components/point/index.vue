<template>
  <div>
    <p>{{label}}</p>
    <Number :number="number"/>
  </div>
</template>

<script>
import { watch, ref, onMounted } from 'vue';
import Number from '../number/index.vue'
import { i18n, lan } from '@/utils/constant'
const DF = i18n.point[lan] // 得分
const ZDF = i18n.highestScore[lan] // 最高分
const SLDF = i18n.lastRound[lan] // 上一把的得分

let Point = {
  timeout: null
}
export default {
  components: {
    Number
  },
  props: ['cur', 'max', 'point'],
  setup (props) {
    const label = ref('')
    const number = ref(0)

    watch(props, (newVal) => {
      onChange(newVal)
    })

    onMounted(() => {
      onChange(props)
    })

    const onChange = ({cur, point, max}) => {
      clearTimeout(Point.timeout)
      if (cur) {
        // 在游戏进行中
        label.value = point >= max ? ZDF : DF
        number.value = point
      } else {
        // 游戏未开始
        const toggle = () => {
          // 最高分与上轮得分交替出现
          label.value = SLDF
          number.value = point
          Point.timeout = setTimeout(() => {
            label.value = ZDF
            number.value = max
            Point.timeout = setTimeout(toggle, 3000)
          }, 3000)
        }

        if (point !== 0) {
          // 如果为上轮没玩, 也不用提示了
          toggle()
        } else {
          label.value = ZDF
          number.value = max
        }
      }
    }

    return {
      label,
      number
    }
  }
}
</script>