// pages/myInfo/myName.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    newNmae:'',
  },

  formSubmit() {
    wx.navigateBack({
      delta: 1
    });
  },

 username:function(e)
  {
    this.setData({
      newNmae: e.detail.value
    })
  },
  formSubmit(e) {
    var that = this;
    //获取修改后的名字
    var name = that.data.newNmae;
    //获取用户id
    var id = app.globalData.userId;
    // 访问nameChange接口进行修改名字
    wx.request({
      url: app.globalData.httpsUrl + '/namechange',
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        name: name,
        id: id
      },
      success: function (res) {
        if (res.data != 0) {
          app.globalData.username = res.data
          console.log(app.globalData.username);
          wx.navigateBack({
            delta: 2
          })
          //返回上一页
         
        } else {
           wx.navigateBack({
            delta: 1
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      username: app.globalData.username,
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