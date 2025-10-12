// pages/media-list/media-list.js
const mediaList = [
  {
    id: 1,
    title: "采茶歌",
    desc: "畲族传统劳动歌，旋律轻快明朗。",
    cover: "http://121.40.247.80:5173/src/assets/images/caicha.png",
    video: "https://akatsukikagya.github.io/Aka-media/media/shezu/videos/test.mp4",
    audio: "http://121.40.247.80:5173/src/assets/audio/caicha.mp3"
  },
  {
    id: 2,
    title: "山歌唱给有情人",
    desc: "畲族情歌代表作之一，真挚动人。",
    cover: "http://121.40.247.80:5173/src/assets/images/shange.png",
    video: "http://121.40.247.80:5173/src/assets/videos/shange.mp4",
    audio: "http://121.40.247.80:5173/src/assets/audio/shange.mp3"
  },
  {
    id: 3,
    title: "祭祖歌",
    desc: "庄重肃穆的祭祀歌，表达敬祖之情。",
    cover: "http://121.40.247.80:5173/src/assets/images/jizu.png",
    video: "http://121.40.247.80:5173/src/assets/videos/jizu.mp4",
    audio: "http://121.40.247.80:5173/src/assets/audio/jizu.mp3"
  },
  {
    id: 4,
    title: "高皇歌",
    desc: "畲族古老史诗，讲述民族起源传说。",
    cover: "http://121.40.247.80:5173/src/assets/images/gaohuang.png",
    video: "http://121.40.247.80:5173/src/assets/videos/gaohuang.mp4",
    audio: "http://121.40.247.80:5173/src/assets/audio/gaohuang.mp3"
  }
];

Page({
  data: {
    mediaList: mediaList
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/media-detail/media-detail?id=${id}`
    });
  }
});