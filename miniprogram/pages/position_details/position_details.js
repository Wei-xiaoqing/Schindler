// pages/position_details/position_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    _pid: null,
    collected: false,
    _postsCollected: {},
    position_name: '招聘服务员',
    position_info_list: [
      '男女不限', '随时上任', 'lueluelu'
    ],
    position_intro_list: [
      {
        topic: '工作内容',
        content: '全天'
      },
      {
        topic: '工作内容',
        content: '全天'
      },
      {
        topic: '工作内容',
        content: '全天'
      },
      {
        topic: '工作内容',
        content: '全天'
      }
    ],
    describe_list: [
      {
        topic: '职位要求',
        content: '啊安妮你难道你你你你你你你你你你你你你水水水水水水水水'
      },
      {
        topic: '工作时间',
        content: '周一到周五'
      },
      {
        topic: '福利待遇',
        content: '啊安妮你难道你你你你你你你你你你你你你水水水水水水水水'
      },
      {
        topic: '薪资待遇',
        content: '3000/月'
      }
    ],
    recommended: [
      {
        recommended_title: '招聘在线客服',
        recommended_price: '3000-5000元/月',
        requirements1: '全职',
        requirements2: '高中学历',
        requirements3: '全勤',
        imgSrc: '../../images/1.png',
        name: '胡歌',
        time: '10分钟前',
        address: '天津市西青区'
      },
      {
        recommended_title: '招聘配音',
        recommended_price: '3000-5000元/月',
        requirements1: '全职',
        requirements2: '高中学历',
        requirements3: '全勤',
        imgSrc: '../../images/1.png',
        name: '胡歌',
        time: '10分钟前',
        address: '天津市西青区'
      },
      {
        recommended_title: '招聘打字员',
        recommended_price: '3000-5000元/月',
        requirements1: '全职',
        requirements2: '高中学历',
        requirements3: '全勤',
        imgSrc: '../../images/1.png',
        name: 'jaehyun',
        time: '10分钟前',
        address: '天津市西青区'
      },
    ]

  },
  // 点击商品收藏图标
  async handleCollect() {
    const result = await wx.showModal({
      title: this.data.collected ? '取消收藏' : '是否收藏',
      cancelColor: 'cancelColor',
    });
    if (result.confirm) {
      const postsCollected = this.data._postsCollected
      postsCollected[this.data._pid] = !this.data.collected
      wx.setStorageSync('posts_conllected', postsCollected);
      this.setData({
        collected: !this.data.collected
      })
    }


  },
  async handleShare() {
    const result = await wx.showActionSheet({
      itemList: ['分享给好友', '分享到朋友圈'],

    })
    console.log(result);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._pid = options.pid

    const postsCollected = wx.getStorageSync('posts_conllected')
    this.data.postsCollected = postsCollected
    let collected = postsCollected[this.data._pid]
    console.log(collected);
    if (collected == undefined) {
      collected = false
    }
    console.log(collected);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})