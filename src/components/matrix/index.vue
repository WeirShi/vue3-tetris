<template>
  <div class="matrix">
    <p v-for="(p, $pIndex) in matrix" :key="$pIndex">
      <b
        v-for="(e, $eIndex) in p" :key="$eIndex"
        :class="(e === 1 ? 'c' : '') + (e === 2 ? 'd' : '')" />
    </p>

  </div>
</template>

<script>
import { watch, ref, onMounted } from 'vue';
import { isClear } from '@/utils'
import { fillLine, blankLine } from '@/utils/constant'
import states from '@/control/states'
const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
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
    propMatrix: {
      default: () => {
        return []
      },
      type: Array
    }
  },
  setup (props) {

    const clearLines = ref(false)
    const animateColor = ref(2)
    const isOver = ref(false)
    const overState = ref(null)
    const matrix = ref([])

    watch(props, (newVal = {}, _) => {
      propsChange(newVal)
    }, {
      deep: true
    })

    const propsChange = async (nextProps) => {
      const clears = isClear(nextProps.propMatrix)
      const overs = nextProps.reset
      await sleep(16)
      clearLines.value = clears
      isOver.value = overs
      if (clears && !clearLines.value) {
        clearAnimate(clears)
      }
      if (!clears && overs && !isOver.value) {
        over(nextProps)
      }
    }

    const clearAnimate = async () => {
      const anima = callback => {
        return new Promise((resolve) => {
          sleep(100).then(() => {
            animateColor.value = 0
            return sleep(100)
          }).then(() => {
            animateColor.value = 2
            if (typeof callback === 'function') {
              callback()
            }
            return resolve()
          })
        })
      }


      anima().then(() => {
        anima(() => {
          sleep(100).then(() => {
            states.clearLines(propMatrix.value, clearLines.value)
          })
        })
      })
    }

    const over = async (nextProps) => {
      let _overState = getResult(nextProps)
      overState.value = [..._overState]
      const exLine = index => {
        if (index <= 19) {
          _overState[19 - index]=fillLine
        } else if (index >= 20 && index <= 39) {
          _overState[index - 20]=blankLine
        } else {
          states.overEnd()
          return
        }
        overState.value = [..._overState]
      }

      for (let i = 0; i <= 40; i++) {
        await sleep(40 * (i + 1))
        exLine.bind(null, i)
      }
    }


    const getResult = (_props) => {
      if (!_props) {
        _props = props
      }
      const cur = _props.cur
      const shape = cur && cur.shape
      const xy = cur && cur.xy
      let matrix = JSON.parse(JSON.stringify(_props.propMatrix))
      const _clearLines = clearLines.value
      if (_clearLines) {
        const animateColor = animateColor.value
        _clearLines.forEach(index => {
          matrix[index]=[
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor
          ]
         
        })
      } else if (shape) {
        shape.forEach((m, k1) =>
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) {
              // 竖坐标可以为负
              let line = matrix[xy[0]+k1]
              let color
              if (line[xy[1] + k2] === 1 && !_clearLines) {
                // 矩阵与方块重合
                color = 2
              } else {
                color = 1
              }
              line[xy[1] + k2]=color
              matrix[xy[0] + k1]=line
            }
          })
        )
      }
      return matrix
    }

    onMounted(() => {
      render()
    })

    const render = () => {
      if (isOver.value) {
        matrix.value = overState.value
      } else {
        matrix.value = getResult()
      }

      console.log(isOver.value)
    }

    return {
      matrix
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>