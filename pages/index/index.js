Page({
  data: {
    images: [
      '/assets/images/111.png',
      '/assets/images/112.png',
      '/assets/images/113.png'
    ],
    nextLine: '\n',
    prevImage: '\u2039',
    nextImage: '\u203A',
    copyrightText: '\u00A9 2025 版权所有',
    currentIndex: 0
  },

  nextImage() {
    let idx = this.data.currentIndex + 1;
    if (idx >= this.data.images.length) idx = 0;
    this.setData({ currentIndex: idx });
  },

  prevImage() {
    let idx = this.data.currentIndex - 1;
    if (idx < 0) idx = this.data.images.length - 1;
    this.setData({ currentIndex: idx });
  }
})
