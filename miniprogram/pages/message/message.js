// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur:0,
    couter:0,
    tabs:[{
      name:"私信",
      id:0
    },
    {
      name:"系统通知",
      id:1
    },
  ],
    teachersList: [{
      photo:"../../images/樱.jpg",
      name:"樱",
      sex:"4月9日",
      recomend:"明天就可以的"
  },{
    photo:"../../images/远坂凛.jpg",
    name:"远坂凛",
    sex:"3月21日",
    recomend:"哈？"
  },{
    photo:"../../images/saber.jpg",
    name:"saber",
    sex:"3月9日",
    recomend:"你好"
  }
    
  ], // list 新闻列表
  },
  tabSelect:function(e){
    this.setData({
    tabCur:e.currentTarget.dataset.id,
    scrollleft:(e.currentTarget.dataset.id - 2) * 200
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var content = [{
        table: "私信"
      },
      {
        table: "系统通知"
      }
    ]
    this.setData({
      message: content
    }) //设置数据
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