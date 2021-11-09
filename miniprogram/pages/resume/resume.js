// miniprogram/pages/email.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(option){
    //onLoad生命周期函数，在一个页面中只会加载一次
    //在onLoad声明周期函数中，option为页面跳转所带来的参数
    console.log(option);
    var postId = option.id;
    var postData = postsData.postList[postId];
    //console.log(postData);

    //this.setData做数据绑定
    //目前不能使用this.data
    this.setData(
        {
            postData:postData
        }
    )
    //console.log(postData);
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