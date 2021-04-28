import event from '@/utils/event'

const down = store => {
  if (store.state.lock) {
    return
  }
  event.down({
    key: 's',
    once: true,
    callback: () => {
      if (store.state.lock) {
        return
      }
    }
  })
}

const up = store => {
  event.up({
    key: 's'
  })
}

export default {
  down,
  up
}
