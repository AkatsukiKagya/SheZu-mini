// pages/test-page/test-page.js
Page({
  data: {
    videoSrc: 'https://cdn.jsdelivr.net/gh/AkatsukiKagya/Aka-media@main/media/shezu/videos/caicha_h264.mp4',
    autoplay: true,
    showReplay: false
  },

  // 视频播放结束事件
  onVideoEnded() {
    this.setData({ showReplay: true });
  },

  // 点击重新播放
  replayVideo() {
    const videoContext = wx.createVideoContext('myVideo');
    videoContext.seek(0);      // 从头开始
    videoContext.play();        // 播放
    this.setData({ showReplay: false });
  }
});
