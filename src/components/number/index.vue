<template>
  <div class="number">
    <span v-for="(item,index) in data" :class="'bg s_'+item" :key="index" />
  </div>
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from 'vue';


const formate = num => (num < 10 ? `0${num}`.split('') : `${num}`.split(''))
let NumberObj = {
  timeInterval: null,
  time_count: null
}
export default {
  props: {
    propTime: {
      type: Boolean,
      default: false
    },
    number: {
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      default: 6
    }
  },
  setup (props) {
    const data = ref([])
    const time_count = ref('')
    const time = reactive({
      value: new Date()
    })

    watch(props, (newVal, _) => {
      render()
    })


    const render = () => {
      if (props.propTime) {
        // 右下角时钟
        const now = time.value
        const hour = formate(now.getHours())
        const min = formate(now.getMinutes())
        const sec = now.getSeconds() % 2
        const t = hour.concat(sec ? 'd' : 'd_c', min)
        data.value = t
        return
      }
      const num = `${props.number}`.split('')
      for (let i = 0, len = props.length - num.length; i < len; i++) {
        num.unshift('n')
      }
      data.value = num
    }

    onBeforeMount(() => {
      if (!props.length) {
        props.length = 6
      }
      if (!props.propTime) {
        return
      }
      const clock = () => {
        const count = +NumberObj.timeInterval
        NumberObj.timeInterval = setTimeout(() => {
          time.value = new Date()
          time_count.value = count
          render()
          clock()
        }, 1000)
      }
      clock()
    })

    onMounted(() => {
      render()
    })

    return {
      data
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>