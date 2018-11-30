// pages/myInfo/createClass.js
const { $Message } = require('../../components/iview/dist/base/index');
const { $Toast } = require('../../components/iview/dist/base/index');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    warn: "班级名称不能为空",
    content: "",
  },

  formSubmit(e) {
    let that = this
    let groupname = e.detail.value.groupname;
    var userId = app.globalData.userId; 
    if (!e.detail.value.groupname) {
      that.handleError()
      return
    }
   wx.request({
      url: app.globalData.httpsUrl + '/creategroup',
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'name': groupname,
        "user_id": userId
      },
      success: function (res) {
        if (res.data==1) {
        // 提示成功
           that.handleSuccess()
        }else if(res.data==3){
            wx.showToast({
              title: '班级名已存在',
            })
        }
      }
    })
    // console.log(groupname)
    // console.log(userId)
  },



  // 提示成功
  handleSuccess() {
    $Toast({
      content: '班级创建成功',
      type: 'success',
      selector: '#pop_toast'
    });
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      });
    }, 3000);
  },

  handleError: function () {
    var that = this;
    var warning = that.data.warn;
    $Message({
      content: warning,
      type: 'error',
      selector: '#pop_message',
      duration: 3
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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