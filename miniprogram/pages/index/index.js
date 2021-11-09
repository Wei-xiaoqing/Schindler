const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    latitude: '',
    longitude: ''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.cloud.database().collection('job').get()
      .then(res => {
        console.log("工作列表请求成功", res)
        this.setData({
          jobs: res.data
        })

      })
      .catch(red => {
        console.log("工作列表请求失败", res)
      }),
      wx.cloud.database().collection('banner').get()
        .then(res => {
          console.log("工作列表请求成功", res)
          this.setData({
            banner: res.data
          })

        })
        .catch(red => {
          console.log("工作列表请求失败", res)
        })
    var that = this
    
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,

        })
        var location =res.longitude+","+res.latitude
        console.log(location)
        
        wx.request({
          
          url: 'https://api.yonyoucloud.com/apis/dst/apilinkstaticgeo/regecode',
          data: {
            location: location
           },
          header:{
            apicode: "71ab3b2706104e66941642b055b8569c",
          }
          ,
          success: (res) => {
            console.log("返回成功的数据:"+ JSON.stringify(res.data.regeocode.addressComponent.province))
            that.setData({
              city: res.data.regeocode.addressComponent.province
            })
          }
        })

      }
    })

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
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log(location.city)
    this.setData({
      city: location.city
    })
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

  },
  //SNUBZ-LITWX-3WO4F-7CRK6-AJ4AV-MUFBQ
  onRouterPlan: function () {
    const key = 'SNUBZ-LITWX-3WO4F-7CRK6-AJ4AV-MUFBQ'; //使用在腾讯位置服务申请的key
    const referer = '1111111'; //调用插件的app的名称
    const category = '生活服务,娱乐休闲';

    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&category=${category}`
    });
  }
})