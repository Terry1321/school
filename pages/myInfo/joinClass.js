// pages/myInfo/joinClass.js
const { $Message } = require('../../components/iview/dist/base/index');
const { $Toast } = require('../../components/iview/dist/base/index');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warn: "班级名称不能为空",
    searched: false,
    searchSuccess: false,
    //搜索信息
    classDetail: {},
    // classDetail: {
    //   'name': '三年级二班',
    //   'master': '欧阳老师',
    //   'count': 50,
    //   'joined': 0,
    // },
    //已申请列表
    applied: [],
    // applied: ['三年一班', '三年三班'],
  },

group:function(e)
  {
    this.setData({
      group: e.detail.value
    })
  },

  join(e){
    let that = this
    var groupname = that.data.group;
    var userId =app.globalData.userId;
    wx.request({
      url: app.globalData.httpsUrl + '/join',
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'user_id':userId,
        'groupname':groupname,
      },
      success: function (res) {
        console.log(res.data);
        if(res.data==1){
          that.handleSuccess();
        }else if(res.data==3){
            that.handleWaring();
        }else if(res.data==4){
            that.handleJoined();
        }else{
            that.handleDanger();
        }

      }
    })
  },

  formSubmit(e) {
    let that = this
    let groupname = e.detail.value.groupname

    if (!groupname) {
      that.handleError()
        return
    }


    //已搜索
    that.setData({ searched: true })
    // console.log(groupname)
     wx.request({
      url: app.globalData.httpsUrl + '/classdetail',
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'name':groupname
      },
      success: function (res) {
        if (res.data!=0) {
          console.log(res.data);;
          that.setData({
            classDetail:res.data
          })
           that.setData({ searchSuccess: true })
        }else{
          that.setData({searchSuccess: false})
        }
      
      }
    })
  },
  
  // 提示成功
  handleSuccess() {
    $Toast({
      content: '申请成功',
      type: 'success',
      selector: '#pop_toast'
    });
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      });
    }, 3000);
  },
  // 提示警告
  handleWaring() {
    $Toast({
      content: '切勿重复申请',
      type: 'waring',
      selector: '#pop_toast'
    });
  },
  // 提示已加入
  handleJoined() {
    $Toast({
      content: '您已加入该群，不可再次申请',
      type: 'waring',
      selector: '#pop_toast'
    });
  },
  // 提示失败
  handleDanger() {
    $Toast({
      content: '申请失败，请重试',
      type: 'waring',
      selector: '#pop_toast'
    });
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
  onLoad: function () {
    var that = this;
    var id = app.globalData.userId;
     wx.request({
      url: app.globalData.httpsUrl + '/joined',
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        id: id
      },
      success: function (res) {
        that.setData({
          applied:res.data
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