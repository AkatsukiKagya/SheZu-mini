// pages/SheZu/SheZu.js
const { t, getCurrentLanguage } = require('../../utils/i18n');

Page({
  data: {
    // 多语言文本
    texts: {}
  },

  onLoad() {
    console.log("畲族文化页面加载完成");
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
        title: t('shezu.title'),
        backHome: t('shezu.backHome'),
        intro: {
          title: t('shezu.intro.title'),
          text1: t('shezu.intro.text1'),
          text2: t('shezu.intro.text2')
        },
        history: {
          title: t('shezu.history.title'),
          text1: t('shezu.history.text1'),
          text2: t('shezu.history.text2')
        },
        clothing: {
          title: t('shezu.clothing.title'),
          text1: t('shezu.clothing.text1'),
          text2: t('shezu.clothing.text2')
        },
        festival: {
          title: t('shezu.festival.title'),
          text1: t('shezu.festival.text1'),
          text2: t('shezu.festival.text2')
        },
        language: {
          title: t('shezu.language.title'),
          text1: t('shezu.language.text1'),
          text2: t('shezu.language.text2')
        },
        architecture: {
          title: t('shezu.architecture.title'),
          text1: t('shezu.architecture.text1'),
          text2: t('shezu.architecture.text2')
        },
        food: {
          title: t('shezu.food.title'),
          text1: t('shezu.food.text1'),
          text2: t('shezu.food.text2')
        },
        heritage: {
          title: t('shezu.heritage.title'),
          text1: t('shezu.heritage.text1'),
          text2: t('shezu.heritage.text2')
        }
      }
    });
  },

  // 语言切换事件处理
  onLanguageChanged(e) {
    this.updateTexts();
  }
})
