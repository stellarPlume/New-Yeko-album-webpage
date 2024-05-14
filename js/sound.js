let soundModel = null
let soundID = null
let activeId = null

const items = document.querySelectorAll('.sound .main .item')

// 播放
function palySound(id) {
  // 清除上一个音频
  if (soundModel) soundModel.pause(soundID)
  // 创建音频
  soundModel = new Howl({
    src: [`./sound/${id}.mp3`], // 音频地址
    html5: true
  })
  // 播放
  soundID = soundModel.play()
  // 播放完毕
  soundModel.on('end', function () {
    if (activeId !== items.length) {
      // 切换下一首歌
      activeId += 1
    } else {
      // 切换到第一首歌
      activeId = 1
    }
    // 高亮对应的歌
    const activeEle = document.querySelector('.sound .main .active')
    activeEle && activeEle.classList.remove('active')
    items.forEach(item => {
      if (item.dataset.id == activeId) {
        item.classList.add('active')
      }
    })
    // 播放
    palySound(activeId)
  })
}

const soundEle = document.querySelector('.sound .main')
let isPlay = true

soundEle.addEventListener('click', e => {
  // 重复点击不生效
  if (e.target.dataset.id == activeId)
    return (() => {
      if (isPlay) {
        isPlay = false
        soundModel.pause(soundID)
      } else {
        isPlay = true
        soundModel.play(soundID)
      }
    })()

  // 点击高亮
  const activeEle = document.querySelector('.sound .main .active')
  activeEle && activeEle.classList.remove('active')
  e.target.classList.add('active')
  // 播放音频
  activeId = +e.target.dataset.id
  palySound(activeId)
})

// 空格暂停播放
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    if (!soundID) return
    if (isPlay) {
      isPlay = false
      soundModel.pause(soundID)
    } else {
      isPlay = true
      soundModel.play(soundID)
    }
  }
})
