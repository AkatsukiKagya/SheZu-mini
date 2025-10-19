// 集中管理媒体数据与查询
const MEDIA_LIST = [
  {
    id: 1,
    title: '采茶歌',
    desc: '畲族传统劳动歌，旋律轻快明朗。',
    cover: 'https://akatsukikagya.github.io/Aka-media/media/shezu/images/caicha.png',
    video: 'https://akatsukikagya.github.io/Aka-media/media/shezu/videos/caicha.mp4',
    audio: 'https://akatsukikagya.github.io/Aka-media/media/shezu/audios/caicha.mp3'
  },
  {
    id: 2,
    title: '山歌唱给有情人',
    desc: '畲族情歌代表作之一，真挚动人。',
    cover: 'https://akatsukikagya.github.io/Aka-media/media/shezu/images/shange.png',
    video: 'https://akatsukikagya.github.io/Aka-media/media/shezu/videos/shange.mp4',
    audio: 'https://akatsukikagya.github.io/Aka-media/media/shezu/audios/shange.mp3'
  },
  {
    id: 3,
    title: '祭祖歌',
    desc: '庄重肃穆的祭祀歌，表达敬祖之情。',
    cover: 'https://akatsukikagya.github.io/Aka-media/media/shezu/images/jizu.png',
    video: 'https://akatsukikagya.github.io/Aka-media/media/shezu/videos/jizu.mp4',
    audio: 'https://akatsukikagya.github.io/Aka-media/media/shezu/audios/jizu.mp3'
  },
  {
    id: 4,
    title: '高皇歌',
    desc: '畲族古老史诗，讲述民族起源传说。',
    cover: 'https://akatsukikagya.github.io/Aka-media/media/shezu/images/gaohuang.png',
    video: 'https://akatsukikagya.github.io/Aka-media/media/shezu/videos/gaohuang.mp4',
    audio: 'https://akatsukikagya.github.io/Aka-media/media/shezu/audios/gaohuang.mp3'
  }
];

function getMediaList() {
  return MEDIA_LIST;
}

function getMediaById(id) {
  return MEDIA_LIST.find(item => Number(item.id) === Number(id));
}

module.exports = {
  MEDIA_LIST,
  getMediaList,
  getMediaById
};


