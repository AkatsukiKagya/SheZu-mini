Page({
  data: {
    title: '',
    audio: ''
  },
  onLoad(options) {
    this.setData({
      title: decodeURIComponent(options.title),
      audio: decodeURIComponent(options.audio)
    });
  }
});
