// pages/detail/detail.js




Page({
  data: {
    talks: [],
    touchStart: 0,
    inputValue: '',
    inputBiaoqing: '',
    faces: ['/images/Raph.jpg', '/images/Mikey.jpg', '/images/Don.jpg','/images/Leo.jpg'],
    names: ['Raph', 'Mikey', 'Don', 'Leo'],
    isShow: false, //控制emoji表情是否显示 
    isLoad: true, //解决初试加载时emoji动画执行一次
    cfBg: false,
    emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
     "60a", "60b", "60c", "60d", "60f",
     "61b", "61d", "61e", "61f",
     "62a", "62c", "62e",
     "602", "603", "605", "606", "608",
     "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
     "63a", "63b", "63c", "63d", "63e", "63f",
     "64a", "64b", "64f", "681",
     "68a", "68b", "68c",
     "344", "345", "346", "347", "348", "349", "351", "352", "353",
     "414", "415", "416",
     "466", "467", "468", "469", "470", "471", "472", "473",
     "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [], //qq、微信原始表情
    alipayEmoji: [], //支付宝表情
    },

  // 首次加载
  onLoad(opt) {
    var content = [{
      title:"面试被问离职原因，千万别乱说",
      time:"2021-6-14",
      source: "“虽说年关将至，相比不少朋友都在盘算着在拿到年终奖之后迎接新的变化，那就是跳槽。可跳槽简单，找带心仪的工作难。投递简历，面试处处都有学问。尤其是在面试的过程中必然会问到有关商家公司的问题，稍有不慎回答错误就有可能会影响这次的面试结果。那么今天村主任就要来给大家讲解一下，在面试回答离职理由时应该如何给出更优化的离职理由。好好吸收一下，这里可藏着大学问呢!",
      readCount:"2442"
      
    }]
    this.setData({
      articleInfo:content
    })
    var em = {},
    that = this,
    emChar = that.data.emojiChar.split("-");
   var emojis = []
   that.data.emoji.forEach(function(v, i) {
    em = {
    char: emChar[i],
    emoji: "0x1f" + v
    };
    emojis.push(em)
   });
   that.setData({
    emojis: emojis
   })
  },
  emojiScroll: function(e) {
    console.log(e)
    },
    //点击表情显示隐藏表情盒子
    emojiShowHide: function() {
    this.setData({
     isShow: !this.data.isShow,
     isLoad: false,
     cfBg: !this.data.false
    })
    },
    //表情选择
    emojiChoose: function(e) {
    console.log(e)
    //当前输入内容和表情合并
    // let value = e.currentTarget.dataset.emoji;
    this.data.inputBiaoqing += e.currentTarget.dataset.emoji;
    console.log(this.data.inputBiaoqing)
    this.setData({
     inputValue: this.data.inputBiaoqing
    })
    },
    //点击emoji背景遮罩隐藏emoji盒子
    cemojiCfBg: function() {
    console.log('womenlai')
    this.setData({
     isShow: false,
     cfBg: false
    })
    },
    onReady: function() {
    // 评论弹出层动画创建
    this.animation = wx.createAnimation({
     duration: 400, // 整个动画过程花费的时间，单位为毫秒
     timingFunction: "ease", // 动画的类型
     delay: 0 // 动画延迟参数
    })
    },
    showTalks: function() {
    // 加载数据
    this.loadTalks();
    // 设置动画内容为：使用绝对定位显示区域，高度变为100%
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
     talksAnimationData: this.animation.export()
    })
    },
    
    hideTalks: function() {
    // 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
     talks: [],
     talksAnimationData: this.animation.export()
    })
    },
    
    // 加载数据
    loadTalks: function() {
    // 随机产生一些评论
    wx.showNavigationBarLoading();
    let that = this;
    let talks = [];
    let faces = ['/images/Raph.jpg','/images/Mikey.jpg','/images/Don.jpg','/images/Leo.jpg',
    ];
    let names = ['Raph', 'Mikey', 'Don', 'Leo', 'Splinter', 'April'];
    let contents = ['为什么你总是对我不理不睬呢', '干嘛老是不见你了', '我们都有字节的梦想', '你有什么资格不努力呢'];
    let talktime = '刚刚';
    console.log(talktime)
    talks = talks.concat(that.data.talks);
    
    // 随机产生10条评论
    for (var i = 0; i < 10; i++) {
     talks.push({
     avatarUrl: faces[Math.floor(Math.random() * faces.length)],
     nickName: names[Math.floor(Math.random() * names.length)],
     content: contents[Math.floor(Math.random() * contents.length)],
     talkTime: talktime
     });
    }
    this.setData({
     talks: talks,
     talksAnimationData: that.animation.export()
    })
    wx.hideNavigationBarLoading();
    },
    
    onScrollLoad: function() {
    // 加载新的数据
    this.loadTalks();
    },
    //下拉评论框隐藏
    touchStart: function(e) {
    let touchStart = e.touches[0].clientY;
    this.setData({
     touchStart,
    })
    },
    touchMove: function(e) {
    // console.log(this.data.touchStart)
    let touchLength = e.touches[0].clientY - this.data.touchStart;
    console.log(touchLength - 100)
    if (touchLength > 100) {
     this.animation.bottom("-100%").height("0rpx").step()
     this.setData({
     talks: [],
     talksAnimationData: this.animation.export(),
     })
    }
    },
    //输入框失去焦点时触发
    bindInputBlur: function(e) {
    console.log(e)
    console.log(this.data.inputBiaoqing)
    this.data.inputValue = e.detail.value + this.data.inputBiaoqing;
    },
    //点击发布，发布评论
    faBu: function() {
    let that = this;
    this.data.talks.unshift({
     avatarUrl: this.data.faces[Math.floor(Math.random() * this.data.faces.length)],
     nickName: this.data.names[Math.floor(Math.random() * this.data.names.length)],
     content: this.data.inputValue,
     talkTime: '刚刚'
    })
    that.data.inputValue = '';
    that.setData({
     talks: that.data.talks,
     inputValue: that.data.inputValue,
     talksAnimationData: that.animation.export()
    })
    
    },
  

  // 下拉刷新
  onPullDownRefresh() {
    console.log("refresh executed!")

    this.getArticle(() => {
      wx.stopPullDownRefresh()
    })
  },

})