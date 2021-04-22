import { createStore } from 'vuex';
import mutations from './mutations'

import { getNextType } from '@/utils'
import { isFocus } from '@/utils'
import { blankMatrix, lastRecord, maxPoint, blockType } from '@/utils/constant'
import Block from '@/utils/block'
import { hasWebAudioAPI } from '@/utils/music'


const clearLinesInitState = () => {
  const _state = (lastRecord && !isNaN(parseInt(lastRecord.clearLines, 10)))
        ? parseInt(lastRecord.clearLines, 10)
        : 0
  if (_state < 0) {
    _state = 0
  }
  return _state  
}

const curInitState = () => {
  if (!lastRecord || !lastRecord.cur) {
    // 无记录 或 有记录 但方块为空, 返回 null
    return null
  }
  const cur = lastRecord.cur
  const option = {
    type: cur.type,
    rotateIndex: cur.rotateIndex,
    shape: cur.shape,
    xy: cur.xy
  }
  return new Block(option)
}

const dropInitState = () => {
  const _state = lastRecord && lastRecord.drop !== undefined
    ? !!lastRecord.drop
    : false
  return _state
}

const lockInitState = () => {
  const _state = lastRecord && lastRecord.lock !== undefined
    ? !!lastRecord.lock
    : false
  return _state;
}


const matrixInitState = () => {
  const _state = lastRecord && Array.isArray(lastRecord.matrix)
    ? lastRecord.matrix
    : blankMatrix

  return _state
}

const maxInitState = () => {
  const _state = lastRecord && !isNaN(parseInt(lastRecord.max, 10))
    ? parseInt(lastRecord.max, 10)
    : 0
  if (_state < 0) {
    _state = 0
  } else if (_state > maxPoint) {
    _state = maxPoint
  }

  return _state
}

const musicInitState = () => {
  const _state = lastRecord && lastRecord.music !== undefined
    ? !!lastRecord.music
    : true
  if (!hasWebAudioAPI.data) {
    _state = false
  }

  return _state
}

const nextInitState = () => {
  const _state = lastRecord && blockType.indexOf(lastRecord.next) !== -1
    ? lastRecord.next
    : getNextType()
  return _state
}

const pauseInitState = () => {
  const _state = lastRecord && lastRecord.pause !== undefined
    ? !!lastRecord.pause
    : false
  return _state
} 

const pointsInitState = () => {
  const _state = lastRecord && !isNaN(parseInt(lastRecord.points, 10))
    ? parseInt(lastRecord.points, 10)
    : 0
  if (_state < 0) {
    _state = 0
  } else if (_state > maxPoint) {
    _state = maxPoint
  }

  return _state
}

const speedRunInitState = () => {
  const _state = lastRecord && !isNaN(parseInt(lastRecord.speedRun, 10))
    ? parseInt(lastRecord.speedRun, 10)
    : 1
  if (_state < 1 || _state > 6) {
    _state = 1
  }
  return _state
}

const speedStartInitState = () => {
  const _state = lastRecord && !isNaN(parseInt(lastRecord.speedStart, 10))
    ? parseInt(lastRecord.speedStart, 10)
    : 1
  if (_state < 1 || _state > 6) {
    _state = 1
  }
  return _state
}

const startLinesInitState = () => {
  const _state = lastRecord && !isNaN(parseInt(lastRecord.startLines, 10))
    ? parseInt(lastRecord.startLines, 10)
    : 0
  if (_state < 0 || _state > 10) {
    _state = 0
  }

  return _state
}

const resetInitState = () => {
  const _state = lastRecord && lastRecord.reset
    ? !!lastRecord.reset
    : false
  return _state
}

const state = {
  music: musicInitState(),
  pause: pauseInitState(),
  matrix: matrixInitState(),
  next: nextInitState(),
  cur: curInitState(),
  speedStart: speedStartInitState(),
  speedRun: speedRunInitState(),
  startLines: startLinesInitState(),
  clearLines: clearLinesInitState(),
  points: pointsInitState(),
  max: maxInitState(),
  reset: resetInitState(),
  drop: dropInitState(),
  keyboard: {
    drop: false,
    down: false,
    left: false,
    right: false,
    rotate: false,
    reset: false,
    music: false,
    pause: false
  },

  lock: lockInitState(),
  focus: isFocus()
}

const store = createStore({
  state,
  mutations
})

export default store
