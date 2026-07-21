// 同一时刻只允许一个"作品 / 广告"视频播放。
// 播放新视频时，把其它已注册的视频暂停并回到初始状态（进度归零、隐藏控件）。
// 仅用于 Projects / TvcMarquee 内的可交互视频；首屏 Hero 背景视频不注册，故不受影响。

const stopFns = new Map() // id -> () => void

// 注册一个播放器，返回注销函数（组件卸载时调用）
export function registerPlayer(id, stop) {
  stopFns.set(id, stop)
  return () => {
    if (stopFns.get(id) === stop) stopFns.delete(id)
  }
}

// 请求播放 id 对应的视频：暂停并重置所有其它已注册视频
export function requestPlay(id) {
  stopFns.forEach((stop, otherId) => {
    if (otherId !== id) stop()
  })
}
