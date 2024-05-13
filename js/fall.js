function Obj() {}

// 定义下落功能
Obj.prototype.fall = function (parentEle, childEle) {
  let startPosLeft = Math.ceil(Math.random() * parentEle.clientWidth) // 元素随机出现的位置
  childEle.style.left = startPosLeft + 'px'
  childEle.style.width = 20 + Math.ceil(Math.random() * 6) + 'px' //设置元素大小
  childEle.style.opacity = 0 // 默认不显示
  let speed = -60 // 位置初始化
  setTimeout(() => {
    childEle.style.opacity = 1 // 位置初始化后显示
  }, 30)

  // 定于下落
  setInterval(function () {
    //元素超出屏幕可视区域执行
    if (speed < document.documentElement.clientHeight) {
      childEle.style.top = speed + 'px'
      childEle.style.left = startPosLeft + Math.ceil(Math.random() * 0) + 'px' // 左右抖动
      speed += 1 // 下落速度
    } else {
      childEle.remove() // 超出删除
    }
  }, 20)
}

// 获取容器
const containerEle = document.querySelector('#fall')
containerEle.style.position = 'relative'
containerEle.style.margin = '0 1.5%' // 防止超出屏幕范围
// 定义开关
let setId = null
// 创建子元素
function createChildEle() {
  setId = setInterval(() => {
    const childEle = document.createElement('div') // 创建子元素
    childEle.style.position = 'absolute'
    containerEle.appendChild(childEle) // 把创建好的子元素放进容器中
    const obj = new Obj()
    obj.fall(containerEle, childEle) // 为子元素添加下落功能
    // 为子元素随机添加图片
    let arr = [
      '<img src="./images/1.png" alt="">',
      '<img src="./images/2.png" alt="">',
      '<img src="./images/3.png" alt="">',
      '<img src="./images/4.png" alt="">',
      '<img src="./images/5.png" alt="">',
      '<img src="./images/6.png" alt="">',
      '<img src="./images/7.png" alt="">'
    ]
    let i = Math.floor(Math.random() * arr.length)
    childEle.innerHTML = arr[i]
    childEle.style.minWidth = '32px'
    childEle.style.width = '1.7vw'
    childEle.children[0].style.width = '100%'
  }, 1200)
}
createChildEle()

// 页面切出切入
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    // 页面被切出
    clearTimeout(setId)
  } else if (document.visibilityState === 'visible') {
    // 页面被切入
    createChildEle()
  }
})

// 禁止缩放
window.addEventListener(
  'wheel',
  function (e) {
    // 阻止鼠标滚轮事件的默认行为
    e.preventDefault()
  },
  { passive: false }
)
