const cdn_download_src = "https://raw.githubusercontent.com/AkatsukiKagya/Aka-media/v1.2"
const cdnsrc = "https://cdn.jsdelivr.net/gh/AkatsukiKagya/Aka-media@v1.2"
const mediaList = [
  {
    id: 1,
    title: "采茶歌",
    desc: "畲族传统劳动歌，旋律轻快明朗。",
    cover: cdnsrc + "/media/shezu/images/caicha.png",
    video: cdnsrc + "/media/shezu/videos/caicha.mp4",
    audio: cdnsrc + "/media/shezu/audios/caicha.mp3"
  },
  {
    id: 2,
    title: "山歌唱给有情人",
    desc: "畲族情歌代表作之一，真挚动人。",
    cover: cdnsrc + "/media/shezu/images/shange.png",
    video: cdnsrc + "/media/shezu/videos/shange.mp4",
    audio: cdnsrc + "/media/shezu/audios/shange.mp3"
  },
  {
    id: 3,
    title: "祭祖歌",
    desc: "庄重肃穆的祭祀歌，表达敬祖之情。",
    cover: cdnsrc + "/media/shezu/images/jizu.png",
    video: cdnsrc + "/media/shezu/videos/jizu.mp4",
    audio: cdnsrc + "/media/shezu/audios/jizu.mp3"
  },
  {
    id: 4,
    title: "高皇歌",
    desc: "畲族古老史诗，讲述民族起源传说。",
    cover: cdnsrc + "/media/shezu/images/gaohuang.png",
    video: cdnsrc + "/media/shezu/videos/gaohuang.mp4",
    audio: cdnsrc + "/media/shezu/audios/gaohuang.mp3"
  }
];

Page({
  data: {
    media: {},
    mode: 'video', // video 或 audio
    autoplay: true
  },

  onLoad(options) {
    const id = Number(options.id);
    const media = mediaList.find(item => item.id === id);
    if (media) {
      this.setData({ media });
    }
  },

  

  goBack() {
    wx.navigateBack();
  },

  switchMode() {
    const newMode = this.data.mode === 'video' ? 'audio' : 'video';
    this.setData({ mode: newMode });
  }
});
