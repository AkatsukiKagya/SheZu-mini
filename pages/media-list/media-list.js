// pages/media-list/media-list.js
const { t, getCurrentLanguage } = require('../../utils/i18n');

const { getMediaList } = require('../../utils/media');

Page({
  data: {
    mediaList: [],
    texts: {}
  },

  onLoad() {
    console.log("媒体列表页面加载完成");
    this.setData({ mediaList: getMediaList() });
    this.updateTexts();
    this.setupLanguageListener();
  },

  onShow() {
    this.updateTexts();
  },

  // 设置语言切换监听器
  setupLanguageListener() {
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
      this.updateTexts();
    });
  },

  // 更新多语言文本
  updateTexts() {
    this.setData({
      texts: {
        title: t('media.title'),
        placeholder: t('media.placeholder')
      }
    });
  },

  // 跳转到详情页面
  goDetail(e) {
    console.log('点击事件触发:', e);
    const id = e.currentTarget.dataset.id;
    console.log('获取到的ID:', id, '类型:', typeof id);
    
    if (!id) {
      console.error('ID为空或未定义');
      wx.showToast({
        title: '参数错误',
        icon: 'error'
      });
      return;
    }
    
    const url = `/pages/media-detail/media-detail?id=${id}`;
    console.log('准备跳转到:', url);
    
    wx.navigateTo({
      url: url,
      success: (res) => {
        console.log('跳转成功:', res);
      },
      fail: (err) => {
        console.error('跳转失败，错误详情:', err);
        wx.showModal({
          title: '跳转失败',
          content: `错误信息: ${JSON.stringify(err)}`,
          showCancel: false
        });
      }
    });
  },

  // 语言切换事件处理
  onLanguageChanged(e) {
    this.updateTexts();
  }
});