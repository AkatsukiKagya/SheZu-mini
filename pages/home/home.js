const { t, getCurrentLanguage } = require('../../utils/i18n');

Page({
  data: {
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
        home: t('common.home'),
        introduction: t('common.introduction'),
        media: t('common.media'),
        test: t('common.test')
      }
    });
  },

  // 跳转到民歌视频专区
  goToVideos() {
    wx.navigateTo({
      url: '/pages/media-list/media-list'
    });
  },

  // 跳转到畲族文化介绍页
  goToCulture() {
    wx.navigateTo({
      url: '/pages/SheZu/SheZu'
    });
  },

  // 语言切换事件处理
  onLanguageChanged(e) {
    this.updateTexts();
  }
});
