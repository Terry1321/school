// pages/myInfo/chat/chatList.js
var app = getApp()

var cities = [
  { "name": "啊啊啊", "pinyin": "Aaa" },

];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: app.globalData.chatClassList,
    parentList: app.globalData.chatParentList,
    cities: [],
    className: '',
    classId: 0,
  },

  onChange(event) {
    // console.log(event.detail, 'click right menu callback data')
  },

  toChatWindow(event) {
    let self = this
    // console.log('test')
    let className = self.data.className
    let classId = self.data.classId
    let parentList = self.data.parentList
    let parentName = event.target.dataset.name
    let transfer = {
      'className': className,
      'classId': classId,
      'parentName': parentName,
      'parentId': parentList[classId][parentName]
    }
    console.log(transfer)
    wx.navigateTo({
      url: "chatWindow?current=" + JSON.stringify(transfer)
    });
  },

  uniq(array) {
    var temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
        temp.push(array[i]);
      }
    }
    return temp;
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cities = []
    let self = this
    //get classId
    let data = JSON.parse(options.current)
    let classList = self.data.classList
    self.setData({
      classId: data.num,
    })
      wx.request({
        url: app.globalData.httpsUrl + '/chatparentlist',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          'group_id': self.data.classId,
        },
        success: function (res) {
          self.setData({
            parentList:res.data
          })
        }
      })
    wx.setNavigationBarTitle({
      title: data.name
    })

    console.log(self.data.parentList)
    console.log(data.num)
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