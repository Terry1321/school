// pages/helloworld.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取授权需要的信息
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // userInfo: {},
    // hasUserInfo: false,
    //window
    imageWidth: 0,
    //swiper
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 300,
    swiperCurrent: 1,//home子页号
    //message
    closeMessageComment: '',
    showMessageComment: -1,
    //footer
    // current: 'homepage',
    current: 'homepage',
    //首页
    _this: 1,//home导航号
    _plane_miss: 1,
    //我的
    visible: false,
    popNum: 0,

    //plane
    inPlane: false,
    // planBindTouch: 'plane_miss_begin',
    animationData0: {},
    animationData1: {},
    animationData2: {},
    animationData3: {},
  },

// 获取授权
  // getUserInfo: function(e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  //home页面切换
  listenSwiper(e) {
    var that = this
    that.setData({
      _this: e.detail.current
    })
  },

  changepages: function (e) {
    this.setData({
      _this: e.target.dataset.num,
      swiperCurrent: e.target.dataset.num
    })
  },

  //message
  openComment(e) {
    var that = this
    var num = e.target.dataset.num
    this.setData({
      showMessageComment: num,
      closeMessageComment: 'closeComment'
    })
    // console.log(that.data.showMessageComment)
  },

  closeComment() {
    var that = this
    that.setData({
      showMessageComment: -1,
      closeMessageComment: ''
    })
    // console.log(that.data.showMessageComment)
  },

  messageCommentSubmit(e) {
    console.log(e);
    let that = this;
    let submitId = e.target.dataset.num;
    let content = e.detail.value.content;
    let userId = app.globalData.userId;
    if (!content){
      that.closeComment()
      return
    }else{
        //获取学生列表
      wx.request({
        url: app.globalData.httpsUrl + '/comment',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'message_id':submitId,
        'content':content,
        'user_id':userId
      },
      success: function (res) {
        console.log(res);
      }
    })   
      //结束
      that.closeComment()
    }
   
  },

  //myInfo
  toModifyMyInfo() {
    wx.navigateTo({
      url: "../myInfo/myInfo"
    });
  },

  deleteClassItem(num) {
    let that = this

    //后端代码实现 -- 删除 chatClassList
    let id = num
    let classList = that.data.classItemList
    let newClassList = []
    for (let i = 0, len = classList.length; i < len; i++) {
      if (classList[i]['classId'] != id)
        newClassList.push(classList[i])
    }
    //////////////////////////////////

    that.setData({
      classItemList: newClassList
    })
    that.handleClose()
  },

  handleOpen(e) {
    var that = this
    this.setData({
      popNum: e.target.dataset.num,
      visible: true
    });
    // console.log(that.data.popNum)
  },

  handleOk() {
    this.deleteClassItem(this.data.popNum)
  },

  handleClose() {
    this.setData({
      visible: false
    });
  },

  //footer
  handleChange({ detail }) {
    var that = this
    //plane
    if (that.data.inPlane) {
      that.plane()
    }
    //main
    that.setData({
      current: detail.key
    })
  },

  plane_miss_begin: function (e) {
    this.setData({
      _plane_miss: 2
    });
  },

  plane_miss_end: function (e) {
    this.setData({
      _plane_miss: 1
    });
  },

  //assignments
  to_assignments: function (e) {
    var that = this
    that.plane()
    wx.navigateTo({
      url: "../assignments/assignments"
    });
  },

  to_messages: function (e) {
    var that = this
    that.plane()
    wx.navigateTo({
      url: "../assignments/messages"
    });
  },

  to_notices: function (e) {
    var that = this
    that.plane()
    wx.navigateTo({
      url: "../assignments/notices"
    });
  },

  //Detail
  toWorkDetail(e) {
    wx.navigateTo({
      url: "workDetail?current=" + JSON.stringify(e.target.dataset.num)
    });
  },

  toNoticeDetail(e) {
    wx.navigateTo({
      url: "noticeDetail?current=" + JSON.stringify(e.target.dataset.num)
    });
  },

  toChatList(e) {
    wx.navigateTo({
      url: "../myInfo/chat/chatList?current=" + JSON.stringify(e.target.dataset.num)
    })
  },

  //MyInfor
  to_createClass: function (e) {
    wx.navigateTo({
      url: "../myInfo/manageClass"
    });
  },

  to_joinClass: function () {
    wx.navigateTo({
      url: "../myInfo/joinClass"
    });
  },

  to_aboutUs: function(e){
    wx.navigateTo({
      url: "../myInfo/aboutUs"
    });
  },


  plane(e) {
    var that = this
    if (!that.data.inPlane) {
      that.plane_miss_begin()
      var x = that.data.imageWidth / 750 * 220
      // var y = that.data.imageWidth / 750 * 15
      that.animation0.scale(1.1).rotate(396).step()
      that.animation1.bottom(220 / 1.5 + 'rpx').scale(1).opacity(1).rotate(0).translateX(-x / 1.5).step()
      that.animation2.bottom(220 + 'rpx').scale(1).opacity(1).rotate(0).step()
      that.animation3.bottom(220 / 1.5 + 'rpx').scale(1).opacity(1).rotate(0).translateX(x / 1.5).step()
      that.setData({
        //输出动画
        animationData0: this.animation0.export(),
        animationData1: this.animation1.export(),
        animationData2: this.animation2.export(),
        animationData3: this.animation3.export(),
        inPlane: true
      })
    }
    else {
      that.initAnimation()
      that.setData({
        inPlane: false
      })
      that.plane_miss_end()
    }
    // console.log(that.data._plane_miss)
  },

  initAnimation() {
    //0
    var animation0 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0,
    });
    this.animation0 = animation0
    animation0.scale(1).rotate(0).step()
    this.setData({
      animationData0: animation0.export()
    })
    //1
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0,
    });
    this.animation1 = animation1
    animation1.bottom(30 + 'rpx').scale(0.1).opacity(0).rotate(180).step()
    this.setData({
      animationData1: animation1.export()
    })
    //2
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0,
    });
    this.animation2 = animation2
    animation2.bottom(30 + 'rpx').scale(0.1).opacity(0).rotate(-270).step()
    this.setData({
      animationData2: animation2.export()
    })
    //3
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0,
    });
    this.animation3 = animation3
    animation3.bottom(30 + 'rpx').scale(0.1).opacity(0).rotate(-180).step()
    this.setData({
      animationData3: animation3.export()
    })
  },

  // 轮询函数    
  timer(){
    var that = this;
    setTimeout(function(){
        that.setData({
          username:app.globalData.username,
          //index summary
          workSummaryList: app.globalData.workSummaryList.reverse(),
          messageSummaryList: (app.globalData.messageSummaryList.reverse()),
          noticeSummaryList: app.globalData.noticeSummaryList.reverse(),
          classItemList: app.globalData.chatClassList,
        })
        that.timer();
    },3000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })
    that.initAnimation();
    // 使用函数
    that.timer();

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
      var that =this;
      that.setData({
        isTeacher:app.globalData.isTeacher
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





})