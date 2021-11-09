// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur:0,
    couter:0,
    cards: [], // 卡片数据，一个包含所有卡片对象的数组
    removed_cards: [],// 存放已经移除的卡片的索引数据，如果索引填充了其他卡片，需要将该索引移出
    transition: true,//是否开启过渡动画
    circling: false, // 是否列表循环
    rotate_deg: 7,// 整个滑动过程旋转角度
    slide_duration: 200,// 手指离开屏幕后滑出界面时长，单位(ms)毫秒
    show_cards: 3,// 显示几张卡片
    thershold: 60,// 松手后滑出界面阈值，单位px
    scale_ratio: 0.07,// 下层卡片收缩力度
    up_height: 40,// 下层卡片下移高度，单位rpx
    left: false,
    right: false,
    activeIndex: 0,
    jobs:[],
    tabs:[{
      name:"推荐",
      id:0
    },
    {
      name:"说说",
      id:1
    },
    {
      name:"知识点",
      id:2
    },
    {
      name:"交流问答",
      id:3
    },
    {
      name:"社区",
      id:4
    }
  ],
  tuijiantop:[
    {
      id:0,
      img:"../../images/have/公司啊.png",
      name:"公司"
    },
    {
      id:1,
      img:"../../images/have/学生圈.png",
      name:"学生圈"
    },
    {
      id:2,
      img:"../../images/have/今日热点.png",
      name:"今日热榜"
    },
    {
      id:3,
      img:"../../images/have/入行指南.png",
      name:"入行指南"
    },
    {
      id:4,
      img:"../../images/have/职测.png",
      name:"职测"
    },
    {
      id:5,
      img:"../../images/have/职场.png",
      name:"职场"
    }
  ],
  tuijianmiddle:[
    {
      id:0,
      img:"../../images/have/人事女.png",
      name:"李小姐",
      position:"HR.公司",
      text:"应届毕业生没有工作经历，简历应该怎么写？ 90%的应届生都是零经验，并不代表就写不好建立，拿不到好的offer"
    },
    {
      id:1,
      img:"../../images/have/人事男.png",
      name:"王先生",
      position:"HR.公司",
      text:`疫情影响之下，公众对于移动互联网服务的依赖程度进一步加深，海量个人信息被收集、存储和使用，数据泄露和个人隐私保护问题变得更加严峻，用户信息安全成为热点议题。`
    },
    {
      id:2,
      img:"../../images/have/人事男.png",
      name:"刘先生",
      position:"HR.公司",
      text:`中国式回答很微妙：
      凡是有“您回家等通知吧！”就说明你被淘汰了！
      如果有说：“我们主管副总周五回来，您到时候再来一下”说明人事这关过了。`
    },
    {
      id:3,
      img:"../../images/have/人事女.png",
      name:"路女士",
      position:"HR.公司",
      text:`尽量不要裸辞。骑驴找马一般是更好的选择。相对于骑驴找马，裸辞的优点是：能够密集地进行面试，尤其是到外地面试。`
    }
  ],
  haowen:[
    {
      id:0,
      title:"面试被问离职原因，千万别乱说",
      zuozhe:"ZoeYz",
      text:"找工作时，第一印象很重要，所以回答问题不能不过脑子。",
      src:"../../images/have/textone.png",
      read:84616,
      pinglun:76,
      shoucang:694
    },
    {
      id:1,
      title:"一段代码带你论证JS基础",
      zuozhe:"前端人",
      text:"在写业务代码的时候，要尽量去避免声明变量命名冲突的情况。",
      src:"../../images/have/texttwo.png",
      read:235,
      pinglun:7,
      shoucang:6
    },
    {
      id:2,
      title:"网络设备传输文件的3种方法",
      zuozhe:"网络工程师笔记",
      text:"使用put命令将文件上传到FTPServer(pc),或使用get命令。",
      src:"../../images/have/textthree.png",
      read:84616,
      pinglun:76,
      shoucang:694
    },
    {
      id:3,
      title:"20道Vue常见面试题,你会几道?(含答案)",
      zuozhe:"陈大鱼头",
      text:"尽量减少data中的数据，data中的数据都会增加getter和srtter",
      src:"../../images/have/textone.png",
      read:55353,
      pinglun:85,
      shoucang:4680
    }
  ],
  wait:[
    {
      id:1,
      title:"web前端的就职基础要求？",
      img:"../../images/have/3.jpg",
      name:"王贵峰",
      zhiwei:"会计 · 5年",
      number:"已经有了19人回答",
      btn:"写回答"
    },
    {
      id:2,
      title:"css（层叠样式表）的工作原理是什么？",
      img:"../../images/have/4.jpg",
      name:"庄华阳",
      zhiwei:"高级管理职位 · 6年",
      number:"已经有了16人回答",
      btn:"写回答"
    },
    {
      id:3,
      title:"Js中,typeof返回的数据类型有哪儿些？",
      img:"../../images/have/5.jpg",
      name:"王新成",
      zhiwei:"前端开发 · 1年",
      number:"已经有了19人回答",
      btn:"写回答"
    },
    {
      id:4,
      title:"Js中,数组里面的相同的元素如何去重？",
      img:"../../images/have/1.jpg",
      name:"林小迪",
      zhiwei:"web前端 · 9年",
      number:"已经有了16人回答",
      btn:"写回答"
    }
  ]
  },
  haveHd(e){
    // console.log(e.currentTarget.dataset)
    let title = e.currentTarget.dataset.title
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../have_hd/have_hd?title='+title+"&id="+id,
    })
  },
  tabSelect:function(e){
      this.setData({
      tabCur:e.currentTarget.dataset.id,
      scrollleft:(e.currentTarget.dataset.id - 2) * 200
    })
  },
  add:function(){
    this.setData({
      couter:this.data.couter + 1
    })
  },
  logBtn:function(e){
    // console.log(e)
    var userId = e.currentTarget.dataset.id
    // console.log(userId)
    if(userId == 0){
      wx.navigateTo({
      url: '../have_news/have_news?userId=' + userId
    })
    }else if(userId == 1){
      wx.navigateTo({
        url: '../have_students/have_students?userId=' + userId
      })
    }
  },
  waitBtn:function(e){
    // console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.setStorageSync("id",id)
    wx.navigateTo({
      url: '../have_wait/have_wait?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    wx.cloud.database().collection('talk').get()
    .then(res => {
      console.log("说说请求成功", res)
      this.setData({
        talk: res.data
      })

    })
    .catch(red => {
      console.log("说说请求失败", res)
    }),
    this.generateCards(7)
  },
  async generateCards(num) {
    this.setData({
           jobs: await wx.cloud.database().collection('job').get()
        })
    const cards = []
      console.log(this.data.jobs.data)
    for (let i = 0; i < num; i++) {
      cards.push({
        title: this.data.jobs.data[i].name,
        src: this.data.jobs.data[i].picture,
        desc:this.data.jobs.data[i].price+"元/小时",
      })
    }
    this.setData({
      cards: cards,
      current_cursor: cards.findIndex(item => item),
      removed_cards: []
    })
  },
  onSwitch: function (e) {
    const { symbol } = e.currentTarget.dataset
    switch (symbol) {
      case 'loop':
        this.setData({
          circling: e.detail.value
        })
        break
      case 'transition':
        this.setData({
          transition: e.detail.value
        })
        break
    }
  },
  onSlide: function (e) {
    const { symbol } = e.currentTarget.dataset
    switch (symbol) {
      case 'show_cards':
      case 'rotate_deg':
      case 'slide_duration':
        this.setData({
          [symbol]: e.detail.value
        })
        break
    }
  },
  cardOperate(e) {
    const { symbol } = e.currentTarget.dataset
    const { cards } = this.data
    switch (symbol) {
      case 'add':
        this.setData({
          [`cards[${cards.length}]`]: {
            title: `新增卡片${cards.length + 1}`,
            src: `https://source.unsplash.com/collection/190727/600x600?id=${cards.length + 1}`,
            desc: `这是一段新增卡片${cards.length + 1}的描述。`
          }
        })
        break
      case 'reset':
        this.setData({
          cards: null
        }, () => {
          this.generateCards(5)
        })
        break
      case 'remove':
        const { removeIndex } = e.currentTarget.dataset
        const { removed_cards } = this.data
        if (removed_cards.includes(parseInt(removeIndex))) return
        removed_cards.push(parseInt(removeIndex))
        this.setData({
          [`cards[${removeIndex}]`]: null,
          removed_cards
        })
        break
    }
  },
  cardSwipe(e) {
    const { direction, swiped_card_index, current_cursor } = e.detail
    console.log(e.detail)
    var index = e.detail.current;
    if(index > this.data.activeIndex) {
      this.setData({
        left: true
      })
    } else if(index < this.data.activeIndex) {
      this.setData({
        right: true
      })
    }
    setTimeout(() => {
      this.setData({
        activeIndex: index,
        left:false,
        right:false
      })
    }, 1000);
    wx.showToast({
      title: `${direction === 'left' ? '删除' : '收藏'}`,
      icon: 'none',
      duration: 1000
    })
    this.setData({
      current_cursor
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