const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    bgImg: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    Num:[
      {
        detail:'0',
        doc:'收藏'
      },
      {
        detail:'34',
        doc:'关注'
      },
      {
        detail:'1',
        doc:'应聘'
      },
      {
        detail:'3',
        doc:'谁看过我'
      },
    
    ],
    list:[
      {
        img:'../../icon/resume.png',
        doc:'简历优化'
      },
      {
        img:'../../icon/resume-02.png',
        doc:'简历代投'
      },
      {
        img:'../../icon/help.png',
        doc:'面试辅导'
      },
      {
        img:'../../icon/guide.png',
        doc:'职业规划'
      }
    ],
    body:[
      {
        img:'../../images/消息(1).png',
        doc:'求职状态',
        doc2:'在校，看看机会',
        pic:'../../images/into.png'
      },
      {
        img:'../../images/消息(1).png',
        doc:'求职隐私',
        pic:'../../images/into.png'
      }
    
    ],
    bottom:[
      {
        img:'../../images/消息(1).png',
        doc:'我要招人',
        doc2:'主动出击，精准匹配',
        pic:'../../images/into.png'
      },
      {
        img:'../../images/消息(1).png',
        doc:'求职必答',
        pic:'../../images/into.png'
      },
      {
        img:'../../images/消息(1).png',
        doc:'人才测评',
        pic:'../../images/into.png'
      }
    ]
    
  },
  // 选择背景图
  chooseImg() {
    var fileID;
    wx.chooseImage({
      count: 1,  // 选择的照片数，只能一张
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: (res) => {
        wx.showLoading({
          title: '加载中',
        })
        let tempFilePath = res.tempFilePaths[0] // 返回的临时路径是一个数组
        let suffix = /\.\w+$/.exec(tempFilePath)[0]  // 获取图片拓展名
        wx.cloud.uploadFile({
          cloudPath: 'bgImg/' + Date.now() + '-' + Math.random() + suffix,
          filePath: tempFilePath,
          success: (res) => {
            fileID = res.fileID  // 拿到存储在云存储的图片id
            this.setDbImg(fileID)
          }
        })
      }
    })
  },
  setDbImg(fileID) {  // 存储数据库
    db.collection('bgImg').get().then((res) => {
      let data = res.data
      if(data.length === 0) {  // 如果是第一次存直接添加
        db.collection('bgImg').add({
          data: {
            bgImg: fileID
          }
        }).then((res) => {
          this.getDbImg()
        })
      } else {  // 如果是第二次存就替换
        let id = data[0]._id
        db.collection('bgImg').doc(id).update({
          data: {
            bgImg: fileID
          }
        }).then((res) => {
          this.getDbImg()
        })
      }
    })
  },
  getDbImg() {  // 从数据库获取图片
    db.collection('bgImg').get().then((res) => {
      let data = res.data
      if(data.length > 0) {
        this.setData({
          bgImg: data[0].bgImg
        })
        wx.hideLoading()
      }
    })
  },
  updateImg() {  // 更换背景图
    wx.showModal({
      title: '提示',
      content: '更换背景图?',
      confirmColor: '#6595e9',
      success: (res) => {
        if (res.confirm) {
          this.chooseImg()
        }
        if (res.cancel) {
          return
        }
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.cloud.database().collection('comm').get()
    .then(res => {
      console.log("列表请求成功",res)
      this.setData({     
        common: res.data
      })

    })
    .catch(red =>{
      console.log("列表请求失败",res)
    })
    wx.cloud.database().collection('other').get()
    .then(res => {
      this.setData({
        other: res.data
      })

    })
    .catch(red =>{
      console.log("列表请求失败",res)
    })
    this.getDbImg()
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
    
  },
  login() {
    wx.getUserProfile({
      desc: '必须授权才可以使用',
      success: res => {
        let user = res.userInfo
        console.log(user)
        this.setData({
          userInfo: user
        })
      },
      fail:res =>{
        console.log('授权失败',res)
      }
    })
  },
  loginOut() {
    this.setData({
      userInfo:''
    })
  }
})