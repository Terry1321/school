// pages/index/noticeDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    noticeSummaryList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    //get noticeId
    let data = JSON.parse(options.current)
    let num = data.num
    let name = data.name
    var userId=app.globalData.userId;
    // 访问api获取数据
    wx.request({
      url: app.globalData.httpsUrl + '/notice/detail',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'user_id':userId,
        'group_id':num
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          noticeSummaryList:res.data
        })
      }
    })
    //set title
    that.setData({
      // noticeSummary: noticeSummaryList[i][0],
      scrollTop: 1000000000,
    })
    wx.setNavigationBarTitle({
      title: name
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