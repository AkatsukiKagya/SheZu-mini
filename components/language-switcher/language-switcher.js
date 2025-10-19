// 语言切换组件
const { t, getCurrentLanguage, switchLanguage } = require('../../utils/i18n');

Component({
  properties: {
    // 组件位置：'top-right', 'top-left', 'bottom-right', 'bottom-left'
    position: {
      type: String,
      value: 'top-right'
    },
    // 是否显示语言名称
    showText: {
      type: Boolean,
      value: true
    }
  },

  data: {
    currentLang: 'zh-CN',
    isOpen: false
  },

  lifetimes: {
    attached() {
      this.updateLanguage();
    }
  },

  methods: {
    // 更新语言显示
    updateLanguage() {
      this.setData({
        currentLang: getCurrentLanguage()
      });
    },

    // 切换语言
    onSwitchLanguage() {
      // 获取全局app实例
      const app = getApp();
      
      // 使用全局语言切换方法
      const newLang = app.switchLanguage();
      
      this.setData({
        currentLang: newLang,
        isOpen: false
      });
      
      // 触发语言切换事件
      this.triggerEvent('languageChanged', {
        language: newLang
      });
      
      // 显示切换成功提示
      wx.showToast({
        title: newLang === 'zh-CN' ? '已切换到中文' : 'Switched to English',
        icon: 'success',
        duration: 1500
      });
    },

    // 切换下拉菜单
    toggleDropdown() {
      this.setData({
        isOpen: !this.data.isOpen
      });
    },

    // 点击外部关闭下拉菜单
    onMaskTap() {
      this.setData({
        isOpen: false
      });
    }
  }
});


