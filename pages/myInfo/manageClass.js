// pages/myInfo/manageClass.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appliedList: [],
  },

  //同意
  agree(e) {
    let that = this
    let classId = e.target.dataset.class
    let parentId = e.target.dataset.parent
     wx.request({
      url: app.globalData.httpsUrl + '/checked',
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
         'classId':classId,
         'parentId':parentId,
         'statu':1,
      },
    success: function (res) {
      if (res.data==1) {
        that.onLoad();
      }
        // console.log(res.data);
    }
  })
    // console.log(classId)
    // console.log(parentId)
  },

  //拒绝
  refuse(e) {
    let that = this
    let classId = e.target.dataset.class
    let parentId = e.target.dataset.parent
      wx.request({
      url: app.globalData.httpsUrl + '/checked',
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
         'classId':classId,
         'parentId':parentId,
         'statu':0,
      },
    success: function (res) {
      if (res.data==1) {
        that.onLoad();
      }
        console.log(res.data);
    }
  })
    // console.log(classId)
    // console.log(parentId)
  },

  to_createClass() {
    wx.navigateTo({
      url: "../myInfo/createClass"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var userId = app.globalData.userId;
     wx.request({
        url: app.globalData.httpsUrl + '/appliedlist',
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
           'id':userId,
        },
      success: function (res) {
        that.setData({
          appliedList:res.data
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