<template>
  <div v-show="!isM">
    <div class="guide right">
      <div class="up">
        <em style="transform:translate(0,-3px) scale(1,2)" />
      </div>
      <div class="left">
        <em style="transform:translate(-7px,3px) rotate(-90deg) scale(1,2)" />
      </div>
      <div class="down">
        <em style="transform: translate(0,9px) rotate(180deg) scale(1,2)" />
      </div>
      <div class="right">
        <em style="transform: translate(7px,3px)rotate(90deg) scale(1,2)" />
      </div>
    </div>
    <div class="guide left">
      <div class="space">{{Space}}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from 'vue'
import { i18n, lan } from '@/utils/constant'
import { isMobile } from '@/utils'
export default defineComponent({
  name: 'Guide',
  setup () {
    const isM = ref(isMobile())
    const linkTitle = computed(() => i18n.linkTitle[lan])
    const github = computed(() => i18n.github[lan])
    const QRCode = computed(() => i18n.QRCode[lan])
    const QRTitle = computed(() => i18n.QRNotice[lan])
    const Space = computed(() => i18n.Space[lan])
    const QRSrc = computed(() => window.location.protocol +
      '//raw.githubusercontent.com/Binaryify/vue-tetris/master/static/qr.jpeg')


    onMounted(() => {
      window.addEventListener('resize', resize.bind(this), true)
    })

    const resize = () => {
      isM.value = isMobile()
    }

    return {
      isM,
      linkTitle,
      github,
      QRCode,
      QRTitle,
      Space,
      QRSrc
    }
  }
})
</script>

<style lang="less" scoped>
@import './index.less';
</style>
