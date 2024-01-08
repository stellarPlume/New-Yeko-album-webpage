import 'https://cdn.bootcdn.net/ajax/libs/howler/2.2.3/howler.core.min.js'
let sound = null
let audioId = null
let activeId = null

const items = document.querySelectorAll('.sound .item')

// 播放
function palySound(id) {
  // 清除上一个音频
  if (sound) sound.pause(audioId)
  // 创建音频
  sound = new Howl({
    src: [`../sound/${id}.mp3`], // 音频地址
    html5: true
  })
  // 播放
  audioId = sound.play()
  // 播放完毕
  sound.on('end', function () {
    if (activeId !== items.length) {
      // 切换下一首歌
      activeId += 1
    } else {
      // 切换到第一首歌
      activeId = 1
    }
    // 高亮对应的歌
    const activeEle = document.querySelector('.sound .active')
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

const soundEle = document.querySelector('.sound')
let isPlay = true

soundEle.addEventListener('click', e => {
  // 重复不生效
  if (e.target.dataset.id == activeId)
    return (function () {
      if (isPlay) {
        isPlay = false
        sound.pause(audioId)
      } else {
        isPlay = true
        sound.play(audioId)
      }
    })()

  // 点击高亮
  const activeEle = document.querySelector('.sound .active')
  activeEle && activeEle.classList.remove('active')
  e.target.classList.add('active')
  // 播放音频
  activeId = +e.target.dataset.id
  palySound(activeId)
})

// 空格暂停播放
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    if (!audioId) return
    if (isPlay) {
      isPlay = false
      sound.pause(audioId)
    } else {
      isPlay = true
      sound.play(audioId)
    }
  }
})
