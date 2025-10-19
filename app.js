// app.js
const { t, getCurrentLanguage, setLanguage } = require('./utils/i18n');

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 初始化语言设置
    this.initLanguage();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  onShow() {
    // 每次显示时更新导航栏标题
    this.updateNavigationBarTitle();
  },

  // 初始化语言设置
  initLanguage() {
    const savedLanguage = wx.getStorageSync('language');
    if (!savedLanguage) {
      // 如果没有保存的语言设置，根据系统语言自动选择
      const systemInfo = wx.getSystemInfoSync();
      const systemLanguage = systemInfo.language;
      const defaultLanguage = systemLanguage.startsWith('zh') ? 'zh-CN' : 'en-US';
      setLanguage(defaultLanguage);
    }
    // 初始化时设置导航栏标题和底部导航栏
    this.updateNavigationBarTitle();
    this.updateTabBarText();
  },

  // 全局数据
  globalData: {
    userInfo: null,
    language: getCurrentLanguage()
  },

  // 获取翻译文本的全局方法
  t(key) {
    return t(key);
  },

  // 切换语言
  switchLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'zh-CN' ? 'en-US' : 'zh-CN';
    setLanguage(newLang);
    this.globalData.language = newLang;
    
    // 更新导航栏标题
    this.updateNavigationBarTitle();
    
    // 更新底部导航栏文本
    this.updateTabBarText();
    
    // 通知所有页面语言已切换
    this.notifyLanguageChange(newLang);
    
    return newLang;
  },

  // 更新导航栏标题
  updateNavigationBarTitle() {
    const currentLang = getCurrentLanguage();
    const title = t('nav.title', currentLang);
    wx.setNavigationBarTitle({
      title: title
    });
  },

  // 更新底部导航栏文本
  updateTabBarText() {
    const currentLang = getCurrentLanguage();
    
    // 重新设置tabBar配置
    wx.setTabBarStyle({
      color: "#999999",
      selectedColor: "#07c160",
      backgroundColor: "#ffffff",
      borderStyle: "black"
    });
    
    // 设置tabBar项目文本
    const tabBarItems = currentLang === 'zh-CN' 
      ? [
          { index: 0, text: '首页' },
          { index: 1, text: '介绍' },
          { index: 2, text: '音视频' },
          { index: 3, text: '测试页面' }
        ]
      : [
          { index: 0, text: 'Home' },
          { index: 1, text: 'Intro' },
          { index: 2, text: 'Media' },
          { index: 3, text: 'Test' }
        ];
    
    // 逐个设置tabBar项目
    tabBarItems.forEach(item => {
      wx.setTabBarItem({
        index: item.index,
        text: item.text
      });
    });
  },

  // 通知所有页面语言已切换
  notifyLanguageChange(newLang) {
    // 获取当前页面栈
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    
    // 如果当前页面有onLanguageChange方法，则调用
    if (currentPage && typeof currentPage.onLanguageChange === 'function') {
      currentPage.onLanguageChange(newLang);
    }
    
    // 通过事件总线通知其他页面
    wx.eventBus = wx.eventBus || {};
    wx.eventBus.emit('languageChanged', { language: newLang });
  }
})
