const { t, getCurrentLanguage } = require('../../utils/i18n');

Page({
  data: {
    images: [
      '/assets/images/111.png',
      '/assets/images/11.png',
      '/assets/images/logo.jpg'
    ],
    nextLine: '\n',
    prevImage: '\u2039',
    nextImage: '\u203A',
    currentIndex: 0,
    autoPlayTimer: null,
    // 多语言文本
    texts: {}
  },

  onLoad() {
    // 初始化多语言文本
    this.updateTexts();
    // 页面加载完成后启动自动轮播
    this.startAutoPlay();
    
    // 监听全局语言切换事件
    this.setupLanguageListener();
  },

  onShow() {
    // 页面显示时重新启动自动轮播
    this.startAutoPlay();
    // 更新多语言文本（防止语言切换后文本未更新）
    this.updateTexts();
  },

  onUnload() {
    // 页面卸载时清除定时器
    this.stopAutoPlay();
  },

  onHide() {
    // 页面隐藏时停止自动轮播
    this.stopAutoPlay();
  },

  // 下一张图片
  nextImage() {
    let idx = this.data.currentIndex + 1;
    if (idx >= this.data.images.length) idx = 0;
    this.setData({ currentIndex: idx });
    // 重新启动自动轮播
    this.restartAutoPlay();
  },

  // 上一张图片
  prevImage() {
    let idx = this.data.currentIndex - 1;
    if (idx < 0) idx = this.data.images.length - 1;
    this.setData({ currentIndex: idx });
    // 重新启动自动轮播
    this.restartAutoPlay();
  },

  // 点击指示器跳转到指定图片
  goToImage(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentIndex: index });
    // 重新启动自动轮播
    this.restartAutoPlay();
  },

  // 启动自动轮播
  startAutoPlay() {
    this.stopAutoPlay(); // 先清除之前的定时器
    this.autoPlayTimer = setInterval(() => {
      this.nextImage();
    }, 4000); // 每4秒切换一次
  },

  // 停止自动轮播
  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  },

  // 重新启动自动轮播
  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  },

  // 更新多语言文本
  updateTexts() {
    this.setData({
      texts: {
        bannerTitle: t('index.bannerTitle'),
        bannerDesc: t('index.bannerDesc'),
        welcomeTitle: t('index.welcomeTitle'),
        welcomeText1: t('index.welcomeText1'),
        welcomeText2: t('index.welcomeText2'),
        projectTitle: t('index.projectTitle'),
        projectText1: t('index.projectText1'),
        projectText2: t('index.projectText2'),
        learnMore: t('index.learnMore'),
        artFormsTitle: t('index.artFormsTitle'),
        laborSong: t('index.laborSong'),
        laborSongDesc: t('index.laborSongDesc'),
        mountainSong: t('index.mountainSong'),
        mountainSongDesc: t('index.mountainSongDesc'),
        ritualSong: t('index.ritualSong'),
        ritualSongDesc: t('index.ritualSongDesc'),
        narrativeSong: t('index.narrativeSong'),
        narrativeSongDesc: t('index.narrativeSongDesc'),
        artWorksTitle: t('index.artWorksTitle'),
        gaohuang: t('index.gaohuang'),
        dayan: t('index.dayan'),
        songlang: t('index.songlang'),
        jizu: t('index.jizu'),
        caicha: t('index.caicha'),
        qianxi: t('index.qianxi'),
        copyright: t('index.copyright')
      }
    });
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

  // 语言切换事件处理（兼容旧版本）
  onLanguageChanged(e) {
    this.updateTexts();
  }
})
