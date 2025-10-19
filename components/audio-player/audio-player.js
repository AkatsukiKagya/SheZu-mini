Component({
  properties: {
    src: String
  },

  data: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentTimeText: '0:00',
    durationText: '0:00',
    isDragging: false
  },

  lifetimes: {
    attached() {
      this.initAudio();
    },
    detached() {
      if (this.innerAudioContext) {
        this.innerAudioContext.destroy();
      }
    }
  },

  methods: {
    initAudio() {
      const audio = wx.createInnerAudioContext();
      this.innerAudioContext = audio;
      audio.src = this.data.src;

      audio.onCanplay(() => {
        audio.play();
        const check = setInterval(() => {
          if (audio.duration && !isNaN(audio.duration)) {
            const duration = Math.floor(audio.duration);
            this.setData({
              duration,
              durationText: this.formatTime(duration)
            });
            audio.pause();
            clearInterval(check);
          }
        }, 200);
      });

      audio.onTimeUpdate(() => {
        if (!this.data.isDragging) {
          const current = Math.floor(audio.currentTime);
          this.setData({
            currentTime: current,
            currentTimeText: this.formatTime(current)
          });
        }

        if (!this.data.duration && audio.duration) {
          const duration = Math.floor(audio.duration);
          this.setData({
            duration,
            durationText: this.formatTime(duration)
          });
        }
      });

      audio.onEnded(() => {
        this.setData({
          isPlaying: false,
          currentTime: 0,
          currentTimeText: '0:00'
        });
      });
    },

    togglePlay() {
      const audio = this.innerAudioContext;
      if (this.data.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.setData({ isPlaying: !this.data.isPlaying });
    },

    onSliderChanging(e) {
      this.setData({ isDragging: true, currentTime: e.detail.value });
    },

    onSliderChange(e) {
      const newTime = e.detail.value;
      this.innerAudioContext.seek(newTime);
      this.setData({
        isDragging: false,
        currentTime: newTime,
        currentTimeText: this.formatTime(newTime)
      });
    },

    formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' + s : s}`;
    }
  }
});
