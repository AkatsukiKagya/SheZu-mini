const { t, getCurrentLanguage } = require('../../utils/i18n');
const { getMediaById } = require('../../utils/media');

Page({
  data: {
    media: {},
    mode: 'video', // 默认显示视频模式
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    audioContext: null,
    texts: {}
  },

  onLoad(options) {
    console.log('媒体详情页面加载，参数:', options);
    const id = Number(options.id);
    console.log('解析的ID:', id);
    const media = getMediaById(id);
    console.log('找到的媒体:', media);
    
    if (media) {
      this.setData({ media });
      console.log('媒体详情页面初始化成功');
    } else {
      console.error('未找到对应的媒体项目，ID:', id);
      wx.showToast({
        title: '媒体不存在',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
    
    this.updateTexts();
    this.setupLanguageListener();
  },

  onShow() {
    this.updateTexts();
  },

  onUnload() {
  },

  // 播放器由组件负责

  // 设置语言切换监听器
  setupLanguageListener() {
    try {
      console.log('设置语言切换监听器');
      wx.eventBus = wx.eventBus || {
        listeners: {},
        on: function(event, callback) {
          if (!this.listeners[event]) {
            this.listeners[event] = [];
          }
          this.listeners[event].push(callback);
        },
        emit: function(event, data) {
          if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
          }
        }
      };
      
      wx.eventBus.on('languageChanged', (data) => {
        console.log('语言切换事件触发');
        this.updateTexts();
      });
      console.log('语言切换监听器设置成功');
    } catch (error) {
      console.error('设置语言切换监听器失败:', error);
    }
  },

  // 更新多语言文本
  updateTexts() {
    try {
      console.log('更新多语言文本');
      this.setData({
        texts: {
          back: t('mediaDetail.back'),
          switchToSing: t('mediaDetail.switchToSing'),
          switchToVideo: t('mediaDetail.switchToVideo')
        }
      });
      console.log('多语言文本更新成功');
    } catch (error) {
      console.error('更新多语言文本失败:', error);
    }
  },

  // 切换模式
  switchMode() {
    const newMode = this.data.mode === 'video' ? 'audio' : 'video';
    this.setData({ mode: newMode });
    
    // 如果切换到音频模式，停止视频播放
    if (newMode === 'audio' && this.data.audioContext) {
      this.data.audioContext.stop();
      this.setData({ isPlaying: false, currentTime: 0 });
    }
  },

  // 播放/暂停音频
  toggleAudioPlay() {
    if (!this.data.audioContext) return;
    
    if (this.data.isPlaying) {
      this.data.audioContext.pause();
    } else {
      this.data.audioContext.play();
    }
  },

  // 拖动进度条
  onProgressChange(e) {
    const progress = e.detail.value;
    const time = (progress / 100) * this.data.duration;
    
    if (this.data.audioContext) {
      this.data.audioContext.seek(time);
    }
  },

  // 返回
  goBack() {
    wx.navigateBack();
  },

  // 语言切换事件处理
  onLanguageChanged(e) {
    this.updateTexts();
  }
});
