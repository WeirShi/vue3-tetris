<template>
  <div class="app" :style="size">
    <div class="rect" :class="drop?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <Matrix :propMatrix="matrix" :cur="cur" :reset="reset" />
          <Logo :cur="!!cur" :reset="reset" />
          <div class="state">
            <Point :cur="!!cur" :max="max" :point="points" />
            <p>{{pContent}}</p>
            <Number :number='cur ? clearLines : startLines' />
            <p>{{level}}</p>
            <Number :number='cur ? speedRun : speedStart' :length="1" />
            <p>{{nextText}}</p>
            <Next :data="next" />
            <div class="bottom">
              <Music :data="music" />
              <Pause :data="pause" />
              <Number :propTime="true" />
            </div> 
          </div>
        </div>
      </div>
    </div>
    <Keyboard :filling='filling' :cur="!!cur" />
    <Guide/>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { transform, lastRecord, speeds, i18n, lan } from '@/utils/constant'
import { visibilityChangeEvent, isFocus } from '@/utils'
import states from '@/control/states'
import Decorate from './components/decorate/index.vue'
import Guide from './components/guide/index.vue'
import Keyboard from './components/keyboard/index.vue'
import Logo from './components/logo/index.vue'
import Matrix from './components/matrix/index.vue'
import Next from './components/next/index.vue'
import Number from './components/number/index.vue'
import Pause from './components/pause/index.vue'
import Point from './components/point/index.vue'
import Music from './components/music/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Decorate,
    Guide,
    Keyboard,
    Logo,
    Matrix,
    Next,
    Number,
    Pause,
    Point,
    Music
  },
  setup() {
    const store = useStore()
    const size = ref({})
    const w = ref(document.documentElement.clientWidth)
    const h = ref(document.documentElement.clientHeight)
    const filling = ref('')

    const matrix = computed(() => store.state.matrix)
    const keyboard = computed(() => store.state.keyboard)
    const music = computed(() => store.state.music)
    const pause = computed(() => store.state.pause)
    const next = computed(() => store.state.next)
    const cur = computed(() => store.state.cur)
    const speedStart = computed(() => store.state.speedStart)
    const speedRun = computed(() => store.state.speedRun)
    const startLines = computed(() => store.state.startLines)
    const clearLines = computed(() => store.state.clearLines)
    const points = computed(() => store.state.points)
    const max = computed(() => store.state.max)
    const reset = computed(() => store.state.reset)
    const drop = computed(() => store.state.drop)
    
    const pContent = computed(() => cur.value ? i18n.cleans[lan] : i18n.startLine[lan])
    const level = computed(() => i18n.level[lan])
    const nextText = computed(() => i18n.next[lan])

    console.log('next', next)

    onMounted(() => {
      window.addEventListener('resize', resize, true)
      render()
    })

    const resize = () => {
      w.value = document.documentElement.clientWidth
      h.value = document.documentElement.clientHeight
      render()
    }

    const render = () => {
      let _filling = 0
      const _size = (() => {
        
        const _w = w.value
        const _h = h.value
        const ratio = _h / _w
        let scale
        let css = {}
        if (ratio < 1.5) {
          scale = _h / 960
        } else {
          scale = _w / 640
          _filling = (_h - 960 * scale) / scale / 3
          css = {
            'padding-top': Math.floor(_filling) + 42 + 'px',
            'padding-bottom': Math.floor(_filling) + 'px',
            'margin-top': Math.floor(-480 - _filling * 1.5) + 'px'
          }
        }
        css[transform] = `scale(${scale})`
        return css
      })()
      size.value = _size
      filling.value = _filling
      start()
    }

    const start = () => {
      if (visibilityChangeEvent) {
        // 将页面的焦点变换写入store
        document.addEventListener(
          visibilityChangeEvent,
          () => {
            states.focus(isFocus())
          },
          false
        )
      }
      console.log('lastRecord', lastRecord)
      if (lastRecord) {
        // 读取记录
        if (lastRecord.cur && !lastRecord.pause) {
          // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
          const speedRun = this.$store.state.speedRun
          let timeout = speeds[speedRun - 1] / 2 // 继续时, 给予当前下落速度一半的停留时间
          // 停留时间不小于最快速的速度
          timeout =
            speedRun < speeds[speeds.length - 1]
              ? speeds[speeds.length - 1]
              : speedRun
          states.auto(timeout)
        }

        if (!lastRecord.cur) {
          states.overStart()
        }
      } else {
        states.overStart()
      }
    }


    return {
      filling,
      size,
      w,
      h,
      matrix,
      keyboard,
      music,
      pause,
      next,
      cur,
      speedStart,
      speedRun,
      startLines,
      clearLines,
      points,
      max,
      reset,
      drop,
      pContent,
      level,
      nextText
    }
  }
})
</script>

<style lang="less">
@import './app.less';
@import './loader.less';
</style>
