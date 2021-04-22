<template>
   <div class="bg pause" :class="{'c': showPause}" />
</template>

<script>

import { onMounted, ref, watch } from 'vue';
let Pause = {
  timeout: null
}
export default {
  props: {
    data: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const showPause = ref(false)
    watch(props, (newVal, _) => {
      setShake(newVal.data)
    })

    onMounted(() => {
      setShake(props.data)
    })

    const setShake = (bool) => {
      if (bool && !Pause.timeout) {
        Pause.timeout = setInterval(() => {
          showPause.value = !showPause.value
        }, 250)
      }
      if (!bool && Pause.timeout) {
        clearInterval(Pause.timeout)
        showPause.value = false
        Pause.timeout = null
      }
    }
    return {
      showPause
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>