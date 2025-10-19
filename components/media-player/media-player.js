const { t } = require('../../utils/i18n');

Component({
  properties: {
    media: { type: Object, value: {} }
  },
  data: {
    mode: 'video',
    isPlaying: false,
    progress: 0,
    duration: 0,
    audio: null,
    texts: {}
  },
  lifetimes: {
    attached() {
      this.updateTexts();
      this.initAudio();
    },
    detached() {
      if (this.data.audio) this.data.audio.destroy();
    }
  },
  methods: {
    updateTexts() {
      this.setData({ texts: { switchToSing: t('mediaDetail.switchToSing'), switchToVideo: t('mediaDetail.switchToVideo') } });
    },
    initAudio() {
      const src = this.data.media && this.data.media.audio ? this.data.media.audio : '';
      const audio = wx.createInnerAudioContext();
      audio.src = src;
      audio.onTimeUpdate(() => {
        const duration = audio.duration || 0;
        const progress = duration > 0 ? (audio.currentTime / duration) * 100 : 0;
        this.setData({ progress, duration });
      });
      audio.onPlay(() => this.setData({ isPlaying: true }));
      audio.onPause(() => this.setData({ isPlaying: false }));
      audio.onEnded(() => this.setData({ isPlaying: false, progress: 0 }));
      this.setData({ audio });
    },
    switchMode() {
      const mode = this.data.mode === 'video' ? 'audio' : 'video';
      if (mode === 'audio' && this.data.audio) this.data.audio.stop();
      this.setData({ mode });
    },
    togglePlay() {
      if (!this.data.audio) return;
      this.data.isPlaying ? this.data.audio.pause() : this.data.audio.play();
    },
    onProgressChange(e) {
      const value = e.detail.value;
      const time = (value / 100) * (this.data.duration || 0);
      if (this.data.audio && !isNaN(time)) this.data.audio.seek(time);
    }
  }
});


