// pages/test-page/test-page.js
const { t, getCurrentLanguage } = require('../../utils/i18n');

Page({
  data: {
    videoSrc: 'https://cdn.jsdelivr.net/gh/AkatsukiKagya/Aka-media/media/shezu/videos/caicha.mp4',
    autoplay: false,
    showReplay: false,
    // 多语言文本
    texts: {}
  },

  onLoad() {
    // 初始化多语言文本
    this.updateTexts();
    // 监听全局语言切换事件
    this.setupLanguageListener();
  },

  onShow() {
    // 更新多语言文本（防止语言切换后文本未更新）
    this.updateTexts();
  },

  // 设置语言切换监听器
  setupLanguageListener() {
    // 初始化事件总线
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
    
    // 监听语言切换事件
    wx.eventBus.on('languageChanged', (data) => {
      this.updateTexts();
    });
  },

  // 更新多语言文本
  updateTexts() {
    this.setData({
      texts: {
        title: t('test.title'),
        goHome: t('test.goHome'),
        replay: t('test.replay')
      }
    });
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
  },
  
  goHome() {
    wx.navigateTo({
      url: '/pages/home/home'
    });
  },

  // 语言切换事件处理
  onLanguageChanged(e) {
    this.updateTexts();
  }
});

